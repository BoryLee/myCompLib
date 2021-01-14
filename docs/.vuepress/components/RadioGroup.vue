<template>
    <div class="radio-group">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'RadioGroup',
  props: {
    value: {
      type: [String, Number, Boolean],
    },
  },
  mounted() {
    this.$emit('input', this.value);
  },
};
</script>
<style lang="scss" scope>
</style>
