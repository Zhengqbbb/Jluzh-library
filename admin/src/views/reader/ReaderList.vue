<template>
  <div class="about">
    <div>
      <h1>读者列表</h1>
    </div>
    <el-table :data="items">
      <el-table-column prop="_id" label="读者编号" width="240"></el-table-column>
      <el-table-column prop="username" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="card" label="身份证"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column fixed="right" width="500">
        <template slot="header" slot-scope="scope">
          <el-input class="search" v-model="search" prefix-icon="el-icon-search" clearable placeholder="输入读者学号搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/reader/lend/${scope.row._id}`)"
            icon="el-icon-notebook-1">借书
          </el-button>
          <el-button type="primary" size="small" @click="$router.push(`/reader/return/${scope.row._id}`)"
            icon="el-icon-collection">还书
          </el-button>
          <el-button type="success" size="small" @click="$router.push(`/reader/edit/${scope.row._id}`)"
            icon="el-icon-edit">修改
          </el-button>
          <el-button type="warning" size="small" @click="$router.push(`/reader/password/${scope.row._id}`)"
            icon="el-icon-lock">修改密码
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
          page_size: 10, //一页显示几条
          layout: "prev, pager, next"
        }
      }
    },
    methods: {
      /**
       * 搜索
       */
      searchItem() {
        const searchItemdata = this.allItems.filter(data => !this.search || data.username.toLowerCase().includes(this
          .search
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
        const res = await this.$http.get('reader/readers')
        this.allItems = res.data
        this.setPaginations()
      },
      async remove(row) {
        this.$confirm(`是否确定删除读者 "${row.username}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //请求接口
          const res = await this.$http.delete(`reader/readers/${row._id}`)
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