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
      <p>dasdasdd</p>
    </template>

    <template #operation="scope">
      <el-button
        size="mini"
        type="primary"
      >
        提交
      </el-button>
    </template>

    <template #operation1-header="scope">
      <p>dasdasdd</p>
    </template>

    <template #operation1="scope">
      <el-button
        size="mini"
        type="primary"
      >
        提交
      </el-button>
    </template>

    <template #operation2-header="scope">
      <p>dasdasdd</p>
    </template>

    <template #operation2="scope">
      <el-button
        size="mini"
        type="primary"
      >
        提交
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
        { label: '日期', prop: 'date', width: 150, },
        { label: '操作1', slotName: 'operation1', headerSlotName: 'operation1' },
        {
          label: '配送信息',
          headerSlotName: 'info',
          children: [
            { label: '姓名', prop: 'name', width: 120 },
            { label: '操作2', slotName: 'operation2', headerSlotName: 'operation2' },
            {
              label: '地址',
              children: [
                { label: '省份', prop: 'province', width: 120 },
                { label: '市区', prop: 'city', width: 120 },
                { label: '地址', prop: 'address', width: 300 },
                { label: '操作', slotName: 'operation', headerSlotName: 'operation' }
              ]
            }
          ]
        },
        // { label: '操作', slotName: 'operation', headerSlotName: 'operation' }
      ]
    };
  }
};
</script>