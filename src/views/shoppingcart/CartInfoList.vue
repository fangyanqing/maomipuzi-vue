<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>购物车列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="width:100%;margin-top: 10px">
      <!-- 订单列表 -->
      <el-table :data="cartInfoList" border stripe>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="购物车详情ID" prop="cartInfoId" sortable></el-table-column>
        <el-table-column label="购物车ID" prop="cartId" sortable></el-table-column>
        <el-table-column label="商品编号" prop="goodsNo" sortable></el-table-column>
        <el-table-column label="数量" prop="quantity" sortable></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        :current-page="pagenum"
        :page-size="pagesize"
        :total="total"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        background
      ></el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'CartInfoList',
  data () {
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有列表
      cartInfoList: []
    }
  },
  created () {
    this.getCartInfoList()
  },
  methods: {
    getCartInfoList () {
      const _this = this
      this.$axios.get('http://localhost:8086/cartInfo/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取订单列表失败！')
        }
        _this.cartInfoList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getCartInfoList()
    }
  }
}
</script>

<style scoped>

</style>
