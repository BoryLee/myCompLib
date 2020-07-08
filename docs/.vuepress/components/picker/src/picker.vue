<template>
  <div class='picker' v-if='listData.length'>
    <div>
      <div class='picker-columns' ref='roller'>
        <div class='picker-column' :class="{ 'picker-column-hidden' : isHidden(index+1) }" v-for="(item, index) in listData"
          :style="setRollerStyle(index + 1)" :key='index'>
          {{item}}
        </div>
      </div>
      <div class='picker-content'>
        <div class='picker-list' ref='list'>
          <div class='picker-item' v-for="(item, index) in listData" :key='index'>
            {{item}}
          </div>
        </div>
      </div>
      <div class='picker-mask'></div>
      <div class='picker-indicator'></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Picker',
    props: {
      listData: {
        type: Array,
        default: () => []
      },
      keyIndex: {
        type: Number,
        default: 0
      },
      defaultValue: {
        type: String
      }
    },
    data() {
      return {
        touchParams: {
          startY: 0,
          endY: 0,
          startTime: 0,
          endTime: 0
        },
        currIndex: 1,
        transformY: 0,
        scrollDistance: 0,
        lineSpacing: 36,
        rotation: 20,
        timer: null,
      }
    },
    watch: {
      defaultValue(){
       this.transformY = 0;
       this.initData();
      }
    },
    methods: {
      setRollerStyle(index) {
        return `transform: rotate3d(1, 0, 0, ${-this.rotation * index}deg) translate3d(0px, 0px, 104px)`;
      },
      isHidden(index) {
        if (index >= this.currIndex + 10 || index <= this.currIndex - 10) {
          return true;
        } else {
          return false;
        }
      },
      setChooseValue(move) {
        let index = move === 0 ? 0 : Math.round(-move / this.lineSpacing);
        this.$emit('chooseItem', this.listData[index], index, this.keyIndex);
      },
      setTransform(translateY = 0, type, time = 1500, deg) {
        if (type === 'end') {
          this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
          this.$refs.roller.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
        } else {
          this.$refs.list.style.webkitTransition = '';
          this.$refs.roller.style.webkitTransition = '';
        }
        this.$refs.list.style.webkitTransform = `translate3d(0, ${translateY}px, 0)`;
        this.$refs.roller.style.webkitTransform = `rotate3d(1, 0, 0, ${deg})`;
        this.scrollDistance = translateY;
      },
      setMove(move, type, time) {
        let updateMove = move + this.transformY;
        if (type === 'end') {
          if (updateMove > 0) {
            updateMove = 0;
          }
          if (updateMove < -(this.listData.length - 1) * this.lineSpacing) {
            updateMove = -(this.listData.length - 1) * this.lineSpacing;
          }
          let endMove = Math.round(updateMove / this.lineSpacing) * this.lineSpacing;
          let deg = `${(Math.abs(Math.round(endMove / this.lineSpacing)) + 1) * this.rotation}deg`;
          this.setTransform(endMove, type, time, deg);
          this.timer = setTimeout(() => {
            this.setChooseValue(endMove);
          }, time / 2);
        } else {
          let deg = '0deg';
          if (updateMove < 0) {
            deg = `${(Math.abs(updateMove / this.lineSpacing) + 1) * this.rotation}deg`;
          } else {
            deg = `${(-updateMove / this.lineSpacing + 1) * this.rotation}deg`;
          }
          this.setTransform(updateMove, null, null, deg);
          this.currIndex = Math.abs(Math.round(updateMove / this.lineSpacing)) + 1;
        }
      },
      touchStart(event) {
        event.preventDefault();
        let changedTouches = event.changedTouches[0];
        this.touchParams.startY = changedTouches.pageY;
        this.touchParams.startTime = event.timestamp || Date.now();
        this.transformY = this.scrollDistance;
      },
      touchMove(event) {
        event.preventDefault();
        let changedTouches = event.changedTouches[0];
        this.touchParams.lastY = changedTouches.pageY;
        this.touchParams.lastTime = event.timestamp || Date.now();
        let move = this.touchParams.lastY - this.touchParams.startY;
        this.setMove(move);
      },
      touchEnd(event) {
        event.preventDefault();
        let changedTouches = event.changedTouches[0];
        this.touchParams.lastY = changedTouches.pageY;
        this.touchParams.lastTime = event.timestamp || Date.now();
        let move = this.touchParams.lastY - this.touchParams.startY;
        let moveTime = this.touchParams.lastTime - this.touchParams.startTime;
        if (moveTime <= 300) {
          move = move * 2;
          moveTime = moveTime + 1000;
          this.setMove(move, 'end', moveTime);
        } else {
          this.setMove(move, 'end');
        }
      },
      initData(type, defaultValue) {
        defaultValue = defaultValue ? defaultValue : this.defaultValue;
        let index = this.listData.findIndex(item => item == defaultValue);
        this.currentIndex = index === -1 ? 1 : index + 1;
        let move = index === -1 ? 0 : index * this.lineSpacing;
        type && this.setChooseValue(-move);
        this.setMove(-move);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initData(true);
        this.$el.addEventListener('touchstart', this.touchStart,false);
        this.$el.addEventListener('touchmove', this.touchMove,false);
        this.$el.addEventListener('touchend', this.touchEnd,false);
      })
    },
    beforeDestroy() {
      this.$el.removeEventListener('touchstart', this.touchStart,false);
      this.$el.removeEventListener('touchmove', this.touchMove,false);
      this.$el.removeEventListener('touchend', this.touchEnd,false);
      this.timer = null;
    },
  }
</script>

<style lang="scss" scoped>
  .picker {
    flex: 1;
    height: 252px;
    overflow: hidden;
    text-align: center;
    position: relative;

    .picker-list {
      transform-style: preserve-3d;
    }

    .picker-columns,
    .picker-content {
      position: absolute;
      top: 108px;
      width: 100%;
      height: 36px;
    }

    .picker-content {
      background: #fff;
      z-index: 2;
      overflow: hidden;
    }

    .picker-column,
    .picker-item {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 36px;
      line-height: 36px;
      color: #2d2d2d;
      font-size: 12px;
      text-align: center;
    }

    .picker-columns {
      z-index: 1;
      transform-style: preserve-3d;

      .picker-column {
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        color: #848484;
      }

      .picker-column-hidden {
        visibility: hidden;
        opacity: 0;
      }

    }

    .picker-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-position: top, bottom;
      background-size: 100% 108px;
      background-repeat: no-repeat;
      z-index: 3;
    }

    .picker-indicator {
      position: absolute;
      top: 108px;
      width: 100%;
      height: 34px;
      border-top: 1px solid #ebedf0;
      border-bottom: 1px solid #ebedf0;
      z-index: 3;
    }

  }
</style>
