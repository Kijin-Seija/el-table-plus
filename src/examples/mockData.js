export const mockData = [
  {id: 1, enum: 1, duration: Date.now(), date: Date.now(), name: '张三'},
  {id: 2, enum: 2, duration: Date.now(), date: Date.now(), name: '李四'},
  {id: 3, enum: 3, duration: Date.now(), date: Date.now(), name: '王五'},
];

export const mockColumns = [
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
      format: 'yyyy-MM-dd'
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