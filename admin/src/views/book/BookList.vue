<template>
  <div class="about">
    <div>
      <h1>图书列表</h1>
      <!-- style="margin-left:15px;" -->
      <!-- <el-input v-model="search" placeholder="请输入内容"></el-input> -->
      <!-- <el-form label-width="120px" @submit.native.prevent="byNameSearch"> -->
      <!-- <el-form label-width="120px" @submit.native.prevent="byNameSearch('bookname')">
        <el-col :span="5" style="margin=0px;">
          <el-form-item>
            <el-input placeholder="请输入图书名" v-model="bookname" class="input-with-select"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4" class="qb">
          <el-form-item class="qb">
            <el-button type="primary" icon="el-icon-search" native-type="submit" >搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form> -->
    </div>

    <el-table :data="items">

      <el-table-column prop="_id" label="图书编号" width="240"></el-table-column>
      <el-table-column prop="name" label="图书名称" width="180"></el-table-column>
      <el-table-column prop="category.name" label="图书分类" width="150"></el-table-column>
      <el-table-column prop="author" label="作者" width="150"></el-table-column>
      <el-table-column prop="img" label="封面图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height:2rem;">
        </template>
      </el-table-column>
      <el-table-column prop="total" label="图书数量" width="100"></el-table-column>
      <el-table-column prop="remain" label="图书剩余" width="100"></el-table-column>



      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/book/add/${scope.row._id}`)"
            icon="el-icon-delete">入库</el-button>

          <el-button type="success" size="small" @click="$router.push(`/book/edit/${scope.row._id}`)"
            icon="el-icon-edit">修改
          </el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--   <div style="margin-top:7px;">
      <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
    </div> -->


    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        items: [],
        bookname: ''

      }
    },
    methods: {
      

      async byNameSearch(bookname) {
        const res = await this.$http.get(`/search/${this.bookname}`,this.bookname)
        this.items = res.data
      },
      async fetch() {
        const res = await this.$http.get('book/books')
        this.items = res.data
      },
      async remove(row) {
        this.$confirm(`是否确定删除分类 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //请求接口
          const res = await this.$http.delete(`book/books/${row._id}`)

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //重新获取
          this.fetch()
        });
      }
    },
    created() {
      this.fetch()
    }
  }
</script>

<style>
.qb{
  margin: 0px;
  padding: 0px
}
</style>
