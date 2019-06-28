<template>
  <div>
    <div class="server-list w-common d-flex bd px-5 pt-5 my-3">
      <div class="server-items ">
        <router-link class="d-flex flex-wrap jc-around server-item px-1 bd m-3 py-2 text-center"
          :to="`/server/infor/${item._id}`" v-for="(item,index) in items" :key="index">
          <div class="iconfont" :class="item.ico"></div>
          <div class="server-name ">{{item.name}}</div>
          <div class="el-icon-arrow-right mt-1"></div>
        </router-link>
      </div>
      <div class="server-infor mx-5 p-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    methods: {
      async fetch() {
        if (!localStorage.servers) {
          const res = await this.$http.get('/server')
          const item = JSON.stringify(res.data)
          /* console.log(item) */
          localStorage.servers = item
        }
        this.items = JSON.parse(localStorage.servers)
      }
    },
    created() {
      this.fetch()
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .server-infor {
    max-width: 70%;
    min-width: 70%;
  }

  .server-list {
    min-height: 750px;
    border-radius: 20px;
    box-shadow: 0 0 10px map-get($colors, 'grey');

    .server-items {
      width: 20%;
      border-right: 1px solid $border-color;
      min-height: 10%;

      .server-item {
        max-width: 100%;
        max-height: 13%;
        border-radius: 10px;
        box-shadow: 0 0 10px map-get($colors, 'grey');
      }

      .server-item:hover {
        box-shadow: 0 0 10px map-get($colors, 'primary');
        color: map-get($colors, 'primary');
      }

      .iconfont {
        margin: 0;
      }
    }
  }
</style>