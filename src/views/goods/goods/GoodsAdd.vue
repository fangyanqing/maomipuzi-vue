<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card style="margin-top: 10px">
      <!-- 提示 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品添加"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- Tab栏 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="addForm.price" type="number" :min="0"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="weight">
              <el-input v-model="addForm.weight" type="number" :min="0"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="typeName">
              <el-select v-model="addForm.typeName" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品参数" name="1">
            <el-form-item label="商品参数">
              <div>
                <span style="margin-right: 10px">颜色：</span>
                <el-radio v-model="addForm.colour" :label="1" :value="黑色">黑色</el-radio>
                <el-radio v-model="addForm.colour" :label="2" :value="白色">白色</el-radio>
                <el-radio v-model="addForm.colour" :label="3" :value="橘黄色">橘黄色</el-radio>
                <el-radio v-model="addForm.colour" :label="4" :value="灰色">灰色</el-radio>
                <el-radio v-model="addForm.colour" :label="5" :value="棕褐色">棕褐色</el-radio>
              </div>
              <div>
                <span style="margin-right: 10px">性别：</span>
                <el-radio v-model="addForm.sex" :label="1">公猫</el-radio>
                <el-radio v-model="addForm.sex" :label="2">母猫</el-radio>
              </div>
              <div>
                <span style="margin-right: 10px">体型：</span>
                <el-radio v-model="addForm.size" :label="1">大型</el-radio>
                <el-radio v-model="addForm.size" :label="2">中型</el-radio>
                <el-radio v-model="addForm.size" :label="3">小型</el-radio>
              </div>
              <div>
                <span style="margin-right: 10px">年龄：</span>
                <el-radio v-model="addForm.age" :label="1">2个月以内</el-radio>
                <el-radio v-model="addForm.age" :label="2">2-3个月</el-radio>
                <el-radio v-model="addForm.age" :label="3">3-6个月</el-radio>
                <el-radio v-model="addForm.age" :label="4">1岁</el-radio>
                <el-radio v-model="addForm.age" :label="5">1岁以上</el-radio>
              </div>
              <div>
                <span style="margin-right: 10px">市场价格：</span>
                <el-radio v-model="addForm.marketPrice" :label="1">2000元以内</el-radio>
                <el-radio v-model="addForm.marketPrice" :label="2">2000-3000</el-radio>
                <el-radio v-model="addForm.marketPrice" :label="3">3000-5000</el-radio>
                <el-radio v-model="addForm.marketPrice" :label="4">5000-8000</el-radio>
                <el-radio v-model="addForm.marketPrice" :label="5">8000以上</el-radio>
              </div>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品属性" name="2">
            <el-form :model="addForm2">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="addForm.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="副标题" prop="caption">
                  <el-input v-model="addForm2.caption"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="area">
                  <el-input v-model="addForm2.area"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                  <el-input v-model="addForm2.description"></el-input>
                </el-form-item>
                <el-form-item label="性格" prop="characters">
                  <el-input v-model="addForm2.characters"></el-input>
                </el-form-item>
                <el-form-item label="售后服务" prop="sale_service">
                    <el-radio v-model="addForm2.saleService" :label="1">15天内退货</el-radio>
                    <el-radio v-model="addForm2.saleService" :label="2">订单险</el-radio>
                    <el-radio v-model="addForm2.saleService" :label="3">付款三天内发货</el-radio>
                    <el-radio v-model="addForm2.saleService" :label="4">付款七天后未发货，自动退款</el-radio>
                </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="商品图片" name="3">
            <!-- action: 图片上传的API接口地址 -->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headerObj"
              list-type="picture"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>

          <el-tab-pane label="商品添加" name="4">
            <!-- 富文本编辑器 -->
<!--            <quill-editor v-model="addForm.goods_introduce"></quill-editor>-->
            <!-- 添加商品 -->
            <el-button type="primary" class="btnAdd" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </el-card>

    <el-dialog title="图片预览" :visible.sync="previewDialogVisible" width="50%">
      <img :src="picPreviewPath" alt="" class="previewImg">
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'GoodsAdd',
  data () {
    return {
      // 步骤条默认激活 与左侧Tab联动
      activeIndex: '0',
      // 添加商品的表单对象
      addForm: {
        goodsName: '',
        price: 0,
        weight: 0,
        typeName: '',
        colour: '',
        sex: '',
        size: '',
        age: '',
        marketPrice: ''
        // 商品所属分类数组
        // goods_cat: [],
        // 图片的数组
        // pics: [],
        // 商品详情描述
        // description: ''
        // attrs: []
      },
      addForm2: {
        caption: '',
        area: '',
        description: '',
        characters: '',
        saleService: ''
      },
      addFormRules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      // 分类列表
      typeList: [],
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 图片上传地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 图片上传组件的请求对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      picPreviewPath: '',
      // 图片预览对话框
      previewDialogVisible: false
    }
  },
  created () {
    this.getTypeList()
  },
  computed: {
    // getCateId () {
    //   if (this.addForm.typeName.length === 3) {
    //     return this.addForm.typeName[2]
    //   }
    //   return null
    // }
  },
  methods: {
    // 处理图片预览
    handlePreview (file) {
      this.picPreviewPath = file.response.data.url
      this.previewDialogVisible = true
    },
    // 处理移除图片的操作
    handleRemove (file) {
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2.从pics数组中，找到图片对应的索引值
      const i = this.addForm.pics.findIndex(x => x.pic === filePath)
      // 3.调用splice方法，移除图片信息
      this.addForm.splice(i, 1)
    },
    // 监听图片上传成功事件
    handleSuccess (response) {
      // 1.拼接得到一个图片信息对象 临时路径
      const picInfo = { pic: response.data.tmp_path }
      // 2.将图片信息对象，push到pics数组中
      this.addForm.pics.push(picInfo)
    },
    // 获取商品分类数据列表
    getTypeList () {
      const _this = this
      this.$axios.get('http://localhost:8082/type/findAll').then(function (resp) {
        console.log(resp)
        if (resp.data.code !== 200) {
          return _this.$message.error('获取商品列表失败！')
        }
        _this.typeList = resp.data.data
      })
    },
    beforeTabLeave (activeName, odlActiveName) {
      // // 未选中商品分类阻止Tab标签跳转
      // if (odlActiveName === '0' && this.addForm.typeName.length !== 3) {
      //   this.$message.error('请先选择商品分类')
      //   return false
      // }
    },
    // Tab标签被选中时触发
    tabClicked () {
      console.log(this.activeIndex)
      // 访问动态参数面板
      if (this.activeIndex === '1') {

      } else if (this.activeIndex === '2') {

      }
    },
    // 添加商品
    addGoods () {
      this.$refs.addFormRef.validate(async valid => {
        // if (!valid) return this.$message.error('请填写必要的表单项！')
        // 发送请求前：需对提交的表单进行处理goods_cat attrs
        // this.addForm.goods_cat = this.addForm.goods_cat.join(',')
        // 以上写法不对：级联选择器绑定的对象goods_cat要求是数组对象
        // 解决办法: 包：lodash 方法（深拷贝）：cloneDeep(boj)

        // 将this.addForm进行深拷贝

        // 处理动态参数
        this.manyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newInfo)
        })
        // 发起请求添加商品
        // 商品名称必须是唯一的

        const _this = this
        this.$axios.post('http://localhost:8082/skuGoods/add', this.addForm).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.$router.push({path: '/goods/goodsList'})
          } else {
            _this.$message.error('添加失败，请正确填写表单！')
          }
        }).catch(failResponse => {
        })

        this.$axios.post('http://localhost:8082/spuGoods/add', this.addForm2).then(function (resp) {
          if (resp.data.code === 200) {
            _this.$message.success('添加成功！')
            _this.$router.push({path: '/goods/goodsList'})
          } else {
            _this.$message.error('添加失败，请正确填写表单！')
          }
        }).catch(failResponse => {
        })
      })
    }
  }
}
</script>

<style scoped>
  .el-checkbox {
    margin: 0 8px 0 0 !important;
  }
  .el-input{
    width: 90%;
  }
  .previewImg{
    width: 100%;
  }
  .btnAdd{
    margin-top: 15px
  }
</style>
