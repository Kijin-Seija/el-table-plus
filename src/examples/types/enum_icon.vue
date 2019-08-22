<template>
  <span class="table-item-enum-icon">
    <img 
      :src="enumValue"
      :alt="value"
    >
  </span>
</template>

<script>
export default {
  name: 'TableItemEnumIcon',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      enum: []
    };
  },
  computed: {
    enumValue() {
      if (!this.enum.length) return '';
      else {
        let result = this.enum.find(item => item.label === this.value);
        if (!result) return 'ERROR_NO_MATCHED_ENUM_VALUE';
        else return result.value;
      }
    }
  },
  mounted() {
    // 基于fe-boss-plus的getOptions mixins
    // this.getOptions(this.field.enumId).then(res => {
    //   this.enum = res;
    // });
  }
};
</script>

<style lang="scss" scoped>

</style>