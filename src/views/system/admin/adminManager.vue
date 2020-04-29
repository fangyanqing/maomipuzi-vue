<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统首页</el-breadcrumb-item>
    </el-breadcrumb>

    <!--搜索框-->
    <el-card style="margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-date-picker
            v-model="valueTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="addClick()">添加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="width:100%;margin-top: 10px">
      <!-- 表格数据 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column prop="adminId" label="ID" sortable width="80"> </el-table-column>
        <el-table-column prop="adminName" label="姓名" width="120"> </el-table-column>
        <el-table-column prop="roleType" label="角色" width="120" :formatter="roleTypeFormat"> </el-table-column>
        <el-table-column prop="phone" label="电话" width="120"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
        <el-table-column prop="createTime" label="日期" sortable width="200" column-key="date" :formatter="dateFormat"> </el-table-column>
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
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deletedClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :current-page="pagenum"
        :page-size="pageSize"
        :total="total"
        @current-change="page"
         >
      </el-pagination>
    </el-card>
    <!-- 模态框的实现 -->
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
     <el-form ref="adminFormBox" :model="adminForm" label-width="100px" class="demo-ruleForm" size="mini" :rules="adminFormRules">
       <el-row>
         <el-col :span="10">
           <el-form-item label="姓名" >
             <el-input v-model="adminForm.adminName" auto-complete="off"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="10"  >
           <el-form-item label="密码" >
             <el-input v-model="adminForm.password" auto-complete="off" ></el-input>
           </el-form-item >
         </el-col>
<!--         <el-col :span="10"  v-if="radio==='1'" >-->
<!--           <el-form-item label="密码" >-->
<!--             <el-input v-model="adminForm.password" auto-complete="off"></el-input>-->
<!--           </el-form-item >-->
<!--         </el-col>-->
       </el-row>

       <el-row>
         <el-col :span="10">
           <el-form-item label="电话">
             <el-input v-model="adminForm.phone" auto-complete="off"></el-input>
           </el-form-item >
         </el-col>
         <el-col :span="10">
           <el-form-item label="邮箱">
             <el-input v-model="adminForm.email" auto-complete="off"></el-input>
           </el-form-item >
         </el-col>
       </el-row>

       <el-row>
         <el-col :span="10">
           <el-form-item label="身份证">
             <el-input v-model="adminForm.identification" auto-complete="off"></el-input>
           </el-form-item >
         </el-col>
         <el-col :span="10">
           <el-form-item label="住址">
             <el-input v-model="adminForm.address" auto-complete="off"></el-input>
           </el-form-item >
         </el-col>
       </el-row>

       <el-row>
         <el-col :span="10">
           <el-form-item label="性别">
               <el-radio v-model="adminForm.gender" :label="1">男</el-radio>
               <el-radio v-model="adminForm.gender" :label="2">女</el-radio>
           </el-form-item >
         </el-col>
         <el-col :span="10">
           <el-form-item label="头像">
             <el-upload
               class="avatar-uploader"
               action="https://jsonplaceholder.typicode.com/posts/"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload">
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
           </el-form-item >
         </el-col>
       </el-row>

       <el-row>
         <el-col :span="10"> <el-form-item label="角色">
           <el-radio v-model="adminForm.roleType" :label="0">超级管理员</el-radio>
           <el-radio v-model="adminForm.roleType" :label="1">管理员</el-radio>
           <el-radio v-model="adminForm.roleType" :label="2">审核员</el-radio>
         </el-form-item >
         </el-col>
         <el-col :span="10">
           <el-form-item label="状态">
             <el-radio v-model="adminForm.enable" :label="1">启用</el-radio>
             <el-radio v-model="adminForm.enable" :label="0">禁用</el-radio>
           </el-form-item >
         </el-col>
       </el-row>

     </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">取 消</el-button>
       <el-button type="primary" @click="submitForm">确 定</el-button>
       <el-button type="info" @click="resetForm">重置</el-button>
      </div>
    </el-dialog>
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
      pagenum: 1,
      pageSize: 6,
      total: 0,
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      },
      dialogFormVisible: false,
      adminForm: {
      },
      adminFormRules: {
      },
      imageUrl: '',
      titleMap: {
        addClick: '添加管理员',
        editClick: '编辑管理员'
      },
      dialogStatus: ''
    }
  },
  created () {
    this.getAdminList()
  },
  methods: {
    async getAdminList () {
      const _this = this
      this.$axios.get('http://localhost:8081/admin/search/' + _this.pagenum + '/' + _this.pageSize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取管理员列表列表失败！')
        }
        _this.tableData = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
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
    page (newSize) {
      this.pagenum = newSize
      this.getAdminList()
    },
    // 添加页面跳转
    addClick () {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'addClick'
      this.adminForm = {// 初始化addForm中的值
        adminName: '',
        password: '',
        gender: 1,
        avatar: '',
        phone: '',
        email: '',
        identification: '',
        address: '',
        roleType: 1,
        enable: 1
      }
      this.adminFormRules = {
        adminName: '',
        password: '',
        gender: 1,
        avatar: '',
        email: '',
        address: '',
        roleType: 1,
        enable: 1,
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        identification: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { min: 15, max: 18, message: '长度为15或者18位', trigger: 'blur' }
        ]
      }
    },
    // 修改
    editClick (row) {
      console.log(row.adminId)
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'editClick'
      // 获得数据显示在编辑信息模态框里面
      this.adminForm = Object.assign({}, row)
    },
    deletedClick (row) {
      const _this = this
      this.$axios.put('http://localhost:8081/admin/deleted/' + this.adminForm.adminId, this.adminForm).then(function (resp) {
        if (resp.data.code === 200) {
          _this.$message.success('删除成功！')
          _this.dialogFormVisible = false
          _this.getAdminList()
        } else {
          _this.$message.error('删除失败！')
          _this.dialogFormVisible = false
          _this.getAdminList()
        }
      }).catch(failResponse => {
      })
    },
    // 头像上下传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm () {
      const _this = this
      if (!this.adminForm.id) { // 当没有传过来id的时候,说明是添加,所以发送添加请求
        this.$axios.post('http://localhost:8081/admin/add', this.adminForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.dialogFormVisible = false
            _this.getAdminList()
          } else {
            _this.$message.error('添加失败！')
            _this.dialogFormVisible = false
            _this.getAdminList()
          }
        }).catch(failResponse => {
        })
      } else {
        this.$axios.put('http://localhost:8081/admin/update/' + this.adminForm.adminId, this.adminForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('修改成功！')
            _this.dialogFormVisible = false
            _this.getAdminList()
          } else {
            _this.$message.error('修改失败！')
            _this.dialogFormVisible = false
            _this.getAdminList()
          }
        }).catch(failResponse => {
        })
      }
    },
    resetForm () {
      this.$refs.adminFormBox.resetFields()
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .el-table td, .el-table th {
    text-align: center;
  }
</style>
