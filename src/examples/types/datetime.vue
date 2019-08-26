<template>
  <span class="table-item-datetime">
    {{ timeValue }}
  </span>
</template>

<script>
import { DateTime } from 'luxon';
export default {
  name: 'TableItemDatetime',
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
  computed: {
    timeValue() {
      return DateTime.fromMillis(this.value).toFormat(this.field.format);
    }
  }
};
</script>