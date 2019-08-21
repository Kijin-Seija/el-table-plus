<template>
  <MyTable
    :table-attrs="tableAttrs"
    :columns="columns"
    disable-pagination
  >
    <template #operations="scope">
      <el-button
        @click="handleClick(scope.row)"
        type="text"
        size="small"
      >
        查看
      </el-button>
      <el-button
        type="text"
        size="small"
      >
        编辑
      </el-button>
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
            address: '上海市普陀区金沙江路 1517 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1519 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1516 弄',
            zip: 200333
          }
        ]
      },
      columns: [
        { label: '日期', prop: 'date', width: 150 },
        { label: '姓名', prop: 'name', width: 120 },
        { label: '省份', prop: 'province', width: 120 },
        { label: '市区', prop: 'city', width: 120 },
        { label: '地址', prop: 'address', width: 300 },
        { label: '邮编', prop: 'name', width: 120 },
        { label: '操作', fixed: 'right', width: 100, slotName: 'operations' }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>