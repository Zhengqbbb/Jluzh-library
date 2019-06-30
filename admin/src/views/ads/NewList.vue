<template>
  <div class="about">
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" width="600" label="文章标题"></el-table-column>
      <el-table-column prop="categories[0].name" label="文章分类"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createdAt | data }}</template>
      </el-table-column>
      <el-table-column fixed="right" width="250">
        <template slot="header" slot-scope="scope">
          <el-input class="search" v-model="search" prefix-icon="el-icon-search" clearable placeholder="输入文章名关键词搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="$router.push(`/article/edit/${scope.row._id}`)"
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
  import dayjs from 'dayjs'
  export default {
    filters: {
      data(val) {
        return dayjs(val).format('YYYY/MM/DD HH:mm')
      }
    },
    data() {
      return {
        items: [],
        allItems: [],
        search: '',
        paginations: {
          page_index: 1,
          total: 0,
          page_size: 8, //一页显示几条
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
        this.paginations.page_size = 10;
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
        const res = await this.$http.get('article/articles')
        this.allItems = res.data
        this.setPaginations()
      },
      async remove(row) {
        this.$confirm(`是否确定删除文章 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //请求接口
          const res = await this.$http.delete(`article/articles/${row._id}`)
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