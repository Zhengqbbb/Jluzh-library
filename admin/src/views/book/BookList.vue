<template>
  <div class="about">
    <div>
      <h1>图书列表</h1>
    </div>
    <el-table :data="items">
      <el-table-column prop="_id" label="图书编号" width="240"></el-table-column>
      <el-table-column prop="name" label="图书名称" width="300"></el-table-column>
      <el-table-column prop="category.name" label="图书分类" width="150"></el-table-column>
      <el-table-column prop="author" label="作者" width="150"></el-table-column>
      <el-table-column prop="img" label="封面图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="height:2.8rem;">
        </template>
      </el-table-column>
      <el-table-column prop="total" label="图书数量" width="100"></el-table-column>
      <el-table-column prop="remain" label="图书剩余" width="100"></el-table-column>
      <el-table-column fixed="right" width="300">
        <template slot="header" slot-scope="scope">
          <el-input class="search" v-model="search" prefix-icon="el-icon-search" clearable placeholder="输入图书名关键词搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/book/add/${scope.row._id}`)"
            icon="el-icon-circle-plus">入库</el-button>
          <el-button type="success" size="small" @click="$router.push(`/book/edit/${scope.row._id}`)"
            icon="el-icon-edit">修改
          </el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :span="24">
      <div class="pagination-list">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="paginations.page_index"
          :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [],
        allItems: [],
        search: '',
        paginations: {
          page_index: 1,
          total: 0,
          page_size: 7, //一页显示几条
          layout: "prev, pager, next"
        }
      }
    },
    methods: {
      /**
       * 搜索
       */
      searchItem() {
        const searchItemdata = this.allItems.filter(data => !this.search || data.name.toLowerCase().includes(this.search
          .toLowerCase()))
        this.allItems = searchItemdata
        this.setPaginations()
      },
      /**
       * 初始化页码
       */
      setPaginations() {
        this.paginations.total = this.allItems.length;
        this.paginations.page_index = 1;
        this.paginations.page_size = 7;
        this.items = this.allItems.filter((tableitems, index) => {
          return index < this.paginations.page_size
        });
      },
      /**
       * 点击页码跳转
       */
      handleCurrentChange(page) {
        let index = this.paginations.page_size * (page - 1);
        let items_num = this.paginations.page_size * page;
        let tables = []
        for (let i = index; i < items_num; i++) {
          if (this.allItems[i]) {
            tables.push(this.allItems[i]);
          }
          this.items = tables;
        }
      },
      async fetch() {
        const res = await this.$http.get('book/books')
        this.allItems = res.data
        this.setPaginations()
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
    },
    watch: {
      search: function (new_v, old_v) {
        if (new_v != '') {
          this.searchItem()
        } else {
          this.fetch()
        }
      }
    }
  }
</script>

<style>
  .el-icon-search {
    margin-left: 6px;
  }

  .pagination-list {
    margin-top: 1rem;
    text-align: center;
  }
</style>