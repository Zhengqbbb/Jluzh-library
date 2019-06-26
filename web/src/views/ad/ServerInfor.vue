<template>
  <div>
    <div class="server-infor-header d-flex jc-between">
      <div class="fs-xl iconfont" :class="model.ico"></div>
      <div class="server-title fs-xl">{{model.name}}</div>
      <div class="server-time text-grey fs-sm">更新日期:{{model.createdAt | date}}</div>
    </div>
    <div class="server-infor-body  mt-4" v-html="model.body"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
  export default {
    filters: {
      date(val){
        return dayjs(val).format('YYYY-MM-DD')
      }
    },
    props: {
      id: {}
    },
    data() {
      return {
        model:{}
      }
    },
    methods: {
      async fetchServerinfor(){
        const res = await this.$http.get(`/server/infor/${this.id}`)
        this.model = res.data
      }
    },
    created () {
      this.fetchServerinfor()
    }

  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .server-infor-header {
    .iconfont {
      color: map-get($colors, 'primary')
      
    }
  }

  .server-infor-body {
    max-width: 80%;
    min-width: 80%;
    margin-left: 15%;
  }
</style>