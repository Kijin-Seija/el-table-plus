<template>
  <span class="table-item-money">
    {{ moneyValue }}
  </span>
</template>
<script>
export default {
  name: 'TableItemMoney',
  props: {
    value: {
      type: Number,
      default: 0
    },
  },
  computed: {
    moneyValue() {
      return this.value.toLocaleString('zh-cn', {style: 'currency', currency: 'CNY'});
    }
  }
};
</script>