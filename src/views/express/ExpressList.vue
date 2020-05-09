<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>快递公司列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card style="width:100%;margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo" clearable @clear="getExpressList">
            <el-button slot="append" icon="el-icon-search" @click="getExpressList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  icon="el-icon-plus"  @click="addClick()">添加快递公司</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  icon="el-icon-download"  @click="downloadClick()">excel导出</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="width:100%;margin-top: 10px">
      <!-- 订单列表 -->
      <el-table :data="expressList" border stripe>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="快递公司编号" prop="expressNo" sortable></el-table-column>
        <el-table-column label="快递公司简称" prop="expressCode" sortable></el-table-column>
        <el-table-column label="快递公司全称" prop="expressName" sortable></el-table-column>
        <el-table-column prop="isShow"  label="是否显示" width="120">
          <template slot-scope="scope">
            <el-switch  v-model="scope.row.isShow" :active-value="1" :inactive-value="0" active-color="#419FFF"
              inactive-color="#B9B9B9" @change="changeSwitch(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
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
      <el-form :model="expressForm" ref="editRoleFormRef" :rules="expressFormRules" label-width="100px">
        <el-form-item label="快递公司编号" prop="expressNo">
          <el-input v-model="expressForm.expressNo"></el-input>
        </el-form-item>
        <el-form-item label="快递公司简称" prop="expressCode">
          <el-input v-model="expressForm.expressCode"></el-input>
        </el-form-item>
        <el-form-item label="快递公司全称" prop="expressName">
          <el-input v-model="expressForm.expressName"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio v-model="expressForm.isShow" :label="1">显示</el-radio>
          <el-radio v-model="expressForm.isShow" :label="0">不显示</el-radio>
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
  name: 'ExpressList',
  data () {
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有订单列表
      expressList: [],
      titleMap: {
        addClick: '添加快递公司',
        editClick: '编辑快递公司色'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      // 表单
      expressForm: {
        expressNo: '',
        expressCode: '',
        expressName: '',
        isShow: ''
      },
      //  表单验证
      expressFormRules: {
        expressNo: '',
        expressCode: '',
        expressName: '',
        isShow: ''
      }
    }
  },
  created () {
    this.getExpressList()
  },
  methods: {
    getExpressList () {
      const _this = this
      this.$axios.get('http://localhost:8087/express/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取订单列表失败！')
        }
        _this.expressList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    changeSwitch (row) {
      console.log(row)
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getExpressList()
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
      this.expressForm = {// 初始化addForm中的值
        expressNo: '',
        expressCode: '',
        expressName: '',
        isShow: 1
      }
    },
    // 编辑
    editClick (row) {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'editClick'
      // 获得数据显示在编辑信息模态框里面
      this.expressForm = Object.assign({}, row)
    },
    // 提交
    submitForm () {
      const _this = this
      if (!this.expressForm.id) { // 当没有传过来id的时候,说明是添加,所以发送添加请求
        this.$axios.post('http://localhost:8087/express/add', this.expressForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.dialogFormVisible = false
            _this.getExpressList()
          } else {
            _this.$message.error('添加失败，请正确填写表单！')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      } else {
        this.$axios.put('http://localhost:8087/express/update/' + this.expressForm.id, this.expressForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('修改成功！')
            _this.dialogFormVisible = false
            _this.getExpressList()
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
      this.$confirm('此操作将永久删除该快递公司, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8087/express/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getExpressList()
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
