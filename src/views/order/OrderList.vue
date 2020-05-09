<template>
    <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card style="width:100%;margin-top: 10px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrderList">
              <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary"  icon="el-icon-download"  @click="downloadClick()">excel导出</el-button>
          </el-col>
        </el-row>
      </el-card>

      <el-card style="width:100%;margin-top: 10px">
        <!-- 订单列表 -->
        <el-table :data="orderList" border stripe>
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column label="订单编号" prop="orderNo" width="150"></el-table-column>
          <el-table-column label="商品编号" prop="goodsNo" width="150"></el-table-column>
          <el-table-column label="订单总数" prop="totalNum" width="80"></el-table-column>
          <el-table-column label="订单总价" prop="totalPrice" width="100"></el-table-column>
          <el-table-column label="支付状态" prop="payStatus" width="80" :formatter="payStatusFormat"></el-table-column>
          <el-table-column label="快递单号" prop="deliveryId" width="150"></el-table-column>
          <el-table-column label="配送方式" prop="deliveryType" width="80" :formatter="deliveryTypeFormat"></el-table-column>
          <el-table-column label="发货状态" prop="deliveryStatus" width="80" :formatter="deliveryStatusFormat"></el-table-column>
          <el-table-column label="订单状态" prop="orderInfoStatus" width="80" :formatter="orderInfoStatusFormat"></el-table-column>
          <el-table-column label="备注" prop="remark" width="200"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editClick">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
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
  name: 'OrderList',
  data () {
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有订单列表
      orderList: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      const _this = this
      this.$axios.get('http://localhost:8085/orderInfo/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取订单列表失败！')
        }
        _this.orderList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getOrderList()
    },
    payStatusFormat (date) {
      if (date.payStatus === null) {
        return ''
      } else if (date.payStatus === 0) {
        return '未付款'
      } else if (date.payStatus === 1) {
        return '已付款'
      } else if (date.payStatus === 2) {
        return '支付失败'
      }
    },
    deliveryTypeFormat (date) {
      if (date.deliveryStatus === null) {
        return ''
      } else if (date.deliveryStatus === 0) {
        return '快递'
      } else if (date.deliveryStatus === 1) {
        return '门店自取'
      }
    },
    deliveryStatusFormat (date) {
      if (date.deliveryStatus === null) {
        return ''
      } else if (date.deliveryStatus === 0) {
        return '发货'
      } else if (date.deliveryStatus === 1) {
        return '未发货'
      } else if (date.deliveryStatus === 2) {
        return '已收货'
      } else if (date.deliveryStatus === 3) {
        return '未收货'
      }
    },
    orderInfoStatusFormat (date) {
      if (date.payStatus === null) {
        return ''
      } else if (date.payStatus === 0) {
        return '正常'
      } else if (date.payStatus === 1) {
        return '退款中'
      }
    },
    // excel导出
    downloadClick () {
    },
    // 编辑
    editClick () {
      // 跳转到编辑页面
      this.$router.push('/order/orderEdit')
    },
    // 删除
    removeById (id) {
      const _this = this
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8085/orderInfo/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getOrderList()
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

</style>
