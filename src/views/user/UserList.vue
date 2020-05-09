<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card style="width:100%;margin-top: 10px">
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
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
    <!-- 用户列表区域 -->
    <el-table :data="userList" border stripe>
      <!-- stripe: 斑马条纹
      border：边框-->
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="userNickname" label="昵称"></el-table-column>
      <el-table-column prop="realName" label="真实姓名"></el-table-column>
      <el-table-column prop="gender" label="性别" width="60"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="roleType" label="角色" width="120" :formatter="roleTypeFormat"> </el-table-column>
      <el-table-column prop="address" label="住址"></el-table-column>
      <el-table-column prop="enable"  label="是否启用" width="120">
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
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="mini" @click="editClick(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="removeById(scope.row.id)">删除</el-button>
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
      <el-form :model="userForm" ref="editFormRef" :rules="userFormRules" label-width="100px">
        <el-form-item label="昵称" >
          <el-input v-model="userForm.userNickname"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" >
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" >
          <el-input v-model="userForm.roleType"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="level">
          <el-input v-model="userForm.address"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio v-model="userForm.enable" :label="1">启用</el-radio>
          <el-radio v-model="userForm.enable" :label="0">禁用</el-radio>
        </el-form-item >
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
  name: 'UserList',
  data () {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 自定义手机号规则
    var checkPhone = (rule, value, callback) => {
      const regPhone = /^1[34578]\d{9}$/
      if (regPhone.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有角色列表
      userList: [],
      titleMap: {
        addClick: '添加用户',
        editClick: '编辑用户'
      },
      // 用户表单
      userForm: {},
      dialogStatus: '',
      dialogFormVisible: false,
      userFormRules: {
        userNickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '昵称的长度在2～20个字',
            trigger: 'blur'
          }
        ],
        realName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '用户名的长度在2～10个字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        gender: 1,
        enable: 1,
        roleType: 3,
        address: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 监听 switch开关 状态改变
    changeSwitch (row) {
      console.log('------row.userId-------' + row.userId)
      const _this = this
      this.$axios.put('http://localhost:8083/user/update/' + row.userId, row.enable).then(function (resp) {
        if (resp.data.code === 200) {
          _this.$message.success('更新用户状态成功！')
          _this.getRoleList()
        } else {
          _this.$message.error('更新用户状态失败！')
        }
      })
    },
    getUserList () {
      const _this = this
      this.$axios.get('http://localhost:8083/user/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取用户列表失败！')
        }
        _this.userList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getUserList()
    },
    roleTypeFormat (date) {
      if (date.roleType === null) {
        return ''
      } else if (date.roleType === 3) {
        return '会员'
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
      this.userForm = {// 初始化addForm中的值
        userNickname: '',
        realName: '',
        password: '',
        email: '',
        phone: '',
        gender: 1,
        enable: 1,
        roleType: 3,
        address: ''
      }
    },
    // 查看
    handleClick (row) {
      console.log(row)
    },
    // 编辑
    editClick (row) {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'editClick'
      // 获得数据显示在编辑信息模态框里面
      this.userForm = Object.assign({}, row)
    },
    // 删除
    removeById (id) {
      console.log(id)
      const _this = this
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8083/user/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getUserList()
          } else {
            _this.$message.error('删除失败！')
          }
        }).catch(failResponse => {
        })
      }).catch(() => {
        return this.$message.info('已取消删除！')
      })
    },
    // 提交
    submitForm () {
      const _this = this
      if (!this.userForm.userId) { // 当没有传过来id的时候,说明是添加,所以发送添加请求
        this.$axios.post('http://localhost:8083/user/add', this.userForm).then(function (resp) {
          console.log(resp)
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.dialogFormVisible = false
            _this.getUserList()
          } else {
            _this.$message.error('添加失败，请正确填写表单!')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      } else {
        this.$axios.put('http://localhost:8083/user/update/' + this.userForm.userId, this.userForm).then(function (resp) {
          console.log(resp)
          if (resp.data.code === 200) {
            _this.$message.success('修改成功！')
            _this.dialogFormVisible = false
            _this.getUserList()
          } else {
            _this.$message.error('修改失败，请正确填写表单！')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      }
    }

  }
}
</script>

<style scoped>

</style>
