<template>
  <span class="table-item-time-span">
    {{ timeValue }}
  </span>
</template>

<script>
import { Duration } from 'luxon';
export default {
  name: 'TableItemTimeSpan',
  props: {
    value: {
      type: Number,
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
      return Duration.fromMillis(this.value).toFormat(this.field.format || 'h小时m分ss秒');
    }
  }
};
</script>