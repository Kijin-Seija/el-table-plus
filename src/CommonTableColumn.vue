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
          v-for="slotName in childrenSlotList.default"
          #[slotName]="scope"
        >
          <slot
            :name="slotName"
            v-bind="scope"
          />
        </template>
        <template
          v-for="headerSlotName in childrenSlotList.header"
          #[`${headerSlotName}-header`]="scope"
        >
          <slot
            :name="`${headerSlotName}-header`"
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
        :name="`${column.headerSlotName}-header`"
        v-bind="scope"
      />
    </template>

    <!-- 内容插槽 -->
    <template
      v-if="!column.type"
      #default="scope"
    >
      <!-- 注意：prop和component可以共存。然而一旦定义了slotName,则会覆盖prop和component的内容 -->
      <!-- 因为从下面代码可以看到，prop和component是这个slot的后备内容 -->
      <slot 
        :name="column.slotName"
        v-bind="scope"
      >
        <!-- 默认内容 -->
        <span v-if="column.prop">{{ scope.row[column.prop] }}</span>
        <!-- 组件或自定义渲染内容 -->
        <component
          v-else-if="column.component"
          :is="component(scope)"
        />
      </slot>
    </template>
  </el-table-column>
</template>

<script>
import tree from './lib/tree';

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
  computed: {
    childrenSlotList() {
      return {
        default: tree(this.column.children || []).flatten().filter(item => item.src.slotName).map(item => item.src.slotName),
        header: tree(this.column.children || []).flatten().filter(item => item.src.headerSlotName).map(item => item.src.headerSlotName)
      };
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

