<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(carList, index) in cartInfoList"
          :key="carList.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="carList.isChecked == 1"
              @change="updateChecked(carList.skuId,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="carList.imgUrl" />
            <div class="item-msg">{{ carList.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ carList.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="header(carList, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="carList.skuNum"
              minnum="1"
              class="itxt"
              @change="header(carList, 0 , $event.target.value*1)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="header(carList, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ carList.skuPrice * carList.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="delShopCart(carList.skuId)">删除</a>
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartInfoList.length > 0" @change="updateAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="delAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" href="javascript:;" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 节流函数
import { throttle } from 'lodash'
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopData();
  },
  methods: {
    // 获取购物车数据,发请求
    getShopData() {
      this.$store.dispatch("getCartList");
    },
    // 删除购物车数据
    async delShopCart(skuId) {
      try {
        await this.$store.dispatch("deleteCartList", skuId);
        this.getShopData();
        // 删除成功后,重新发请求
      } catch (error) {
        console.error(error);
      }
    },
    // 修改购物车商品数量
    // 传入参数判断
    // 1. 加号 减号 输入框(需要判断输入的是否为数字,是否合法)
    header:throttle(async function(carList, num,val) {
      switch (num) {
        case 1:
          num = 1;
          break;
        case -1:
          num = carList.skuNum > 1 ? -1 : 0;
          break;
        case 0:
          if(isNaN(val) || val < 1){
            num = 0
          }else{
            num = parseInt(val) - carList.skuNum
          }
          break;
        default:
          break;
      }
      try {
        await this.$store.dispatch('addOrUpdateShopCart',{skuId:carList.skuId,skuNum:num})
        this.getShopData();
      } catch (error) {
        console.error(error);
      }
    },1000),

    // 修改购物车商品选中状态
    async updateChecked(skuId,event){
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateChecked',{skuId,isChecked})
        this.getShopData()
      } catch (error) {
        console.error(error);
      }
    },

    // 删除全部选中的商品
    async delAllChecked(){
      try {
        await this.$store.dispatch('deleteAllChecked')
        this.getShopData()
      } catch (error) {
        console.error(error); 
      }
    },
    async updateAllChecked(){
      try {
        await this.$store.dispatch('updateAllChecked',this.isAllCheck ? '0' : '1')
        this.getShopData()
      } catch (error) {
        console.error(error); 
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),

    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },

    // 计算总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if(item.isChecked === 1){
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
    // 判断全部复选框是否选中
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
