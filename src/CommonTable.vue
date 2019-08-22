<template>
  <div class="common-table">
    <!-- 表格 -->
    <el-table
      v-bind="tableAttrsThisFixed"
      v-on="tableEventsThisFixed"
      ref="table"
      v-loading="tableAttrsThisFixed.loading || false"
    >
      <!-- columns -->
      <CommonTableColumn
        v-for="(column, index) in columnsThisFixed"
        :key="index"
        :column="column"
      >
        <!-- 插槽透传 -->
        <template
          v-if="column.headerSlotName"
          #[`${column.headerSlotName}-header`]="scope"
        >
          <slot
            :name="`${column.headerSlotName}-header`"
            v-bind="scope"
          />
        </template>
        <template
          v-if="column.slotName"
          #[column.slotName]="scope"
        >
          <slot
            :name="column.slotName"
            v-bind="scope"
          />
        </template>
      </CommonTableColumn>

      <!-- table 尾部slot -->
      <template slot="append">
        <slot name="append" />
      </template>
    </el-table>

    <!-- 表格和分页器间可放入其他元素 -->
    <slot name="middle" />

    <!-- 分页器 -->
    <el-pagination
      v-if="!disablePagination"
      v-bind.sync="mergedPaginationAttrs"
      v-on="paginationEventsThisFixed"
    />
  </div>
</template>

<script>
import CommonTableColumn from './CommonTableColumn';
export default {
  components: {
    CommonTableColumn
  },
  props: {
    // 表格配置
    tableAttrs: {
      type: Object,
      default() {
        return {};
      }
    },
    // 表格事件
    tableEvents: {
      type: Object,
      default() {
        return {};
      }
    },
    // 表格栏配置
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 禁用分页器
    disablePagination: {
      type: Boolean,
      default: false
    },
    // 分页器配置
    paginationAttrs: {
      type: Object,
      default() {
        return {};
      }
    },
    // 分页器事件
    paginationEvents: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // 代码逻辑使用，停止所有watcher以避免死循环
      stopWatching: false,
      // 合并分页器属性和默认属性
      mergedPaginationAttrs: {
        layout: 'prev, pager, next',
        total: 1,
        ...this.paginationAttrs
      }
    };
  },
  watch: {
    // 父组件同步给子组件分页器配置
    paginationAttrs: {
      handler(val) {
        if (!this.stopWatching) this.mergedPaginationAttrs = { ...this.mergedPaginationAttrs, ...val };
      },
      deep: true
    },
    // 子组件同步给父组件当前页数
    'mergedPaginationAttrs.currentPage'(val) {
      this.stopWatching = true;
      this.$emit('update:paginationAttrs', { ...this.mergedPaginationAttrs, currentPage: val });
      this.stopWatching = false;
    },
    // 子组件同步给父组件当前pageSize
    'mergedPaginationAttrs.pageSize'(val) {
      this.stopWatching = true;
      this.$emit('update:paginationAttrs', { ...this.mergedPaginationAttrs, pageSize: val });
      this.stopWatching = false;
    }
  },
  computed: {
    // el-table实例
    table() {
      return this.$refs.table;
    },

    // fixThis
    tableAttrsThisFixed() {
      return this.fixThis(this.tableAttrs);
    },
    tableEventsThisFixed() {
      return this.fixThis(this.tableEvents);
    },
    columnsThisFixed() {
      return this.columns.map(this.fixThis);
    },
    paginationEventsThisFixed() {
      return this.fixThis(this.paginationEvents);
    }
  },
  methods: {
    // 将传入值为函数的属性的this绑定到父组件
    fixThis(obj) {
      let result = {};
      Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Function && !key.includes('NOFIXTHIS_')) result[key] = obj[key].bind(this.$parent);
        else if (obj[key] instanceof Array) result[key] = obj[key].map(this.fixThis);
        else if (obj[key] instanceof Object) result[key] = this.fixThis(obj[key]);
        else result[key] = obj[key];
      });
      return result;
    }
  }
};
</script>

<style lang="scss">
.common-table {
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
