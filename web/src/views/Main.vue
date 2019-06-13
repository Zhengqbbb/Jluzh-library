<template>
  <div>
    <div class="nav bg-white  d-flex jc-around pb-s ">
      <div class="nav-items-left d-flex fw-lg fs-md lh-sm ">
        <div class="pt-2 nav-logo">
          <router-link to="/"><img src="../assets/images/logo.png" height="40"></router-link>
        </div>
        <div class="nav-item active px-4 pt-1 ">
          <router-link class="nav-link" to="/">首页</router-link>
        </div>
        <div class="nav-item px-4 pt-1 ">
          <router-link class="nav-link" to="/">本馆概述</router-link>
        </div>
        <div class="nav-item px-4 pt-1 ">
          <router-link class="nav-link" to="/">读者服务</router-link>
        </div>
        <div class="nav-item px-4 pt-1 ">
          <router-link class="nav-link" to="/">馆内图书</router-link>
        </div>
      </div>



      <div class="nav-items-right d-flex fw-md fs-xs lh-sm lt-lg ">
        <div class=" phone-ico mx-3"> <i class="iconfont pt-3">&#xe600;</i>公众号</div>
        <div class="nav-item px-1 pt-2 mx-2">
          <router-link class="nav-link" to="/"> <i class="iconfont">&#xe615;</i>我的图书馆</router-link>
        </div>
        <div class="nav-item px-1 pt-2 mx-2">
          <router-link class="nav-link" to="/"> <i class="iconfont">&#xe63d;</i>馆内搜索</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>

    <footer class="foot">
      jluzh-library &copy; by <div class="admin">Qbenben</div>
    </footer>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @import '../assets/scss/style';

  .foot {
    margin-top: 10px;
    border-top: 1px solid $border-color;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 300;
  }

  .admin {
    display: inline;
    color: map-get($colors, 'primary');
    font-weight: 600;
  }

  .nav {
    .nav-item {
      cursor: pointer;
    }

    .nav-item:hover {
      background-color: #eeeeee;

      a {
        color: map-get($colors, 'primary');
      }

    }
  }

  .phone-ico {
    padding-top: 11px;
    cursor: default;
  }

  .nav-items-right {
    .iconfont {
      color: map-get($colors, 'primary')
    }
    .nav-item {
      .iconfont {
        margin-left: 0;
        margin-right: 2px;
      }
    }
  }
</style>