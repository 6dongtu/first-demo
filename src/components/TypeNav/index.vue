<template lang="">
    <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <!-- 过渡动画 -->
                    <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item bo" v-for="(c1,index) in categoryList" ::key="c1.categoryId" :class="{cur:currentIndex==index}">
                                <!-- 一级标签 -->
                                <h3 @mouseenter="changeIndex(index)" >
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId" href='javascript:;'>{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二三级标签 -->
                                <!--  -->
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem " v-for="(c2,index) in c1.categoryChild" ::key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId" href='javascript:;'>{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" ::key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId" href='javascript:;'>{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
        </div>
</template>
<script>
import { mapState } from 'vuex'
// 引入lodash中的节流函数
import { throttle } from 'lodash'
export default {
    name: 'TypeNav',
    data() {
        return {
            // 存储用户鼠标移入的index
            currentIndex: -1,
            show: true,
        }
    },
    // 组件挂载完毕，向服务器发请求
    mounted() {
        
        // 组件在seach模块中挂载完毕后，让show=false
        if (this.$route.path != '/home') {
            this.show = false
        }   
    },
    computed: {
        ...mapState({
            // 右侧分类列表
            categoryList: state => state.home.categoryList
        })
    },
    methods: {
        // 鼠标移入
        // es5写法->引入节流函数
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        // 鼠标移出
        leaveIndex() {
            this.currentIndex = -1
            // 判断是否是search模块
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        goSearch(event) {
            // 最好的解决方案：编程式导航+事件委派
            // 事件委派：利用了冒泡，只操作一次
            // 获取到当前触发事件的元素
            let element = event.target
            let { categoryname, category1id, category2id, category3id } = element.dataset

            if (categoryname) {
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                // 判断：是否携带params参数
                if (category1id) {
                    query.category1Id = category1id
                }
                else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                if(this.$route.params){
                    // 整理路由跳转的参数,实现路由跳转
                    location.params = this.$route.params
                    location.query = query
                    this.$router.push(location)
                }
                
            }

        },
        enterShow(){
            if(this.$route.path!='/home'){
                this.show=true
            }
            this.show=true
        }
    }
}
</script>
<style lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                // .item:hover {
                //     background-color: skyblue;
                // }
                .cur {
                    background-color: skyblue;
                }
            }
        }
        
        // 过渡动画的样式
        .sort-enter{
            height: 0;
        }
        .sort-enter-to{
            height: 461px;
        }

        .sort-enter-active{
            transition: all .5s linear;
        }
        // .sort-leave{
        //     height: 461px;
        // }
        // .sort-leave-to{
        //     height: 0;
        // }

        // .sort-leave-active{
        //     transition: all .5s linear;
        // }   
    }
}
</style>