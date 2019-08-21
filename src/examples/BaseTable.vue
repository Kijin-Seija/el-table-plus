<template>
  <MyTable
    :table-attrs="tableAttrs"
    :columns="columnsFormatted"
    :pagination-attrs.sync="paginationAttrs"
    :pagination-events="paginationEvents"
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


export default {
  components: {
    MyTable
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [
          {
            // 表格列绑定单个字段
            label: '编号',
            tips: '',
            field: {
              name: 'id',
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
            tips: '',
            field: {
              name: 'duration',
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
              name: 'date',
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
                name: 'name',
                type: 'raw',
                sortable: true,
                authorityCode: '',
                showCondition: true
              },
              ' - ',
              {
                name: 'duration',
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
      tableAttrs: {
        style: 'width: 100%',
        loading: false,
        maxHeight: '400px',
        data: [
          {id: 1, enum: 1, duration: Date.now(), date: Date.now(), name: '张三'},
          {id: 2, enum: 2, duration: Date.now(), date: Date.now(), name: '李四'},
          {id: 3, enum: 3, duration: Date.now(), date: Date.now(), name: '王五'},
        ]
      },
      paginationAttrs: {
        layout: 'total, sizes, prev, pager, next',
        currentPage: 1,
        total: 1000,
        pageSize: 20
      },
      paginationEvents: {
        'size-change'() {
          this.paginationAttrs.currentPage = 1;
          console.log(this.paginationAttrs.currentPage);
        }
      }
    };
  },
  computed: {
    columnsFormatted() {
      return this.columns.map(this.makeCol).filter(item => item);
    },
  },
  methods: {
    makeCol(column) {
      let result = {};
      result.label = column.label;
      if (column.field && column.field.showCondition) {
        if (column.field.type === 'raw') result.prop = column.field.name;
        else {
          result.component = scope => h => h(Fields[column.field.type], {
            props: {
              value: scope.row[column.field.name],
              field: {...column.field}
            }
          });
        }
      } else if (column.fields) {
        result.component = scope => h => h('div', {}, [
          ...column.fields.filter(field => typeof field === 'string' || field.showCondition).map(field => {
            if (typeof field === 'string') return field;
            else if (field.type === 'raw') return scope.row[field.name];
            else return h(Fields[field.type], {
              props: {
                value: scope.row[field.name],
                field: {...field}
              }
            });
          })
        ]);
      } else {
        result = null;
      }

      return result;
    }
  }
};
</script>