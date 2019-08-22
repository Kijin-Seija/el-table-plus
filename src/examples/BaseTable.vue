<template>
  <MyTable
    :class="{'has-selection': selection}"
    :table-attrs="tableAttrsMerged"
    :table-events="tableEventsMerged"
    :columns="columnsFormatted"
    :pagination-attrs.sync="paginationAttrs"
    :pagination-events="paginationEventsMerged"
  />
</template>

<script>
import MyTable from '../CommonTable';
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
  components: {
    MyTable
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [
          {id: 1, enum: 1, duration: Date.now(), date: Date.now(), name: '张三'},
          {id: 2, enum: 2, duration: Date.now(), date: Date.now(), name: '李四'},
          {id: 3, enum: 3, duration: Date.now(), date: Date.now(), name: '王五'},
        ];
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
        return [
          {
            // 表格列绑定单个字段
            label: '编号',
            tip: '编号aaaaaa',
            field: {
              keyName: 'id',
              type: 'raw',
              sortable: true,
              authorityCode: '',
              showCondition: true
            }
          },
          {
            label: '枚举',
            tips: '',
            field: {
              name: 'enum',
              type: 'enum_text',
              sortable: true,
              authorityCode: '',
              showCondition: true,
              enumsId: 'enum1'
            }
          },
          {
            label: '时间段',
            tip: '312312',
            field: {
              keyName: 'duration',
              type: 'timespan',
              sortable: true,
              authorityCode: '',
              showCondition: true
            }
          },
          {
            label: '时间点',
            tips: '',
            field: {
              keyName: 'date',
              type: 'datetime',
              sortable: true,
              authorityCode: '',
              showCondition: true,
              fromFormat: 'Millis',
              toFormat: 'yyyy-MM-dd'
            }
          },
          {
            // 表格列绑定多个字段，会渲染成 '组合信息：{name} - {span}分钟'
            label: 'compose info',
            tips: '',
            fields: [
              '组合信息：',
              {
                keyName: 'name',
                type: 'raw',
                sortable: true,
                authorityCode: '',
                showCondition: true
              },
              ' - ',
              {
                keyName: 'duration',
                type: 'timespan',
                sortable: true,
                authorityCode: '',
                showCondition: true,
                format: 'm分'
              }
            ]
          }
        ];
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
        data: [
          {id: 1, enum: 1, duration: Date.now(), date: Date.now(), name: '张三'},
          {id: 2, enum: 2, duration: Date.now(), date: Date.now(), name: '李四'},
          {id: 3, enum: 3, duration: Date.now(), date: Date.now(), name: '王五'},
        ]
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
          console.log(this.paginationAttrs.currentPage);
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
        ...this.columns.map(this.makeCol).filter(item => item)
      ];
    },
  },
  methods: {
    makeCol(column) {
      let result = {};
      result.label = column.label;
      result.showOverflowTooltip = true;
      // tooltip
      // if (column.tip) {
      //   if (typeof column.tip === 'string') result.tooltip = column.tip;
      //   else if (column.tip instanceof Object) result.tooltip = { ...this.makeField(column.tip) };
      // } else if (column.tips) {
      //   result.tooltip = {...this.makeFields(column.tips)};
      // }
      // result.showOverflowTooltip = true;

      if (column.field) {
        let field = this.makeField(column.field);
        if (field) result = { ...result, ...field };
        else result = null;
      } else if (column.fields) {
        let fields = this.makeFields(column.fields);
        if (fields) result = { ...result, ...fields };
        else result = null;
      } else {
        result = null;
      }
      return result;
    },

    makeField(field) {
      let result = {};
      if (field.showCondition) {
        result.sortable = field.sortable ? 'custom' : false;
        if (field.type === 'raw') result.prop = field.keyName;
        else {
          result.component = scope => h => h(Fields[field.type], {
            props: {
              value: scope.row[field.keyName],
              field: {...field}
            }
          });
        }
        return result;
      } else return null;
    },

    makeFields(fields) {
      let result = {};
      if (fields.some(field => field.showCondition)) {
        result.sortable = fields.some(field => field.sortable) ? 'custom' : false;
        result.component = scope => h => h('div', {}, [
          ...fields.filter(field => typeof field === 'string' || field.showCondition).map(field => {
            if (typeof field === 'string') return field;
            else if (field.type === 'raw') return scope.row[field.keyName];
            else return h(Fields[field.type], {
              props: {
                value: scope.row[field.keyName],
                field: {...field}
              }
            });
          })
        ]);
        return result;
      } else return null;
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