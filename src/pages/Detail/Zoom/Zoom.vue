<template>
  <div class="spec-preview">
    <img :src="skuObj.imgUrl" />
    <div class="event" @mousemove="handle" ref="event"></div>
    <div class="big" >
      <img :src="skuObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ['skuDefaultImg',"skuImageList"],
    data(){
      return {
        currentIndex:0
      }
    },
    mounted() {
      this.$bus.$on('getIndex',(index)=>{
        this.currentIndex = index
      })
    },
    computed:{
      skuObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    methods:{
      handle(e){
        let mask =this.$refs.mask
        let event = this.$refs.event
        let big = this.$refs.big
        let left = e.offsetX - mask.offsetWidth/2
        let right = event.offsetWidth - mask.offsetWidth
        let top = e.offsetY - mask.offsetHeight/2
        let bottom = event.offsetHeight - mask.offsetHeight
        //约束范围
        if(left<=0) left=0
        if(left>=right) left = right
        if(top<=0) top=0
        if(top>=bottom) top = bottom
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        big.style.left = -2*left + 'px'
        big.style.top = -2*top + 'px'
      },
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>