<template>
  <div>
    <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="29%">商品</th>
                    <th width="31%">订单详情</th>
                    <th width="13%">收货人</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="orders">

              <table class="order-item" v-for="(data,index) in mydata.records" :key="data.id">
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">{{data.createTime}}　订单编号：{{data.outTradeNo}} <span
                          class="pull-right delete"><img src="../images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(orderList,index) in data.orderDetailList" :key="orderList.id">
                    <td width="60%">
                      <div class="typographic">
                        <img :src="orderList.imgUrl" style="width: 100px;height: 100px;">
                        <a href="#" class="block-text">{{orderList.skuName}}</a>
                        <span>x{{orderList.skuNum}}</span>
                        <a href="#" class="service">售后申请</a>
                      </div>
                    </td>
                    <td :rowspan="data.orderDetailList.length" v-if="index == 0" width="8%" class="center">{{ data.consignee }}</td>
                    <td :rowspan="data.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                      <ul class="unstyled">
                        <li>总金额¥{{ data.totalAmount }}</li>
                        <li>在线支付</li>

                      </ul>
                    </td>
                    <td :rowspan="data.orderDetailList.length" v-if="index == 0" width="8%" class="center">
                      <a href="#" class="btn">{{data.orderStatusName}} </a>
                    </td>
                    <td :rowspan="data.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">评价|晒单</a>
                        </li>

                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="choose-order">
              <Pagination :pageNo="page" :pageSize="limit" :total="mydata.total" :continues="5" @getPageNo="getPageNo"></Pagination>
            </div>
          </div>
          <!--猜你喜欢-->
          <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike01.png" />
                </div>
                <div class="attr">
                  <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>3699.00</i>
                </div>
                <div class="commit">已有6人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike02.png" />
                </div>
                <div class="attr">
                  Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4388.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike03.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike04.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
            </ul>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'myOrder',

  data() {
    return {
      page:1,
      limit:3,
      mydata:{}
    };
  },

  mounted() {
    this.getMyData()
  },

  methods: {
    async getMyData(){
      const {page,limit} = this
      let result = await this.$API.reqMyOrderList(page,limit)
      if(result.code ==200){
        this.mydata = result.data
      }else{
        alert('获取数据失败')
      }
    },
    getPageNo(page){
      this.page = page
      this.getMyData()
    }
  },
};
</script>

<style lang="less">

</style>