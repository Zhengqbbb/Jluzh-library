<template>
  <div class="about">
    <h1> {{id? '修改' : '新建'}}图书分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类名称">
        <el-col :span="4"><el-input v-model="model.name" input-width="240px" clearable></el-input></el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default{
  props: {
    id: {}
    },
  data(){
    return{
      model: {}
    }
  }, 
  methods: {
   async save(){
     let res
     if(this.id){
       res = this.$http.put(`book/categories/${this.id}`,this.model)
     }else{
       res = this.$http.post('book/categories',this.model)
     }
      
      this.$router.push('/book/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`book/categories/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>

