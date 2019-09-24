import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Installer from '../../src/index';
import CommonTableColumn from '../../src/CommonTableColumn';

// Vue全局配置
const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(Installer)
const CommonTable = localVue.component('CommonTable')

// mock数据
const getTestData = function() {
  return [
    { id: 1, name: 'Toy Story', release: '1995-11-22', director: 'John Lasseter', runtime: 80 },
    { id: 2, name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
    { id: 3, name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
    { id: 4, name: 'Monsters, Inc.', release: '2001-11-2', director: 'Peter Docter', runtime: 92 },
    { id: 5, name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
  ];
};

const getTestColumns = function() {
  return [
    { prop: 'id', label: 'id' },
    { prop: 'name', label: '片名' },
    { prop: 'release', label: '发行日期' },
    { prop: 'director', label: '导演' },
    { prop: 'runtime', label: '时长（分）'}
  ]
}

// 获取组件

describe('table 初始化', () => {
  const wrapper = mount(CommonTable, {
    localVue,
    stubs: {
      transition: false
    }
  })

  it('Installer成功配置', () => {
    expect(wrapper.name()).to.be.eql('CommonTable')
  })

  it('正确对接element table', () => {
    expect(wrapper.find(ElementUI.Table).is(ElementUI.Table)).to.be.true
  })

  it('正确对接element pagination', () =>{
    expect(wrapper.find(ElementUI.Pagination).is(ElementUI.Pagination)).to.be.true
  })

  it('table props默认值 tableAttrs', () => {
    expect(wrapper.props().tableAttrs).to.eql({})
  })

  it('table props默认值 tableEvents', () => {
    expect(wrapper.props().tableEvents).to.eql({})
  })

  it('table props默认值 columns', () => {
    expect(wrapper.props().columns).to.eql([])
  })

  it('table props默认值 disablePagination', () => {
    expect(wrapper.props().disablePagination).to.eql(false)
  })

  it('table props默认值 paginationAttrs', () => {
    expect(wrapper.props().paginationAttrs).to.eql({})
  })

  it('table props默认值 paginationEvents', () => {
    expect(wrapper.props().paginationEvents).to.eql({})
  })

  it ('table pagination 初始属性正确', () => {
    expect(wrapper.vm.mergedPaginationAttrs).to.eql({
      layout: 'prev, pager, next',
      total: 1
    })
  })

  it ('table 实例正确', () => {
    expect(wrapper.vm.table.$el).to.be.exist
  })

  const column = shallowMount(CommonTableColumn, {localVue})
  it('table column prop默认值 column', () => {
    expect(column.vm.column).to.eql({})
  })
})



describe('table 渲染', () => {
  const wrapper = mount(CommonTable, {
    localVue,
    stubs: { transition: false },
    propsData: {
      tableAttrs: {
        data: getTestData()
      },
      columns: getTestColumns(),
      paginationAttrs: {
        total: 40
      }
    }
  })

  it('table 表头正确渲染', () => {
    let realized = wrapper.findAll('thead th:not(.gutter):not(.el-table-column--selection)').wrappers.map(item => item.text());
    let expected = getTestColumns().map(item => item.label);
    expect(realized).to.eql(expected);
  })

  it('table 内容正确渲染', () => {
    let realized = wrapper.findAll('td:not(.el-table-column--selection) .cell').wrappers.map(item => item.text());
    let expected = getTestData().reduce((prev, item) => {
      return prev.concat(Object.values(item).map(value => String(value)))
    }, []);
    expect(realized).to.eql(expected);
  })

  it ('table 分页器正确渲染', () => {
    let realized = wrapper.findAll('.el-pager .number').wrappers.map(item => item.text());
    expect(realized).to.eql(['1','2','3','4'])
  })
})



describe('table 配置', () => {
  const tableAllAttrs = {
    data: getTestData(),
    size: 'small',
    width: '1000px',
    height: '9000px',
    maxHeight: '10000px',
    fit: false,
    context: {},
    stripe: true,
    border: true,
    rowKey: 'rowKey',
    showHeader: true,
    showSummary: true,
    sumText: 'sumText',
    summaryMethod: function () { return 100 },
    rowClassName: 'rowClassName',
    rowStyle: {},
    cellClassName: 'cellClassName',
    cellStyle: {},
    headerRowClassName: 'headerRowClassName',
    headerRowStyle: {},
    headerCellClassName: 'headerCellClassName',
    headerCellStyle: {},
    highlightCurrentRow: true,
    currentRowKey: 1,
    emptyText: 'emptyText',
    expandRowKeys: [],
    defaultExpandAll: true,
    defaultSort: {},
    tooltipEffect: 'tooltipEffect',
    spanMethod: function () { return 100 },
    selectOnIndeterminate: true,
    indent: 16,
    treeProps: {
      hasChildren: 'hasChildren1',
      children: 'children1'
    },
    lazy: false,
    load: function () { return 100 },
  }

  const columnAllAttrs = {
    type: 'default',
    className: 'className',
    labelClassName:'labelClassName',
    width: '100px',
    minWidth: '100px',
    sortable: true,
    sortMethod: function () { return 100 },
    sortBy: [],
    resizable: false,
    columnKey: 'columnKey',
    align: 'right',
    headerAlign: 'right',
    showTooltipWhenOverflow: true,
    showOverflowTooltip: true,
    fixed: 'right',
    formatter: function () { return 100 },
    selectable: function () { return 100 },
    reserveSelection: true,
    filterMethod: function () { return 100 },
    filteredValue: [],
    filters: [],
    filterPlacement: 'right',
    filterMultiple: false,
    index: function () { return 100 },
    sortOrders: [null, 'ascending', 'descending']
  }

  const paginationAllAttrs = {
    pageSize: 30,
    small: true,
    total: 1000,
    pageCount: 1000,
    currentPage: 2,
    layout: 'prev, pager, next, total',
    pageSizes: [10, 30, 40, 50, 100],
    popperClass: 'popperClass',
    prevText: 'prevText',
    nextText: 'nextText',
    background: true,
    disabled: false,
    hideOnSinglePage: false
  }

  const wrapper = mount(CommonTable, {
    localVue,
    stubs: { transition: false },
    propsData: {
      tableAttrs: tableAllAttrs,  
      columns: getTestColumns().map(item => ({...item, ...columnAllAttrs})),
      paginationAttrs: paginationAllAttrs
    }
  })

  it('正确传递element table attributes', () => {
    const elTable = wrapper.find(ElementUI.Table);
    Object.keys(tableAllAttrs).filter(key => typeof tableAllAttrs[key] !== 'function').forEach(key => {
      expect(elTable.props(key)).to.eql(tableAllAttrs[key])
    })
    Object.keys(tableAllAttrs).filter(key => typeof tableAllAttrs[key] === 'function').forEach(key => {
      expect(elTable.props(key)()).to.eql(100)
    })
  })
  
  it('正确传递element column attributes', () => {
    const elTableColumns = wrapper.findAll(ElementUI.TableColumn).wrappers;
    elTableColumns.forEach(column => {
      Object.keys(columnAllAttrs).filter(key => typeof columnAllAttrs[key] !== 'function').forEach(key => {
        expect(column.props(key)).to.eql(columnAllAttrs[key])
      })
      Object.keys(columnAllAttrs).filter(key => typeof columnAllAttrs[key] === 'function').forEach(key => {
        expect(column.props(key)()).to.eql(100)
      })
    })
  })

  it('正确传递element pagination attributes', () => {
    const elPagination = wrapper.find(ElementUI.Pagination);
    Object.keys(paginationAllAttrs).forEach(key => {
      expect(elPagination.props(key)).to.eql(paginationAllAttrs[key])
    })
  })


  
  const wrapper1 = mount(CommonTable, {
    localVue,
    stubs: { transition: false },
    propsData: {
      tableAttrs: {
        data: getTestData()
      },
      columns: getTestColumns(),
      paginationAttrs: paginationAllAttrs,
      disablePagination: true
    }
  })
  it('禁用pagination有效', () => {
    expect(wrapper1.find('.el-pager .number').exists()).to.be.false
  })

  it('pagination 同步currentPage属性', () => {
    const elPagination = wrapper.find(ElementUI.Pagination);
    wrapper.findAll('.el-pager .number').wrappers[2].trigger('click')
    expect(String(wrapper.vm.mergedPaginationAttrs.currentPage)).to.eql(wrapper.findAll('.el-pager .number').wrappers[2].text())
  })

  it('pagination 同步pageSize属性', () => {
    const elPagination = wrapper.find(ElementUI.Pagination);
    elPagination.vm.$emit('update:pageSize', 40);
    expect(wrapper.vm.mergedPaginationAttrs.pageSize).to.eql(40)
  })

  it('pagination 父组件修改属性', () => {
    const elPagination = wrapper.find(ElementUI.Pagination);
    wrapper.setProps({paginationAttrs: {...paginationAllAttrs} })
    Object.keys(paginationAllAttrs).forEach(key => {
      expect(elPagination.props(key)).to.eql(paginationAllAttrs[key])
    })
  })
})

describe('table 事件', () => {
  const tableAllEvents = [
    'select',	
    'select-all',
    'selection-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu',
    'sort-change',
    'filter-change',
    'current-change',
    'header-dragend',
    'expand-change'
  ];

  const paginationAllEvents = [
    'size-change',
    'current-change',
    'prev-click',
    'next-click'
  ];

  const wrapper = mount({
    template: `
      <CommonTable
        :table-attrs="tableAttrs"
        :columns="columns"
        :table-events="tableEvents"
        :pagination-events="paginationEvents"
      />
    `,
    data() {
      return {
        count: -1,
        count2: -1,
        tableAttrs: {
          data: getTestData()
        },
        tableEvents: tableAllEvents.reduce((prev, item) => {
          return {...prev, [item]: function () { this.count++ }}
        }, {}),
        paginationEvents: paginationAllEvents.reduce((prev, item) => {
          return {...prev, [item]: function () { this.count2++ }}
        }, {}),
        columns: getTestColumns()
      }
    }
  }, {
    localVue,
    stubs: { transition: false },
  })
  
  it('正确触发table事件', () => {
    const elTable = wrapper.find(ElementUI.Table);
    tableAllEvents.forEach((event, index) => {
      elTable.vm.$emit(event)
      expect(wrapper.vm.count).to.eql(index)
    })
  })

  it('正确触发pagination事件', () => {
    const elPagination = wrapper.find(ElementUI.Pagination);
    paginationAllEvents.forEach((event, index) => {
      elPagination.vm.$emit(event)
      expect(wrapper.vm.count2).to.eql(index)
    })
  })

  let thisArg = {a: 1}
  const wrapper2 = mount(CommonTable, {
    localVue,
    stubs: { transition: false },
    propsData: {
      tableAttrs: {
        data: getTestData()
      },
      columns: getTestColumns(),
      paginationAttrs: {
        total: 40
      },
      paginationEvents: {
        'NOFIXTHIS_current-change': (function () {this.a = 2}).bind(thisArg)
      }
    }
  })
  it('NOFIXTHIS_前缀', () => {
    const elPagination = wrapper2.find(ElementUI.Pagination);
    elPagination.vm.$emit('current-change');
    expect(thisArg.a).to.eql(2);
  })
  

})

describe('table 插槽', () => {
  const wrapper = mount(CommonTable, {
    localVue,
    stubs: { transition: false },
    propsData: {
      tableAttrs: {
        data: getTestData()
      },
      columns: [
        ...getTestColumns(),
        { label: '操作', slotName: 'operation', headerSlotName: 'operation' }
      ],
      paginationAttrs: {
        total: 40
      }
    },
    slots: {
      operation: '<div class="slot-operation">operation</div>',
      'operation-header': '<div class="slot-operation-header">operation-header</div>',
      append: '<div class="slot-append">append</div>',
      middle: '<div class="slot-middle">middle</div>'
    }
  })

  it('表头插槽', () => {
    expect(wrapper.find('.slot-operation').exists()).to.be.true
  })

  it('表格内容插槽', () => {
    expect(wrapper.find('.slot-operation-header').exists()).to.be.true
  })

  it('表尾合计行插槽', () => {
    expect(wrapper.find('.slot-append').exists()).to.be.true
  })

  it('表格与分页器间插槽', () => {
    expect(wrapper.find('.slot-middle').exists()).to.be.true
  }),

  it('table column slot初始化正确', () => {
    wrapper.findAll(CommonTableColumn).wrappers.forEach(item => {
      expect(item.vm.childrenSlotList.default).to.be.an('array')
      expect(item.vm.childrenSlotList.header).to.be.an('array')
    })
  })
})

describe('table 多级嵌套', () => {
  const wrapper = mount(CommonTable, {
    localVue,
    stubs: { transition: false },
    propsData: {
      tableAttrs: {
        data: getTestData()
      },
      columns: [
        { label: '嵌套', children: [
          ...getTestColumns(),
          { label: '操作', slotName: 'operation', headerSlotName: 'operation' }
        ]}
      ],
      paginationAttrs: {
        total: 40
      },
      slots: {
        operation: '<div class="slot-operation">operation</div>',
        'operation-header': '<div class="slot-operation-header">operation-header</div>'
      }
    }
  })

  it('table column slot传递正确', () => {
    expect(wrapper.find(CommonTableColumn).vm.childrenSlotList).to.eql({default: ['operation'], header: ['operation']})
  })
})

describe('table 传入component', () => {
  const testComp = localVue.component('testComp', localVue.extend({
    render: h => h('div', {
      props: { type: 'success' },
      'class': {testComp: true},
      domProps: { innerHTML: '自定义' }
    })
  }))

  const wrapper = mount(CommonTable, {
    localVue,
    stubs: {
      transition: false
    },
    propsData: {
      tableAttrs: {
        data: getTestData()
      },
      columns: [
        ...getTestColumns(),
        {
          label: '操作',
          component: scope => h => h('el-button', {
            props: { type: 'success' },
            domProps: { innerHTML: scope.row.name },
            on: { click: () => { console.log(this)} }
          })
        },
        {
          label: '自定义',
          component: 'testComp'
        }
      ],
      paginationAttrs: {
        total: 40
      }
    },
  })

  it('渲染函数模式', () => {
    let realized = wrapper.findAll(ElementUI.Button).wrappers.map(item => item.text());
    let expected = getTestData().map(item => item.name);
    expect(realized).to.eql(expected);
  })

  it('外部组件模式', () => {
    let realized = wrapper.findAll('.testComp').wrappers.map(item => item.text());
    let expected = new Array(5).fill('自定义')
    expect(realized).to.eql(expected);
  })
})
