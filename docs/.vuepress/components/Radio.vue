<template>
   <label class='radio-wrapper' @click='radioChange'>
      <span class='radio-input' :class="[currentValue === label ? 'radio-checked' : '',isDisabled ? 'radio-disabled': '']">
        <input
          type='radio'
          class='radio-input'
          :checked="currentValue === label"
          :disabled='isDisabled'
          :label="label"
        />
        <span class='radio-inner'></span>
      </span>
      <span class="radio-label">
        <slot></slot>
      </span>
   </label>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: [String, Number, Boolean],
    },
    label: {
      type: [String, Number, Boolean],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.parent ? this.parent.value : this.value;
      },
      set(val) {
        (this.parent || this).$emit('input', val);
      },
    },
    isDisabled() {
      return this.parent ? this.parent.disabled || this.disabled : this.disabled;
    },
  },
  data() {
    return {
      parent: null,
    };
  },
  methods: {
    radioChange() {
      if(this.isDisabled) return;
      this.currentValue = this.label;
    },
  },
  created() {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name === 'RadioGroup') {
        this.parent = parent;
        break;
      }
      parent = parent.$parent;
    }
  },
};
</script>

<style lang="scss" scope>
    $base-border-radio: #999999;
    $base-bg-radio: #fff;
    $base-checked-bg-radio: #2ECC9E;
    $base-disable-radio: #c0c4cc;
    $base-color: #606266;
    $base-font-size: 14px;
    .radio-wrapper{
      color: $base-color;
      font-size: $base-font-size;
      margin-right: 8px;
      .radio-input{
        position: relative;
        display: inline-block;
        vertical-align: middle;
        line-height: 1;
        .radio-inner{
          position: relative;
          display: inline-block;
          border: 1px solid $base-border-radio;
          border-radius: 100%;
          width: 18px;
          height: 18px;
          background-color: $base-bg-radio;
          box-sizing: border-box;
          &::after{
            width: 10px;
            height: 10px;
            border-radius: 100%;
            background-color: $base-checked-bg-radio;
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%) scale(0);
            transition: transform .15s ease-in;
          }
        }
        .radio-input{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          z-index: -1;
          outline: 0;
          box-sizing: border-box;
        }
        &.radio-checked{
          .radio-inner{
            border-color: $base-border-radio;
            background:  $base-bg-radio;
            &::after{
              transform: translate(-50%,-50%) scale(1);
            }
          }
        }
        &.radio-disabled{
          .radio-inner{
            cursor: not-allowed;
            background-color: #F5F7FA;
            border-color: #E4E7ED
          }
          &.radio-checked{
            .radio-inner{
              &::after{
                background-color: $base-disable-radio;
              }
            }
          }
        }
      }
      .radio-label{
        padding-left: 8px;
      }
    }
</style>
