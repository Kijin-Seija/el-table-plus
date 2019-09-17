<template>
  <MyTable
    :table-attrs="tableAttrs"
    :columns="columns"
    disable-pagination
  />
</template>

<script>
import MyTable from '../CommonTable';
export default {
  components: { MyTable },
  data() {
    return {
      tableAttrs: {
        style: 'width: 100%',
        data: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
      },
      columns: [
        { label: '日期', prop: 'date', width: 180 },
        { label: '姓名', prop: 'name', width: 180 },
        { label: '地址', prop: 'address' }
      ]
    };
  }
};
</script>