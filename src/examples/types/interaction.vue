<template>
  <dh-authority-item
    :show-condition="field.showCondition"
    :authority-code="field.authorityCode"
  >
    <span class="table-item-interaction">
      <DhInteraction
        v-bind="interactionProps"
        @showDialog="handleShowDialog"
        @showDocker="handleShowDocker"
      />
    </span>
  </dh-authority-item>
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
    },
    row: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    interactionProps() {
      return {
        ...this.field,
        entityIds: this.row.entityIds
      };
    }
  },
  methods: {
    handleShowDialog() {
      this.$emit('showDialog', {value: this.value, row: this.row, field: this.field});
    },
    handleShowDocker() {
      this.$emit('showDocker', {value: this.value, row: this.row, field: this.field});
    }
  }
};
</script>