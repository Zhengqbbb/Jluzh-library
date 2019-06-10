<template>
  <div class="about">
    <h1> 图书入库</h1>
    <el-form label-width="120px" @submit.native.prevent="saveform('form')" :model="form" ref="form">
      
      <el-form-item label="图书名称">
        <el-col :span="4">
          <el-input v-model="model.name" :disabled="true"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="图书现总数量">
        <el-col :span="4">
          <el-input v-model="model.total" :disabled="true"></el-input>
        </el-col>
      </el-form-item>




      <el-form-item label="图书入库数量" prop="value" :rules="[
      { required: true, message: '数量不能为空', trigger: 'blur'},
      { type: 'number', message: '请输入数字', trigger: 'blur'}
    ]">
        <el-col :span="4">
          <el-input v-model.number="form.value" @change="changBook()"></el-input>
        </el-col>
      </el-form-item>




      <el-form-item label="图书剩余">
        <el-col :span="4">
          <el-input v-model="model.remain" :disabled="true"></el-input>
        </el-col>
      </el-form-item>





      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
        form: {
          value: ''
        },
      
      }

    },
    methods: {
      saveform(form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            this.add();
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      changBook() {
        if (this.form.value) {
          this.model.total += parseInt(this.form.value);
          this.model.remain += parseInt(this.form.value);
        } else {
          this.fetch()
        }
      },

      async add() {
        let res
        if (this.id) {
          res = this.$http.put(`/book/books/${this.id}`, this.model)
        } else {
          res = this.$http.post('book/books', this.model)
        }

        this.$router.push('/book/list')
        this.$message({
          type: 'success',
          message: '入库成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`/book/books/${this.id}`)
        this.model = res.data
      },

    },

    created() {
      /* this.fetchCategoryOption() */
      this.id && this.fetch()
    }
  }
</script>