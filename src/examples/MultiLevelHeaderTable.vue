<template>
  <MyTable
    :table-attrs="tableAttrs"
    :columns="columns"
    disable-pagination
  >
    <template #info-header="scope">
      <el-input
        size="mini"
        placeholder="搜索"
      />
    </template>

    <template #operation-header="scope">
      <el-input placeholder="输入搜索" />
    </template>
  </MyTable>
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
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ]
      },
      columns: [
        { label: '日期', prop: 'date', width: 150 },
        {
          label: '配送信息',
          headerSlotName: 'info',
          children: [
            { label: '姓名', prop: 'name', width: 120 },
            {
              label: '地址',
              children: [
                { label: '省份', prop: 'province', width: 120 },
                { label: '市区', prop: 'city', width: 120 },
                { label: '地址', prop: 'address', width: 300 }
              ]
            }
          ]
        },
        { label: '操作', headerSlotName: 'operation' }
      ]
    };
  }
};
</script>