<template>
  <span class="table-item-thumbnail">
    <img 
      :src="value"
      :alt="value"
    >
  </span>
</template>

<script>
export default {
  name: 'TableItemThumbnail',
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
  }
};
</script>