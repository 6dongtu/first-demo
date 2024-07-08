<template lang="">
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Link></Link>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>
<script>
// 引入home下的其他组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Link from '@/pages/Home/Link'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
    name:'',
    mounted(){
        this.$store.dispatch('getFloorList')
    },
    computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    },
    components:{
        ListContainer,
        Recommend,
        Rank,
        Link,
        Floor,
        Brand
    }
}
</script>

<style lang="">
    
</style>