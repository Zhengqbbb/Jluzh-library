<template>
  <div class="about">
    <h1> 归还图书</h1>
    <el-form label-width="120px">
      <el-form-item label="学号">
        <el-col :span="4">
          {{usermodel.username}}
        </el-col>
      </el-form-item>

      <el-form-item label="姓名:">
        <el-col :span="4">
          {{usermodel.name}}
        </el-col>
      </el-form-item>
    </el-form>

    <el-form label-width="120px" @submit.native.prevent="saveform('model')" v-if="this.books">

      <el-form-item label="归还书籍:">
        <el-select v-model="model" placeholder="请选择归还的书籍" label="归还书籍" multiple>
          <el-option v-for="(item, index) in books" :key="index" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">归还</el-button>
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
        usermodel: {},
        books: [],
        model: [],

      }
    },
    methods: {
      /**
       * 图书借阅
       */
      saveform(model) {
        if (this.model.length == 0) {
          return this.$message({
            type: 'warning',
            message: '请选择需要归还的书籍'
          })
        }
        this.model.forEach(returnbook => {
          this.books.forEach(bookitem => {
            if (returnbook == bookitem._id) {
              bookitem.remain++;
              const res1 = this.$http.put(`book/books/${bookitem._id}`, bookitem)
            }
          });
          const i = this.usermodel.lends.findIndex((item) => item._id == returnbook);
          this.usermodel.lends.splice(i, 1);
          
        });
        
        this.save()
      },
      async save() {
        let res = this.$http.put(`reader/readers/${this.id}`, this.usermodel)
        this.$router.push('/reader/list')
        this.$message({
          type: 'success',
          message: '归还成功'
        })
      },
      async fetchUsermodel() {
        const res = await this.$http.get(`reader/readers/${this.id}`)
        this.usermodel = res.data
        this.books = this.usermodel.lends
      },

    },
    created() {
      this.fetchUsermodel()
    }
  }
</script>