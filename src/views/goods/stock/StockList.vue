<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card style="width:100%;margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo" clearable @clear="getStockList">
            <el-button slot="append" icon="el-icon-search" @click="getStockList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  icon="el-icon-plus"  @click="addClick()">添加库存数据</el-button>
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
        <el-table-column label="商品编号" prop="goodsNo" sortable ></el-table-column>
        <el-table-column label="库存数量" prop="stockQuantity" sortable></el-table-column>
        <el-table-column label="库存预警" prop="stockWarn" sortable></el-table-column>
        <el-table-column label="库存告警" prop="stockAlert" sortable></el-table-column>
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
      <el-form :model="stockForm" ref="editFormRef" :rules="stockFormRules" label-width="100px">
        <el-form-item label="商品编号" prop="goodsNo">
          <el-input v-model="stockForm.goodsNo"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stockQuantity">
          <el-input-number v-model="stockForm.stockQuantity" controls-position="right" :min="0" :max="10"></el-input-number>
<!--          <el-input v-model="stockForm.stockQuantity"></el-input>-->
        </el-form-item>
        <el-form-item label="库存预警" prop="stockWarn">
          <el-input-number v-model="stockForm.stockWarn" controls-position="right" :min="0" :max="10"></el-input-number>
<!--          <el-input v-model="stockForm.stockWarn"></el-input>-->
        </el-form-item>
        <el-form-item label="库存告警" prop="stockAlert">
          <el-input-number v-model="stockForm.stockAlert" controls-position="right" :min="0" :max="10"></el-input-number>
<!--          <el-input v-model="stockForm.stockAlert"></el-input>-->
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
  name: 'StockList',
  data () {
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有列表
      typeList: [],
      imageUrl: '',
      titleMap: {
        addClick: '添加库存数据',
        editClick: '编辑库存数据'
      },
      dialogStatus: '',
      dialogFormVisible: false,
      // 库存表单
      stockForm: {
        goodsNo: '',
        stockQuantity: '',
        stockWarn: '',
        stockAlert: ''
      },
      //  库存表单验证
      stockFormRules: {
        goodsNo: '',
        stockQuantity: '',
        stockWarn: '',
        stockAlert: ''
      }
    }
  },
  created () {
    this.getStockList()
  },
  methods: {
    getStockList () {
      const _this = this
      this.$axios.get('http://localhost:8082/stock/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
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
      this.getStockList()
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
      this.stockForm = {// 初始化addForm中的值
        goodsNo: '',
        stockQuantity: '',
        stockWarn: '',
        stockAlert: ''
      }
    },
    // 编辑
    editClick (row) {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'editClick'
      // 获得数据显示在编辑信息模态框里面
      this.stockForm = Object.assign({}, row)
    },
    // 提交
    submitForm () {
      const _this = this
      if (!this.stockForm.typeId) { // 当没有传过来id的时候,说明是添加,所以发送添加请求
        this.$axios.post('http://localhost:8082/stock/add', this.stockForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.dialogFormVisible = false
            _this.getStockList()
          } else {
            _this.$message.error('添加失败，请正确填写表单！')
            _this.dialogFormVisible = false
          }
        }).catch(failResponse => {
        })
      } else {
        this.$axios.put('http://localhost:8082/stock/update/' + this.stockForm.typeId, this.stockForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('修改成功！')
            _this.dialogFormVisible = false
            _this.getStockList()
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
      this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8082/stock/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getStockList()
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
