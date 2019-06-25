<template>
  <div>
    <div class="new-infor mt-5 w-common bd" v-if="item">
      <div class="header d-flex jc-between mt-4 my-3 mx-3">
        <div class="iconfont fs-lg">
          <router-link to="/new"><i class="el-icon-arrow-left text-primary"></i></router-link>
        </div>
        <div class="title fs-xl lh-sm">{{item.name}}</div>
        <div class="date fs-sm text-grey">{{item.createdAt | date}}</div>
      </div>
      <div class="contents mb-4">
        <div class="content-body w-50 p-3" v-html="item.body"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    filters: {
      date(val) {
        return dayjs(val).format('YYYY-MM-DD')
      }
    },
    props: {
      id: {}
    },
    data() {
      return {
        item: {}
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`/new/infor/${this.id}`)
        this.item = res.data
      }
    },
    created() {
      this.fetch()
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .new-infor {

    min-height: 720px;
    border-radius: 20px;

    .title {
      border-bottom: 1px solid $border-color;
    }

  }
</style>