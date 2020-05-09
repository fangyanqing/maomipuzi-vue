<template>
    <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品类型列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片视图 -->
      <el-card style="width:100%;margin-top: 10px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="请输入内容" v-model="queryInfo" clearable @clear="getTypeList">
              <el-button slot="append" icon="el-icon-search" @click="getTypeList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary"  icon="el-icon-plus"  @click="addClick()">添加商品类型</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary"  icon="el-icon-download"  @click="downloadClick()">excel导出</el-button>
          </el-col>
        </el-row>
      </el-card>

      <el-card style="width:100%;margin-top: 10px">
        <!-- 商品类型列表 -->
        <el-table :data="typeList" border stripe>
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column label="类型名称" prop="typeName"></el-table-column>
          <el-table-column label="类型图片" prop="typePicture"></el-table-column>
          <el-table-column label="类型状态" prop="typeStatus" :formatter="typeStatusFormat"></el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editClick(scope.row)">编辑</el-button>
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

      <!-- 添加/编辑对话框 -->
      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form :model="typeForm" ref="editFormRef" :rules="typeFormRules" label-width="100px">
          <el-form-item label="类型名称" prop="typeName">
            <el-input v-model="typeForm.typeName"></el-input>
          </el-form-item>
          <el-form-item label="类型图片">
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
<!--          <el-form-item label="类型图片" prop="typePicture">-->
<!--            <el-input v-model="typeForm.typePicture"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="类型状态" prop="typeStatus">-->
<!--            <el-input v-model="typeForm.typeStatus"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="类型状态">
            <el-radio v-model="typeForm.typeStatus" :label="0">已弃用</el-radio>
            <el-radio v-model="typeForm.typeStatus" :label="1">可用</el-radio>
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
  name: 'TypeList',
  data () {
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有角色列表
      typeList: [],
      imageUrl: '',
      titleMap: {
        addClick: '添加商品类型',
        editClick: '编辑商品类型'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      // 商品类型表单
      typeForm: {
        typeName: '',
        typePicture: '',
        typeStatus: ''
      },
      //  商品类型表单验证
      typeFormRules: {
        typeName: '',
        typePicture: '',
        typeStatus: ''
      }
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {
    getTypeList () {
      const _this = this
      this.$axios.get('http://localhost:8082/type/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取商品类型列表失败！')
        }
        _this.typeList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getTypeList()
    },
    typeStatusFormat (date) {
      if (date.typeStatus === 0) {
        return '已弃用'
      } else if (date.typeStatus === 1) {
        return '可用'
      }
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
    // excel导出
    downloadClick () {
    },
    // 添加
    addClick () {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'addClick'
      this.typeForm = {// 初始化addForm中的值
        typeName: '',
        typePicture: '',
        typeStatus: ''
      }
    },
    // 编辑
    editClick (row) {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'editClick'
      // 获得数据显示在编辑信息模态框里面
      this.typeForm = Object.assign({}, row)
    },
    // 提交
    submitForm () {
      const _this = this
      if (!this.typeForm.typeId) { // 当没有传过来id的时候,说明是添加,所以发送添加请求
        this.$axios.post('http://localhost:8082/type/add', this.typeForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.dialogFormVisible = false
            _this.getTypeList()
          } else {
            _this.$message.error('添加失败，请正确填写表单！')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      } else {
        this.$axios.put('http://localhost:8082/type/update/' + this.typeForm.typeId, this.typeForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('修改成功！')
            _this.dialogFormVisible = false
            _this.getTypeList()
          } else {
            _this.$message.error('修改失败，请正确填写表单！')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      }
    },
    // 删除
    removeById (id) {
      const _this = this
      this.$confirm('此操作将永久删除该商品类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8082/type/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getTypeList()
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
