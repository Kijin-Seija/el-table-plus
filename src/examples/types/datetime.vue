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
      switch (this.field.fromFormat) {
      /** ex:
        DateTime.fromISO('2016-05-25T09:08:34.123')
        DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
        DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
        DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
        DateTime.fromISO('2016-W05-4')
       */
      case 'ISO': return DateTime.fromISO(this.value).toFormat(this.field.toFormat);

      // ex: 1565943560343
      case 'Millis': return DateTime.fromMillis(this.value).toFormat(this.field.toFormat);

      /** ex:
        DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
        DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
        DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
       */
      case 'RFC2822': return DateTime.fromRFC2822(this.value).toFormat(this.field.toFormat);

      /** ex:
        DateTime.fromSQL('2017-05-15')
        DateTime.fromSQL('2017-05-15 09:12:34')
        DateTime.fromSQL('2017-05-15 09:12:34.342')
        DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
        DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
        DateTime.fromSQL('09:12:34.342')
       */
      case 'SQL': return DateTime.fromSQL(this.value).toFormat(this.field.toFormat);

      // ex: 1565943560
      case 'Seconds': return DateTime.fromSeconds(this.value).toFormat(this.field.toFormat);
      default: return DateTime.fromFormat(this.value, this.field.fromFormat).toFormat(this.field.toFormat);
      }     
    }
  }
};
</script>