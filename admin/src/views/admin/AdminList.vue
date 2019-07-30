<template>
  <div class="about">
    <div>
      <h1>管理员列表</h1>
    </div>
    <el-table :data="items.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column prop="_id" label="管理员编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
    </el-table>
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
        const res = await this.$http.get('admin/admin_users')
        this.items = res.data
      },
      async remove(row) {
        this.$confirm(`是否确定删除"${row.username}"管理员吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //请求接口
          const res = await this.$http.delete(`admin/admin_users/${row._id}`)

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