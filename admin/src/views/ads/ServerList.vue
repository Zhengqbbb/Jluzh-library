<template>
  <div class="about">
    <h1>服务列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="服务名"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">{{ scope.row.createdAt | data }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="$router.push(`/server/edit/${scope.row._id}`)"
            icon="el-icon-edit">修改
          </el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        items: []
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get('server/servers')
        this.items = res.data
      },
      async remove(row) {
        this.$confirm(`是否确定删除服务 "${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //请求接口
          const res = await this.$http.delete(`server/servers/${row._id}`)
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