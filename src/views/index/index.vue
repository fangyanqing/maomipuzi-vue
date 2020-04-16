<template>
  <body>
    <div>
      <!--头部-->
      <el-row>
        <el-header style="height: 60px; padding: 0px;overflow: hidden">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="red">
            <el-menu-item style="width: 200px">
              <img style="width: 80px; height: 24px;" src="../../assets/login/logo.png" />
            </el-menu-item>
            <el-menu-item v-for="(item3,index3) in $router.options.routes2" :key="item3.name" :index="index3+''">{{item3.name}}</el-menu-item>
            <el-menu-item class="avatar">
              <el-avatar><img src="../../assets/index/tx.jpg"/></el-avatar>
              <span style="margin-left: 10px">fangyanqing</span>
              <img style="width: 30px; height: 25px;margin: 0 -40px 0 10px" src="../../assets/index/line.png" />
            </el-menu-item>
            <el-menu-item style="width: 60px" >
              <img style="width: 30px; height: 21px; margin: 0 10px 0 -10px" src="../../assets/index/home.png" />
              <img style="width: 30px; height: 25px;" src="../../assets/index/line.png" />
            </el-menu-item>
            <el-menu-item style="width: 60px">
              <img style="width: 30px; height: 21px; margin: 0 10px 0 -10px;" src="../../assets/index/news.png" />
              <img style="width: 30px; height: 25px;" src="../../assets/index/line.png" />
            </el-menu-item>
            <el-menu-item style="width: 60px">
              <img style="width: 30px; height: 21px; margin: 0 10px 0 -10px;" src="../../assets/index/exit.png" />
            </el-menu-item>
          </el-menu>
        </el-header>
      </el-row>
      <!--左侧菜单-->
      <el-container style="height: 600px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu style="background-color: rgb(234,237,237);" router :default-openeds="['0']">
            <el-submenu style="border-bottom: 1px solid #F4F4F4" v-for="(item,index) in $router.options.routes2" :index="index+''" :key="item.name">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="(item2) in item.children" :index="item2.path" :key="item2.name">{{item2.name}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--中间内容-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <!--底部-->
      <el-footer style="line-height: 80px; font-weight: 400;font-style: normal; font-size: 12px;color: #CCC;text-align: center;">Copyright © 计本162班 方艳清 （毕设项目）, All Rights Reserved.</el-footer>
    </div>
  </body>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      activeIndex: '0'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .avatar{
    margin: 0px 0px 0px 300px;
  }
  .title{
    font-size: 18px;
  }
</style>
