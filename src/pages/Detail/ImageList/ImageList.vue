<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper" >
      <div class="swiper-slide" v-for="(item,index) in skuImageList" :key="item.id" >
        <img :src="item.imgUrl" @click="imageActive(index)" :class="{active:index===currentIndex}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data(){
      return {
        currentIndex:0
      }
    },
    props:['skuImageList'],
    watch:{
      // 数据监听:可以保证数据已经从服务器回来了
      skuImageList(newVal,oldVal){
        this.$nextTick(()=>{
          var swiper = new Swiper(this.$refs.cur, {
            slidesPerView: 3,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        })
      }
    },
    methods:{
      imageActive(index){
        this.currentIndex=index
        this.$bus.$emit('getIndex',index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>