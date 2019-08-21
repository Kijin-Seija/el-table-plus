<template>
  <span class="table-item-interaction">
    <el-button
      type="text"
      @click="doAction"
    >
      {{ value }}
    </el-button>
  </span>
</template>

<script>
export default {
  name: 'TableItemInteraction',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    doAction() {
      switch (this.field.mode) {
      case 'page':
        this.$route.goToPage(this.field.uri);
        break;
      case 'ajax':
        // TODO
        break;
      case 'dialog':
        // TODO
        break;
      case 'docker':
        // TODO
        break;
      default: break;
      }
    }
  }
};
</script>