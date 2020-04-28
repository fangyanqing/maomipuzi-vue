<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card style="margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格数据 -->
    <el-card style="width:100%;margin-top: 10px">
      <el-table :data="goodsList" border stripe>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="商品编号" prop="goodsNo" sortable width="120"> </el-table-column>
        <el-table-column label="商品名称" prop="goodsName" width="300px"></el-table-column>
        <el-table-column label="类型名称" prop="typeName" width="100px"></el-table-column>
        <el-table-column label="商品价格(元)" prop="price" width="120px"></el-table-column>
        <el-table-column label="库存" prop="stockNum" width="100px"></el-table-column>
        <el-table-column label="图片" prop="image" width="120px"></el-table-column>
        <el-table-column label="上架日期" prop="shelvesTime" width="160px">
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deletedClick(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        :total="total"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        background
      ></el-pagination>
      <!-- 分页区域 -->
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 6
      },
      // 商品列表
      goodsList: [],
      // 商品总数
      total: 0
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 跳转到添加页面
    goAddPage () {
      this.$router.push('/goods/goodsAdd')
    },
    getGoodsList () {
      // const { data: res } = this.$axios.$http.get('goods', {
      //   params: this.queryInfo
      // })
      const _this = this
      this.$axios.get('http://localhost:8082/skuGoods/search/' + _this.queryInfo.pagenum + '/' + _this.queryInfo.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取商品列表失败！')
        }
        _this.goodsList = resp.data.data.list
        //   console.log(this.goodsList)
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.queryInfo.pagenum = newSize
      this.getGoodsList()
    },
    // 查看详情
    handleClick (row) {

    },
    // 编辑
    editClick (row) {
    },
    // 删除
    deletedClick (id) {
      const _this = this
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8082/skuGoods/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getGoodsList()
          } else {
            _this.$message.error('删除失败！')
          }
        }).catch(failResponse => {
        })
      }).catch(() => {
        return this.$message.info('已取消删除！')
      })
    }
  }
}
</script>

<style scoped>
  .el-table td, .el-table th {
    text-align: center;
  }
</style>
