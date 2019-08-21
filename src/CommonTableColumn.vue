<template>
  <el-table-column v-bind="column">
    <!-- 多级表头 -->
    <template v-if="column.children">
      <CommonTableColumn
        v-for="(subcolumn, index) in column.children"
        :key="index"
        :column="subcolumn"
      >
        <!-- 插槽透传 -->
        <template
          v-if="subcolumn.headerSlotName"
          #[`${subcolumn.headerSlotName}-header`]="scope"
        >
          <slot
            :name="`${subcolumn.headerSlotName}-header`"
            v-bind="scope"
          />
        </template>
        <template
          v-if="subcolumn.slotName"
          #[subcolumn.slotName]="scope"
        >
          <slot
            :name="subcolumn.slotName"
            v-bind="scope"
          />
        </template>
      </CommonTableColumn>
    </template>

    <!-- 表头插槽 -->
    <template
      v-if="column.headerSlotName"
      #header="scope"
    >
      <slot
        name="`${column.headerSlotName}-header`"
        v-bind="scope"
      />
    </template>

    <!-- 内容插槽 -->
    <template
      v-if="column.slotName"
      #default="scope"
    >
      <slot
        :name="column.slotName"
        v-bind="scope"
      />
    </template>
    <template
      v-else-if="column.component"
      #default="scope"
    >
      <component :is="component(scope)" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'CommonTableColumn',
  props: {
    column: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    component(scope) {
      if (this.column.component instanceof Function) return { render: this.column.component(scope) };
      else return this.column.component;
    }
  }
};
</script>

