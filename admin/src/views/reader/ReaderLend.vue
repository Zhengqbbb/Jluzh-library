<template>
  <div class="about">
    <h1> 借阅图书</h1>
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

    <el-form label-width="120px" @submit.native.prevent="saveform('model')">

      <el-form-item label="借阅书籍:">
        <el-select v-model="model" placeholder="请选择借阅的书籍" label="借阅书籍" multiple>
          <el-option v-for="item in books" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">借阅</el-button>
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

      saveform(model) {
        if (this.model.length == 0) {
          return this.$message({
            type: 'warning',
           message: '请选择借阅书籍'
          })
        }
        this.usermodel.lends =this.usermodel.lends.concat(this.model) 
        /**
         * 借阅
         */
        this.model.forEach(element => {
          this.books.forEach(bookitem =>{
            if(element == bookitem._id){
              bookitem.remain--;
              const res1 = this.$http.put(`book/books/${bookitem._id}`, bookitem)
            }
          });
        });
        this.save()
      },
      async save() {
        let res = this.$http.put(`reader/readers/${this.id}`, this.usermodel)
        res = await this.$http.get('reader/readers')
        this.$router.push('/reader/list')
        this.$message({
          type: 'success',
          message: '借阅成功'
        })
      },
      async fetchUsermodel() {
        const res = await this.$http.get(`reader/readers/${this.id}`)
        this.usermodel = res.data
      },
      async fetchBooks() {
        const res = await this.$http.get('book/books')
        this.books = res.data
      }
    },
    created() {
      this.fetchBooks()
      this.fetchUsermodel()
    }
  }
</script>