<template>
  <div>
    <div class="nav bg-white  d-flex jc-around pb-s mb-1">
      <div class="nav-items-left d-flex fw-lg fs-md lh-sm flex-wrap">
        <div class="pt-2 nav-logo">
          <router-link to="/"><img src="../assets/images/logo.png" height="40"></router-link>
        </div>
        <div class="d-flex nav-items-left" v-for="(nav,i) in navs" :key="i">
          <div class="nav-item px-4 pt-1 " :class="{active : active === i}" >
            <router-link class="nav-link " @click="active = i" :to="nav.path">{{nav.title}}</router-link>
          </div>
        </div>
      </div>

      <div class="nav-items-right d-flex fw-md fs-xs lh-sm lt-lg flex-wrap">
        <div class=" phone-ico mx-3" @mouseenter="enter" @mouseleave="leave"> <i class="iconfont pt-3">&#xe600;</i>公众号
          <div class="wechat-img p-fix p-0 " v-show="seen">
            <div class="bg-grey-1 w-wechat">
              <img class="m-2 w-wechat-1" src="../assets/images/phoneico.jpg">
            </div>
          </div>
        </div>
        <div class="nav-item px-1 pt-2 mx-2">
          <router-link class="nav-link" to="/reader/5d15bc2bfff70539384b7327"> <i class="iconfont">&#xe615;</i>我的图书馆</router-link>
        </div>
        <div class="nav-item px-1 pt-2 mx-2">
          <router-link class="nav-link" to="/login"> <i class="iconfont">&#xe63d;</i>馆内搜索</router-link>
        </div>
      </div>
    </div>

    <router-view :key="$route.path"></router-view>

    <footer class="foot bg-white pt-1 ">
      jluzh-library &copy; by <div class="admin">Qbenben</div>
      <a target="_blank" href="https://github.com/Zhengqbbb/jluzh-library"><div class="iconfont icon-github"></div></a>
    </footer>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        navs: [{
            title: '首页',
            path: '/'
          },
          {
            title: '读者服务',
            path: '/server'
          },
          {
            title: '新闻资讯',
            path: '/new'
          },
          {
            title: '馆内图书',
            path: '/book'
          },
        ],
        active: 0,
        seen: false
      }
    },
    methods: {
      enter() {
        this.seen = true;
      },
      leave() {
        this.seen = false;
      },
      setActive() {
        if (this.$route.name == "home") {
          this.active=0;
        } else if (this.$route.name == "book") {
          this.active=3;
        }else if (this.$route.name == "bookinfor") {
          this.active=3;
        }else if (this.$route.name == "new") {
          this.active=2;
        }else if (this.$route.name == "newinfor") {
          this.active=2;
        }else if (this.$route.name == "server") {
          this.active=1;
        }else if (this.$route.name == "serverinfor") {
          this.active=1;
        }
      }

    },
    watch: {
      '$route': 'setActive'
    },
    created() {
      this.setActive()
    }

  }
</script>

<style lang="scss">
  @import '../assets/scss/style';


</style>