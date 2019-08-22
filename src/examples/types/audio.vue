<template>
  <span class="table-item-audio">
    <audio controls="controls">
      您的浏览器不支持播放音频
      <source :src="value">
    </audio>
  </span>
</template>

<script>
export default {
  name: 'TableItemAudio',
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