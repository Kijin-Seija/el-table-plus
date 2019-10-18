## 通用表格组件

#### 0. 更新日志
- v0.4.10 (2019=10-18)
  - 添加coveralls
  
- v0.4.9 (2019-09-24)
  - 完善单元测试代码sub
  
- v0.4.8 (2019-09-23)
  - 与内部版本号同步

- v0.3.2 (2019-09-17)
  - 所有传入的函数可配置函数名```NOFIXTHIS_```前缀，当使用该前缀时，将不再自动修复this绑定，以解决某些情况下需要指定特定的this的问题
  - 修复多级表头插槽的问题

- v0.3.1 (2019-08-12)
  - 使用新的模板承载项目

- v0.3.0 (2019-08-19)
  - 现在支持npm引入。 ```npm install element-table-plus```

- v0.2.1 (2019-07-30)
  - 当```component```属性中传入渲染函数时，为了获取scope数据，需要通过```scope => h => h(...)```的格式，原格式不再使用。

- v0.2.0 (2019-07-29)
  - columns中新增```component```属性，可以使用代码方式向表格项中添加组件，接受组件实例，字符串，组件配置项，以及渲染函数

- v0.1.0 (2019-07-23)
  - pagination中的```pageSize```和```currentPage```已经支持同步，需要对```paginationAttrs```配置```.sync```方法，同时不再支持```defaultPage```和```defaultPageSize```这两个额外属性。
  - 添加了```v-loading```支持，在```tableAttrs```配置中新增了一个```loading```参数，用来控制```v-loading```状态

#### 1. 使用方式

- 使用

  ```npm install element-table-plus```
  
  ```javascript
  import ElementTablePlus from 'element-table-plus'
  Vue.use(ElementTablePlus)
  ```

- 本地调试
  
  - yarn
    > ```yarn global add parcel-bundler```
    >
    > ```yarn```
    >
    > ```parcel index.html```

  - npm
    > ```npm install -g parcel-bundler```
    >
    > ```npm install```
    >
    > ```parcel index.html```

#### 2. 传入参数

- ```tableAttrs```（必填，至少有一项data）

  表格配置，接受一个对象，对象参数为表格配置项。配置项同element table attributes，可以使用kebab-case或者camelCase，没有值的配置等同于布尔值true。

   例：

  ```javascript
  tableAttrs: {
    data: [
      {a: 1, b: 2, c: 3, d: 4},
      {a: 1, b: 2, c: 3, d: 4},
      {a: 1, b: 2, c: 3, d: 4}
    ],
    stripe: true,
    emptyText: '暂无数据'
  }
  ```

  除了element table attributes的所有参数外，额外新增了一些配置参数。

  - ```loading```(v0.1.0新增)

    接受一个布尔值。用来配置table的```v-loading```状态

    例：

    ```javascript
    data () {
      return {
        tableAttrs: {
          style: 'width: 100%',
          loading: true,
          data: []
        }
      }
    }
    mounted () {
      setTimeout(() => {
        this.tableAttrs.loading = false
        this.tableAttrs.data = [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }, 2000)
    }
    ```

- ```tableEvents```（可选）

  表格事件，接受一个对象，对象参数为表格事件回调，可用事件同element table events，必须使用kebab-case，回调函数参数同element table events。

  例：

  ```javascript
  tableEvents: {
  	'cell-mouse-enter' (row, column, cell, event) { console.log(row, column, cell, event) }
  }
  ```

- ```columns```（可选）

  表格栏元素配置，接受一个数组，数组中每一项都是表格栏配置项对象。配置项同element table column attributes，可以使用kebab-case或者camelCase，没有值的配置等同于布尔值true。

  例：

  ```javascript
  columns: [
    {label: 'A', prop: 'a'},
    {label: 'B', prop: 'b'},
    {label: 'C', prop: 'c'},
    {label: 'D', prop: 'd'},
    {label: '操作', slotName: 'operation', headerSlotName: 'operation'}
  ]
  ```

  除了element table column attributes的所有参数外，额外新增了一些配置参数。

  - ```slotName```

    接受一个字符串。当定义该参数时，将使用element table column的作用域插槽，作为一个具名插槽暴露在本组件中，该具名插槽的名称等于```slotName```。只需按下面方式在模板中编写插槽内容，就可以自定义表格栏显示。插槽中同样也可以使用```scope```变量。

     ```html
    <MyTable
       :tableAttrs="tableAttrs"
       :tableEvents="tableEvents"
       :columns="columns"
       :paginationAttrs="paginationAttrs"
     >
     	 <template #operation="scope">
         <el-button type="primary">{{ scope.row.d + 1 }}</el-button>
      </template>
    </MyTable>
     ```

    **注意：这里使用的是slot的新语法，不支持slot的旧语法。后面的插槽同。**```#operation```是```v-slot:operation```的简写

  - ```headerSlotName```

    接受一个字符串。当定义该参数时，将使用element table column header的作用域插槽，作为一个具名插槽暴露在本组件中，该具名插槽的名称等于```[headerSlotName]-header```。**为了区分header插槽与column内容插槽，header插槽的名称都添加了后缀-header**。只需按下面方式在模板中编写插槽内容，就可以自定义表格栏头部。插槽中同样也可以使用```scope```变量。

    ```html
    <MyTable
        :tableAttrs="tableAttrs"
        :tableEvents="tableEvents"
        :columns="columns"
        :paginationAttrs="paginationAttrs"
        :paginationEvents="paginationEvents"
      >
        <template #operation="scope">
          <el-button type="primary">{{ scope.row.d + 1 }}</el-button>
        </template>
    
        <template #operation-header="scope">
          <el-input placeholder="输入搜索"/>
        </template>
      </MyTable>
    ```

  - ```children```

    接受一个数组。当定义该参数时，意味着本column为一个多级表头（没有数据）。children数组的结构与columns相同。可以继续嵌套children。

    例：

    ```javascript
    columns: [
      {label: '日期', prop: 'date', width: 150},   
      {label: '配送信息', children: [
        {label: '姓名', prop: 'name', width: 120},
        {label: '地址', children: [
          {label: '省份', prop: 'province', width: 120},
          {label: '市区', prop: 'city', width: 120},
          {label: '地址', prop: 'address', width: 300},
        ]}
      ]}
    ]
    ```

  - ```component```(v0.2.0新增)

    定义本column的内部组件，接受组件实例，字符串，组件配置项，以及渲染函数。

    渲染函数为vue官方的渲染函数方案，详见[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)

    (v0.2.1)在渲染函数中，为了可以取到当前列表的数据，你需要以如下方式定义。

    ```javascript
    {
      label: '渲染',
        component: scope => h => h('el-button', {
          props: { type: 'success' },
          domProps: { innerHTML: scope.row.name },
          on: { click: () => { console.log(this)} }
        })
    }
    ```

    在渲染函数的事件配置(on)中，this被绑定到了当前的组件下，可放心使用。

    (v0.3.2)所有传入的函数可配置函数名```NOFIX_```前缀，当使用该前缀时，将不再自动修复this绑定，以解决某些情况下需要指定特定的this的问题

    

- ```disablePagination```（可选，不传则显示分页器）

  是否禁用分页器，默认显示。

  例：

  ```html
  <MyTable
      :tableAttrs="tableAttrs"
      :tableEvents="tableEvents"
      :columns="columns"
      disablePagination
   />
  ```

- ```paginationAttrs```（可选，不过一般情况下需配置）

  分页器配置，接受一个对象，对象参数为分页器配置项。配置项同element pagination attributes，可以使用kebab-case或者camelCase，没有值的配置等同于布尔值true。

  ~~**不支持```.sync```**~~ (v0.1.0新增)已支持```.sync```，现在当分页器的```currentPage```和```pageSize```更新时，```paginationAttrs```里的对应值会自动更新。不再支持```defaultPage```和```defaultPageSize```

  **注意：需要初始就定义```currentPage```和```pageSize```这两个属性**

  例：

  ```javascript
  paginationAttrs: {
    total: 100,
    pageSize: 20,
    currentPage: 1
  }
  ```

  ---

  (Deprecated since v0.1.0)

  ~~因为不支持```.sync```，为了避免意义混淆，设置了currentPage和pageSize的别名:~~

  ~~```currentPage``` - ```defaultPage```~~

  ~~```pageSize``` - ```defaultPageSize```~~

  ~~当然你也可以继续使用原来的名称，但需要记住的一点是：**这里的配置是初始化配置，不会同步分页器的当前状态，请在事件里去获取分页器的当前状态。**~~

  ---

  初始化时分页器已有默认配置，重新定义可以覆盖这些配置：

  ```javascript
  {
    layout: 'prev, pager, next',
    total: 1,
  }
  ```

- ```paginationEvents```(可选)

  分页器事件，接受一个对象，对象参数为分页器事件回调，可用事件同element pagination events，必须使用kebab-case，回调函数参数同element pagination events。

  例：

  ```javascript
  paginationEvents: {
    'current-change' (curPage) { this.page = curPage }
  }
  ```

#### 3. 其他配置

- 表格尾部插槽（插槽名：append）

  用于在表格尾部显示内容，作用同element table的append插槽。

  例：

  ``` html
  <MyTable
      :tableAttrs="tableAttrs"
      :tableEvents="tableEvents"
      :columns="columns"
      :paginationAttrs="paginationAttrs"
      :paginationEvents="paginationEvents"
    >
      <template #append>
        <p>123</p>
      </template>
    </MyTable>
  ```


- 表格与分页器间插槽（插槽名：middle）

  用于在表格与分页器间显示内容。可自己配置css样式

  例：

  ```html
  <MyTable
      :tableAttrs="tableAttrs"
      :tableEvents="tableEvents"
      :columns="columns"
      :paginationAttrs="paginationAttrs"
      :paginationEvents="paginationEvents"
    >
      <template #middle>
        <p>123</p>
      </template>
    </MyTable>
  ```
  

- el-table实例

  给组件添加```ref```，然后你可以通过```vm.$refs.[refName].table```获得el-table实例，从而调用el-table的方法。可用方法见element table methods

  例：

  ```html
  <MyTable
      :tableAttrs="tableAttrs"
      :tableEvents="tableEvents"
      :columns="columns"
      :paginationAttrs="paginationAttrs"
      :paginationEvents="paginationEvents"
      ref="myTable"
    >
    </MyTable>
  ```

  ```javascript
  mounted () {
    this.$refs.myTable.table.clearFilter()
    this.$refs.myTable.table.sort()
  }
  ```
