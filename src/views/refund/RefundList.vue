<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>退款列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card style="width:100%;margin-top: 10px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getRefundList">
            <el-button slot="append" icon="el-icon-search" @click="getRefundList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"  icon="el-icon-download"  @click="downloadClick()">excel导出</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="width:100%;margin-top: 10px">
      <!-- 订单列表 -->
      <el-table :data="refundList" border stripe>
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="订单编号" prop="orderNo" width="150"></el-table-column>
        <el-table-column label="退款方式" prop="refundWay" width="80" :formatter="refundWayFormat"></el-table-column>
        <el-table-column label="退款原因" prop="refundReason" width="100" :formatter="refundReasonFormat"></el-table-column>
        <el-table-column label="退款说明" prop="refundInstructions" width="200"></el-table-column>
        <el-table-column label="货物状态" prop="goodsStatus" width="80" :formatter="goodsStatusFormat"></el-table-column>
        <el-table-column label="退款状态" prop="status" width="80" :formatter="statusFormat"></el-table-column>
        <el-table-column label="退款申请时间" prop="applicationTime" width="110" :formatter="dateFormat"></el-table-column>
        <el-table-column label="退款成功时间" prop="successTime" width="110" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作人" prop="operator" width="80"></el-table-column>
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
      <el-form :model="refundForm" ref="editFormRef" :rules="refundFormRules" label-width="100px">
        <el-form-item label="订单编号" prop="orderNo">
          <el-input v-model="refundForm.orderNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="退款方式" prop="roleType">
          <el-select v-model="refundForm.refundWay" placeholder="请选择">
            <el-option
              v-for="item in refundWayList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
<!--          <el-input v-model="refundForm.refundWay"></el-input>-->
        <el-form-item label="退款原因" prop="refundReason">
          <el-select v-model="refundForm.refundReason" placeholder="请选择">
            <el-option
              v-for="item in refundReasonList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input v-model="refundForm.refundReason"></el-input>-->
        </el-form-item>
        <el-form-item label="退款说明" prop="refundInstructions">
          <el-input v-model="refundForm.refundInstructions"></el-input>
        </el-form-item>
        <el-form-item label="货物状态" prop="goodsStatus">
          <el-select v-model="refundForm.goodsStatus" placeholder="请选择">
            <el-option
              v-for="item in goodsStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input v-model="refundForm.goodsStatus"></el-input>-->
        </el-form-item>
        <el-form-item label="退款状态" prop="status">
          <el-select v-model="refundForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-input v-model="refundForm.status"></el-input>-->
        </el-form-item>
        <el-form-item label="退款申请时间" prop="applicationTime">
          <el-input v-model="refundForm.applicationTime" :disabled="true"></el-input>
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
import Moment from 'moment'

export default {
  name: 'RefundList',
  data () {
    return {
      queryInfo: '',
      pagenum: 1,
      pagesize: 6,
      total: 0,
      // 所有列表
      refundList: [],
      titleMap: {
        editClick: '编辑退款数据'
      },
      dateFormat (row) {
        if (row.createTime === null) {
          return ''
        }
        return Moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')
      },
      dialogStatus: '',
      dialogFormVisible: false,
      // 库存表单
      refundForm: {
        orderNo: '',
        refundWay: '',
        refundReason: '',
        refundInstructions: '',
        goodsStatus: '',
        status: '',
        applicationTime: ''
      },
      //  库存表单验证
      refundFormRules: {},
      refundWay: 0,
      refundWayList: [{
        value: 0,
        label: '线上退款'
      }, {
        value: 1,
        label: '线下退款'
      }],
      refundReason: 0,
      refundReasonList: [
        {
          value: 0,
          label: '拍错/不喜欢'
        },
        {
          value: 1,
          label: '实际与商品不符'
        },
        {
          value: 2,
          label: '卖家发错货'
        },
        {
          value: 3,
          label: '其他'
        }
      ],
      goodsStatus: 0,
      goodsStatusList: [
        {
          value: 0,
          label: '未收到货'
        },
        {
          value: 1,
          label: '已收到货'
        }
      ],
      status: 0,
      statusList: [
        {
          value: 0,
          label: '审核中'
        },
        {
          value: 1,
          label: '未审核'
        },
        {
          value: 2,
          label: '退款失败'
        },
        {
          value: 3,
          label: '退款成功'
        }
      ]
    }
  },
  created () {
    this.getRefundList()
  },
  methods: {
    getRefundList () {
      const _this = this
      this.$axios.get('http://localhost:8085/refund/search/' + _this.pagenum + '/' + _this.pagesize).then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取退款列表失败！')
        }
        _this.refundList = resp.data.data.list
        _this.total = resp.data.data.total
      })
    },
    handleCurrentChange (newSize) {
      this.pagenum = newSize
      this.getRefundList()
    },
    refundWayFormat (date) {
      if (date.refundWay === null) {
        return ''
      } else if (date.refundWay === 0) {
        return '线上退款'
      } else if (date.refundWay === 1) {
        return '线下退款'
      }
    },
    refundReasonFormat (date) {
      if (date.deliveryStatus === null) {
        return ''
      } else if (date.refundReason === 0) {
        return '拍错/不喜欢'
      } else if (date.refundReason === 1) {
        return '实际与商品不符'
      } else if (date.refundReason === 2) {
        return '卖家发错货'
      } else if (date.refundReason === 3) {
        return '其他'
      }
    },
    goodsStatusFormat (date) {
      if (date.goodsStatus === null) {
        return ''
      } else if (date.goodsStatus === 0) {
        return '未收到货'
      } else if (date.goodsStatus === 1) {
        return '已收到货'
      }
    },
    statusFormat (date) {
      if (date.status === null) {
        return ''
      } else if (date.status === 0) {
        return '审核中'
      } else if (date.status === 1) {
        return '未审核'
      } else if (date.status === 2) {
        return '退款失败'
      } else if (date.status === 3) {
        return '退款成功'
      }
    },
    // excel导出
    downloadClick () {
    },
    // 编辑
    editClick (row) {
      // 显示弹框
      this.dialogFormVisible = true
      // 新增弹框标题
      this.dialogStatus = 'editClick'
      // 获得数据显示在编辑信息模态框里面
      this.refundForm = Object.assign({}, row)
    },
    // 提交
    submitForm () {
      const _this = this
      this.$axios.put('http://localhost:8085/refund/update/' + this.refundForm.id, this.refundForm).then(function (resp) {
        if (resp.data.code === 200) {
          _this.$message.success('修改成功！')
          _this.dialogFormVisible = false
          _this.getRefundList()
        } else {
          _this.$message.error('修改失败，请正确填写表单！')
          _this.dialogFormVisible = false
        }
      }).catch(failResponse => {
      })
    },
    // 删除
    removeById (id) {
      const _this = this
      this.$confirm('此操作将永久删除该退款记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定按钮的操作
        this.$axios.delete('http://localhost:8085/refund/deleted/' + id).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('删除成功！')
            _this.getRefundList()
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
