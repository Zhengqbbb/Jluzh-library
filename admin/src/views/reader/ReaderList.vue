<template>
  <div class="about">
    <div>
      <h1>读者列表</h1>
      

     



    </div>

    <el-table :data="items">

      <el-table-column prop="_id" label="读者编号" width="240"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
     



      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          

          <el-button type="success" size="small" @click="$router.push(`/reader/edit/${scope.row._id}`)"
            icon="el-icon-edit">修改
          </el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="margin-top:7px;">
      <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
    </div>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        items: [],
        
      }
    },
    methods: {
      
      async fetch() {
        const res = await this.$http.get('reader/reader_users')
        this.items = res.data
      },
      async remove(row) {
        this.$confirm(`是否确定删除读者 "${row.username}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //请求接口
          const res = await this.$http.delete(`reader/reader_users/${row._id}`)

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