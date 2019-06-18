<template>
  <div>
    <div class="bookinfor w-common bd d-flex jc-center my-5 p-3">
      <div class="book-img  my-5"><img width="300px" :src="books.img" alt=""></div>
      <div class="book-infors mx-5">
        <el-form ref="form"  label-width="200px">

          <el-form-item class="book-infor" label="图书编号：">
            {{books._id}}
          </el-form-item>
          <el-form-item class="book-infor" label="书名：">
            {{books.name}}
          </el-form-item>
          <el-form-item class="book-infor" label="作者：">
            {{books.author}}
          </el-form-item>
          <el-form-item class="book-infor" label="分类：">
            {{books.category.name}}
          </el-form-item>
          <el-form-item class="book-infor" label="馆内藏书量：">
            {{books.remain}}
          </el-form-item>
          <el-form-item class="book-infor book-state" label="当前状态：">
            {{books.state}}
          </el-form-item>
          <el-form-item class="book-infor" label="图书简介：">
            <div class="bookmessage">{{books.message}}</div>
          </el-form-item>

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        books: {}
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`/book/infor/${this.id}`)
        this.books = res.data
        if (res.data.remain > 0) {
          this.books.state = '可借阅'
        } else {
          this.books.state = '不可借阅'
        }
      }
    },
    created() {
      this.fetch()
    }

  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .bookinfor {
    border-radius: 20px;
  }

  .book-infors {
    margin-top: 20px;
  }

  .book-img {
    margin-right: 120px;
  }

  .book-infor .el-form-item__content {
    font-size: 20px;
  }

  .book-state {
    color: map-get($colors, 'primary')
  }

  .book-infor .el-form-item__label {
    font-size: 20px;
  }

  .bookmessage {
    width: 550px;
    word-wrap: break-word;
    font-size: 18px;
  }
</style>