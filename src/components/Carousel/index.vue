<template lang="">
  <div>
    <div class="swiper-container" ref="cur">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in list" :key="item.id">
          <img :src="item.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: [ 'list' ],
  watch: {
    list: {
      immediate: true,
      // 轮播图 this.$nextTick(() => {})  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      handler() {
        this.$nextTick(() => {
          var swiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
              delay: 2500,
              // disableOnInteraction: false
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            on: {
              autoplayTimeLeft(s, time, progress) {
                progressCircle.style.setProperty("--progress", 1 - progress);
                progressContent.textContent = `${Math.ceil(time / 1000)}s`;
              },
            },
          });
        });
      },
    },
  },
};
</script>
<style lang=""></style>
