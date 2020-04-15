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
          :formatter="formatRoleType"
          width="120">
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
          column-key="date">
        </el-table-column>
        <el-table-column
          label="是否启用"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              active-value="1"
              inactive-value="0"
              active-color="#419FFF"
              inactive-color="#B9B9B9"
              @change="changeSwitch(scope.row)"/>
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
        :page-size="3"
        :total="30"
         >
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'adminManager',

  data () {
    return {
      tableData: [
        {
          adminId: '1',
          adminName: 'daqing',
          roleType: '0',
          phone: '18877191649',
          email: '2637528271@qq.com',
          createTime: '2020-04-15 00:00:00',
          enable: '1'
        }, {
          adminId: '2',
          adminName: 'daqing',
          roleType: '1',
          phone: '18877191649',
          email: '2637528271@qq.com',
          createTime: '2020-04-15 00:00:00',
          enable: '2'
        }
      ],
      valueTime: '',
      pageSize: '3',
      total: '30'
    }
  },

  methods: {
    handleClick (row) {
      console.log(row)
    },
    changeSwitch (data) {
      console.log(data)
    },
    formatRoleType: function (row, column, cellValue) {
      if (cellValue === '0') {
        return '超级管理员'
      }
      if (cellValue === '1') {
        return '管理员'
      }
      if (cellValue === '2') {
        return '审核员'
      }
    }
  }

  // created () {
  //   const _this = this
  //   this.$axios.get('http://localhost:8081/admin/findAll').then(function (resp) {
  //     console.log(resp)
  //     _this.tableData = resp.data.registerUsers
  //     // _this.pageSize = resp.data.size
  //   // _this.total = resp.data.total
  //   }).catch(failResponse => {
  //   })
  // }
}
</script>

<style scoped>
</style>
