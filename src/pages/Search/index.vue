<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="this.searchParams.categoryName">{{ this.searchParams.categoryName }}<i @click="removecateName">×</i></li>
            <li class="with-x" v-if="this.searchParams.keyword">{{ this.searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-if="this.searchParams.trademark">{{ this.searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(items,index) in this.searchParams.props" :key="index">{{ items.split(':')[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <a href="javascript:;">综合<span style="font-size: 20px;" v-if="isOne" class="iconfont" :class="{'icon-up':isUp,'icon-down':!isUp}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a href="javascript:;">价格<span style="font-size: 20px;" v-if="isTwo" class="iconfont" :class="{'icon-up':isUp,'icon-down':!isUp}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(item, index) in goodsList"
                :key="item.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 声明式导航跳转到详情页需要带id -->
                    <router-link :to="`/detail/${item.id}`"
                      ><img v-lazy="item.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  el
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ item.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters,mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        // 商品相应id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 商品名称
        categoryName: "",
        // 搜索关键字
        keyword: "",
        // 排序方式
        order: "1:desc",
        // 当前页数
        pageNo: 1,
        // 每页显示的条数
        pageSize: 5,
        // 平台售卖属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  //定义组件
  components: {
    SearchSelector,
  },
//   当组件挂载完毕之前执行一次
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.GetSearchData();
  },
  computed: {
    ...mapState({
            // 右侧分类列表
            total: state => state.search.ReqGetSearchList.total
        }),
    ...mapGetters(["goodsList"]),
    isOne(){
      return this.searchParams.order.indexOf('1')!== -1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!== -1
    },
    isUp(){
      return this.searchParams.order.indexOf('asc')!== -1
    },
    isDown(){
      return this.searchParams.order.indexOf('desc')!== -1
    },
  },
  methods: {
    GetSearchData() {
      this.$store.dispatch("ReqGetSearchList", this.searchParams);
    },
    // 删除分类名字
    removecateName(){
      // undefined的数据不会发送给服务器
      this.searchParams.categoryName=undefined
      this.searchParams.category1Id=undefined
      this.searchParams.category2Id=undefined
      this.searchParams.category3Id=undefined
      this.GetSearchData();
      this.$router.push({name:'search',params:this.$route.params})
    },
    // 删除关键字
    removeKeyword(){
      // undefined的数据不会发送给服务器
      this.searchParams.keyword=undefined
      this.$bus.$emit('clear')
      this.$router.push({name:'search',query:this.$route.query})
      this.GetSearchData();
    },
    // 自定义事件(只通过子组件传递给父组件)
    trademarkInfo(trademark){
      this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
      this.GetSearchData();
    },
    // 收集品牌信息的自定义事件
    attrInfo(attr,attrValue){
      let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
      console.log(props);
      // 判断数组中是否包含该属性
      if(this.searchParams.props.indexOf(props)===-1){
        this.searchParams.props.push(props)
        this.GetSearchData();
      }
      
    },
    // 删除品牌
    removeTrademark(){
      this.searchParams.trademark=undefined
      this.GetSearchData();
    },
    // 删除品牌属性
    removeAttr(index){
      this.searchParams.props.splice(index,1)
      this.GetSearchData();
    },
    // 价格排序
    changeOrder(flag){
      if(this.searchParams.order.indexOf(flag)!== -1 ){
        let orderflag = this.searchParams.order.split(':')[1]
        this.searchParams.order=`${flag}:${orderflag==='desc'?'asc':'desc'}`
      }
      else this.searchParams.order=`${flag}:desc`
      
      console.log(this.searchParams.order);
      this.GetSearchData();
    },
    // 自定义事件,获取当前点击的页数
    getPageNo(pageNo){
      this.searchParams.pageNo=pageNo
      this.GetSearchData();
    }
  },
  // 数据监听
  watch:{
    // 监听路由信息的变化,发生变化再次发送请求
    $route(){
      this.searchParams.category1Id=undefined
      this.searchParams.category2Id=undefined
      this.searchParams.category3Id=undefined
      // 再次整理请求参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发送请求
      this.GetSearchData();
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>
