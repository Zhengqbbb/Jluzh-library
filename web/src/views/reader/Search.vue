<template>
  <div>
    <!--  馆内搜索 -->
    <div class="search-card pt-5 px-4 bd text-center">
      <div class="search-input">
        <el-col :span="10">
          <el-input class="search" v-model="search" prefix-icon="el-icon-search" clearable placeholder="输入图书名关键词搜索" />
        </el-col>
      </div>
      <div class="search-table">
        <el-table :data="items">
          <el-table-column prop="_id" label="图书编号" width="240"></el-table-column>
          <el-table-column prop="name" label="书名"></el-table-column>
          <el-table-column prop="category.name" label="图书分类" width="200"></el-table-column>
          <el-table-column prop="author" label="作者" width="200"></el-table-column>
          <el-table-column prop="img" label="封面" width="200">
            <template slot-scope="scope">
              <img :src="scope.row.img" style="height:2.8rem;">
            </template>
          </el-table-column>
            <el-table-column fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="$router.push(`/book/infor/${scope.row._id}`)"
                icon="el-icon-search">查看</el-button>
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
    </div>
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
        const res = await this.$http.get('/search')
        this.allItems = res.data
        this.setPaginations()
      },
    },
    created() {
      this.fetch()
    },
    watch: {
      search: function (new_v) {
        if (new_v != '') {
          this.searchItem()
        } else {
          this.fetch()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .search-card {
    margin: 13px auto;
    width: 75%;
    min-height: 780px;
    border-radius: 20px;
    box-shadow: 0 0 10px map-get($colors, 'grey');
    position: relative;
    overflow: hidden;
    z-index: 4;

    .pagination-list {
      margin-top: 1rem;
      text-align: center;
    }
  }
</style>