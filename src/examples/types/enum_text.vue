<template>
  <span class="table-item-enum-text">
    {{ enumValue }}
  </span>
</template>

<script>
import type from 'dh-module-type';
export default {
  name: 'TableItemEnumText',
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
    if (this.getOptions) {
      this.getOptions(this.field.optionsId).then(res => {
        if (type.getType(res) === type.EnumType.bArray) this.enum = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>