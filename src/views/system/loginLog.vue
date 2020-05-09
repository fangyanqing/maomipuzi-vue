<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>登录日志</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card style="width:100%;margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo" clearable @clear="getLoginLogList">
            <el-button slot="append" icon="el-icon-search" @click="getLoginLogList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  icon="el-icon-download"  @click="downloadClick()">excel导出</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="width:100%;margin-top: 10px">
      <!-- 订单列表 -->
      <el-table :data="loginLogList" border stripe>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="登录名" prop="loginName"></el-table-column>
        <el-table-column label="IP地址" prop="ip" sortable></el-table-column>
        <el-table-column label="浏览器" prop="browserName" sortable></el-table-column>
        <el-table-column label="地区" prop="location" sortable></el-table-column>
        <el-table-column label="最近一次登录时间" prop="loginTime" :formatter="dateFormat" sortable></el-table-column>
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
import Moment from 'moment'

export default {
  name: 'LoginLogList',
  data () {
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有列表
      loginLogList: [],
      dateFormat (row) {
        if (row.createTime === null) {
          return ''
        }
        return Moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created () {
    this.getLoginLogListList()
  },
  methods: {
    getLoginLogListList () {
      const _this = this
      this.$axios.get('http://localhost:8081/loginLog/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取订单列表失败！')
        }
        _this.loginLogList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getLoginLogListList()
    },
    // excel导出
    downloadClick () {
    }
  }
}
</script>

<style scoped>

</style>
