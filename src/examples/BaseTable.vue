<template>
  <CommonTable
    :class="{'has-selection': selection}"
    :table-attrs="tableAttrsMerged"
    :table-events="tableEventsMerged"
    :columns="columnsFormatted"
    :pagination-attrs.sync="paginationAttrs"
    :pagination-events="paginationEventsMerged"
  />
</template>

<script>
import {mockData, mockColumns} from './mockData';
import EnumText from './types/enum_text';
import EnumIcon from './types/enum_icon';
import Timespan from './types/timespan';
import Datetime from './types/datetime';
import Money from './types/money';
import Thumbnail from './types/thumbnail';
import Audio from './types/audio';
import InterAction from './types/interaction';

const Fields = {
  raw: 'raw',
  enum_text: EnumText,
  enum_icon: EnumIcon,
  timespan: Timespan,
  datetime: Datetime,
  money: Money,
  thumbnail: Thumbnail,
  audio: Audio,
  interaction: InterAction
};
const SELECTION_WIDTH = '25';


export default {
  name: 'DhTable',
  props: {
    tableData: {
      type: Array,
      default() {
        return mockData;
      }
    },
    tableEvents: {
      type: Object,
      default() {
        return {};
      }
    },
    selection: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    paginationEvents: {
      type: Object,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      default() {
        return mockColumns;
      }
    }
  },
  data() {
    return {
      stopWatching: false,
      tableAttrs: {
        stripe: true,
        border: true,
        loading: false,
        maxHeight: '400px',
        data: []
      },
      paginationAttrs: {
        layout: 'total, prev, pager, next, jumper',
        currentPage: this.currentPage,
        total: this.total,
        pageSize: this.pageSize
      },
      paginationEventsLocal: {
        'size-change'() {
          this.paginationAttrs.currentPage = 1;
        }
      }
    };
  },
  watch: {
    currentPage(val) {
      if (!this.stopWatching) this.paginationAttrs.currentPage = val;
    },
    total(val) {
      if (!this.stopWatching) this.paginationAttrs.total = val;
    },
    pageSize(val) {
      if (!this.stopWatching) this.paginationAttrs.currentPage = val;
    },
    paginationAttrs: {
      handler(val) {
        this.stopWatching = true;
        this.$emit('update:currentPage', val.currentPage);
        this.$emit('update:pageSize', val.pageSize);
        this.stopWatching = false;
      },
      deep: true
    }
  },
  computed: {
    tableAttrsMerged() {
      return {
        ...this.tableAttrs,
        data: this.tableData,
      };
    },
    tableEventsMerged() {
      return {
        ...Object.keys(this.tableEvents).reduce((newObj, key) => {
          return {
            ...newObj,
            [`NOFIXTHIS_${key}`]: this.tableEvents[key].bind(this.$parent)
          };
        }, {}),
        // 改造sort-change事件使之能配合项目
        // 对复合项目只能同时有一个数据处于sortable状态
        'sort-change'({column, prop, order}) {
          if (this.tableEvents['sort-change']) {
            let realColumn = this.columns.find(item => item.label === column.label);
            let field = realColumn.fields ? realColumn.fields.find(item => item.sortable) : realColumn.field;
            this.tableEvents['sort-change'].call(this.$parent, {column, prop, order, field});
          }
        }
      };
    },
    paginationEventsMerged() {
      return {
        ...Object.keys(this.paginationEvents).reduce((newObj, key) => {
          return {
            ...newObj,
            [`NOFIXTHIS_${key}`]: this.paginationEvents[key].bind(this.$parent)
          };
        }, {}),
        ...this.paginationEventsLocal
      };
    },
    columnsFormatted() {
      return [
        ...(this.selection ? [{type: 'selection', width: SELECTION_WIDTH}] : []),
        ...this.columns.map(this.makeCol)
      ];
    },
  },
  methods: {
    makeCol(column) {
      let result = {};
      result.label = column.label;
      result.showOverflowTooltip = true;
      if (column.field) result = { ...result, ...this.makeField(column.field) };
      else if (column.fields) result = { ...result, ...this.makeFields(column.fields) };
      return result;
    },

    makeField(field) {
      let result = {};
      result.sortable = field.sortable ? 'custom' : false;
      if (field.type === 'raw') result.prop = field.keyName;
      else {
        result.component = scope => h => this.render(h, scope, field);
      }
      return result;
    },

    makeFields(fields) {
      let result = {};
      result.sortable = fields.some(field => field.sortable) ? 'custom' : false;
      result.component = scope => h => h('div', {}, [
        ...fields.map(field => {
          if (typeof field === 'string') return field;
          else if (field.type === 'raw') return scope.row[field.keyName];
          else return this.render(h, scope, field);
        })
      ]);
      return result;
    },

    render(h, scope, field) {
      return h(Fields[field.type], {
        props: {
          value: scope.row[field.keyName],
          field: {...field},
          row: {...scope.row},
          on: {
            // interaction
            showDialog(event) {
              this.$emit('showDialog', {...event});
            },
            ShowDocker(event) {
              this.$emit('showDocker', {...event});
            }
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.has-selection {
  .el-table_1_column_1 {
    border-right: none !important;
  }
}
</style>