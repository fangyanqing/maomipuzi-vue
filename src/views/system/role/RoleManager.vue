<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card style="width:100%;margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getRoleList">
            <el-button slot="append" icon="el-icon-search" @click="getRoleList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  icon="el-icon-plus"  @click="addClick()">添加角色</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  icon="el-icon-download"  @click="downloadClick()">excel导出</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="width:100%;margin-top: 10px">
      <!-- 角色列表 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="角色类型" prop="roleType" :formatter="roleTypeFormat"></el-table-column>
        <el-table-column label="权限描述" prop="permission"></el-table-column>
        <el-table-column label="角色级别" prop="level"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRoleById(scope.row.id)">删除</el-button>
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

    <!-- 添加/编辑对话框 -->
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="roleForm" ref="editRoleFormRef" :rules="roleFormRules" label-width="100px">
        <el-form-item label="角色类型" prop="roleType">
          <el-select v-model="roleForm.roleType" placeholder="请选择" @change="chickValue">
            <el-option
              v-for="item in roleTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限描述" prop="permission">
          <el-input v-model="roleForm.permission"></el-input>
        </el-form-item>
        <el-form-item label="角色级别" prop="level">
          <el-input v-model="roleForm.level"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'roleManager',
  data () {
    return {
      queryInfo: {
        query: ''
      },
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有角色列表
      rolesList: [],
      // 权限列表
      rightsList: [],
      titleMap: {
        addClick: '添加角色',
        editClick: '编辑角色'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      // 角色表单
      roleForm: {
        roleType: '',
        permission: '',
        level: '',
        remark: ''
      },
      //  角色表单验证
      roleFormRules: {
        roleType: '',
        permission: '',
        level: '',
        remark: ''
      },
      roleType: 1,
      roleTypeList: [{
        value: 0,
        label: '超级管理员'
      }, {
        value: 1,
        label: '管理员'
      }, {
        value: 2,
        label: '审核员'
      }]
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      const _this = this
      this.$axios.get('http://localhost:8081/role/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取角色列表失败！')
        }
        _this.rolesList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getRoleList()
    },
    chickValue () {
      console.log(this.roleType)
    },
    roleTypeFormat (date) {
      if (date.roleType === 0) {
        return '超级管理员'
      } else if (date.roleType === 1) {
        return '管理员'
      } else if (date.roleType === 2) {
        return '审核员'
      } else if (date.roleType === null) {
        return ''
      } else {
        return '其他'
      }
    },
    // excel导出
    downloadClick () {
    },
    // 添加
    addClick () {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'addClick'
      this.roleForm = {// 初始化addForm中的值
        roleType: 1,
        permission: '',
        level: '',
        remark: ''
      }
    },
    // 编辑
    editClick (row) {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'editClick'
      // 获得数据显示在编辑信息模态框里面
      this.roleForm = Object.assign({}, row)
    },
    // 提交
    submitForm () {
      const _this = this
      if (!this.roleForm.id) { // 当没有传过来id的时候,说明是添加,所以发送添加请求
        this.$axios.post('http://localhost:8081/role/add', this.roleForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.dialogFormVisible = false
            _this.getRoleList()
          } else {
            _this.$message.error('添加失败，请正确填写表单！')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      } else {
        this.$axios.put('http://localhost:8081/role/update/' + this.roleForm.id, this.roleForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('修改成功！')
            _this.dialogFormVisible = false
            _this.getRoleList()
          } else {
            _this.$message.error('修改失败，请正确填写表单！')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      }
    },
    // 删除
    removeRoleById (id) {
      const _this = this
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8081/role/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getRoleList()
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
