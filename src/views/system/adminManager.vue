<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统首页</el-breadcrumb-item>
    </el-breadcrumb>

    <!--搜索框-->
    <el-card style="margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-date-picker
            v-model="valueTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
<!--        <el-col :span="6">-->
<!--          <el-input placeholder="请输入内容">-->
<!--            <el-button slot="append" icon="el-icon-search" ></el-button>-->
<!--          </el-input>-->
<!--        </el-col>-->
      </el-row>
    </el-card>
    <el-card style="width:100%;margin-top: 10px">
      <!-- 表格数据 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="80">
        </el-table-column>
        <el-table-column
          prop="adminId"
          label="ID"
          sortable
          width="80">
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="roleType"
          label="角色"
          width="120"
          :formatter="roleTypeFormat">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          sortable
          width="200"
          column-key="date"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop="enable"
          label="是否启用"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#419FFF"
              inactive-color="#B9B9B9"
              @change="changeSwitch(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="page"
         >
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import Moment from 'moment'

export default {
  name: 'adminManager',

  data () {
    return {
      tableData: [],
      valueTime: '',
      currentPage: 0,
      pageSize: 0,
      total: 0
    }
  },

  methods: {
    handleClick (row) {
      console.log(row)
    },
    changeSwitch (row) {
      console.log(row)
    },
    dateFormat (row) {
      if (row.createTime === null) {
        return ''
      }
      return Moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    roleTypeFormat (date) {
      if (date.roleType === 0) {
        return '超级管理员'
      }
      if (date.roleType === 1) {
        return '管理员'
      }
      if (date.roleType === 2) {
        return '审核员'
      }
      if (date.roleType === null) {
        return ''
      }
    },
    page (currentPage) {
      const _this = this
      this.$axios.get('http://localhost:8081/admin/search/' + (currentPage) + '/2').then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.data.list
      })
    }
  },
  created () {
    const _this = this
    this.$axios.get('http://localhost:8081/admin/search/1/2').then(function (resp) {
      console.log(resp)
      _this.tableData = resp.data.data.list
      _this.pageSize = resp.data.data.size
      _this.total = resp.data.data.total
    }).catch(failResponse => {
    })
  }
}
</script>

<style scoped>
</style>
