<template>
  <div class="home">
    <div class="swiper bg-white d-flex jc-center  w-common pt-s">
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="(item,i) in items" :key="i">
          <router-link tag="a" target="_blank" :to="item.url">
            <img class="w-100 h-100" :src="item.img" alt="">
          </router-link>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination padgination-home px-3 pb-1" slot="pagination"></div>
        <div class="swiper-button-prev swiper_btn swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper_btn swiper-button-white" slot="button-next"></div>
      </swiper>

    </div>
    <!-- end of swiper -->
    <!-- start of nav-icos -->
    <div class="items d-flex  w-common bg-white mt-2 ">
      <!--  服务指南 -->
      <div class="nav-icos bd w-1  ">
        <div class="top-nav d-flex flex-wrap px-2">
          <i class="iconfont">&#xe614;</i>
          <div class="guide">服务指南</div>
          <div class="flex-1"></div>
          <div>
            <router-link to="server">更多 &gt;</router-link>
          </div>
        </div>
        <div class="nav-items my-4 mx-3 d-flex flex-wrap jc-around">
          <div class="server-items" v-for="(server , index) in servers" :key="index">
            <router-link class="server-item mx-2 mb-3 p-1" :to="`/server/infor/${server._id}`">
              <div class="iconfont" :class="server.ico"></div>
              <div class="server-title fs-sm">{{server.name}}</div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- 新闻通告 -->
      <div class="nav-news bd  w-1 bg-white px-2">
        <div class="top-nav  d-flex flex-wrap">
          <i class="iconfont">&#xe617;</i>
          <div class="guide">新闻公告</div>
          <div class="flex-1"></div>
          <div>
            <router-link to="/new">更多 &gt;</router-link>
          </div>
        </div>
        <div class="nav-items" v-for="(item,i) in news" :key="i">
          <router-link tag="a" target="_blank" :to="`/new/infor/${item._id}`">
            <div class="d-flex flex-wrap mt-1 lh-xs fs-sm">
              <span class="">[{{item.categories[0].name}}]</span>
              <span>|</span>
              <div class="title flex-1">{{item.name}}</div>
              <span>{{item.createdAt | date}}</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 书籍推荐 -->
      <div class="nav-books bd w-2 bg-white px-2">
        <div class="top-nav  d-flex flex-wrap">
          <i class="iconfont">&#xe644;</i>
          <div class="guide ">书籍推荐</div>
          <div class="flex-1"></div>
          <div>
            <router-link to="/book">更多 &gt;</router-link>
          </div>
        </div>
        <div class="swiper-book my-3">
          <swiper class="swiper-books" :options="swiperOption1">
            <swiper-slide class="mt-3" v-for="(item,i) in books" :key="i">
              <router-link tag="a" target="_blank" class="book-nav-link" :to="`/book/infor/${item._id}`">
                <div><img class="w-100 d-block m0a" :src="item.img"></div>
                <div class="book-name fs-xs text-grey text-center">{{item.name}}</div>
              </router-link>
            </swiper-slide>
            <div class="swiper-pagination padgination-book px-3 pb-1" slot="pagination"></div>
          </swiper>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
  import dayjs from 'dayjs'
  export default {
    filters: {
      date(val) {
        return dayjs(val).format('MM/DD')
      }
    },
    name: 'carrousel',
    data() {
      return {
        items: [],
        news: [],
        books: [],
        servers:[],

        swiperOption1: {
          slidesPerView: 3,
          spaceBetween: 30,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper 
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper 
          observeParents: true, //修改swiper的父元素时，自动初始化swiper 
          autoplay: {
            delay: 4000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
      }
    },
    methods: {
      async fetchAd() {
        const res = await this.$http.get('home/ad')
        this.items = res.data.items
      },
      async fetchbooks() {
        const res = await this.$http.get('home/book')
        this.books = res.data
      },
      async fetchnews() {
        const res = await this.$http.get('home/new')
        this.news = res.data
      },
      async fetchservers() {
        const res = await this.$http.get('home/server')
        this.servers = res.data
      }
    },
    created() {
      this.fetchbooks()
      this.fetchnews()
      this.fetchservers()
      this.fetchAd()
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/style';
.home {
  min-height: 770px;
}

.padgination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    background: map-get($colors, 'white');

    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'primary');
    }
  }
}

.swiper-book {
  line-height: 25px;
}

.padgination-book {
  position: relative;
  top: 83%;

  .swiper-pagination-bullet {
    opacity: 1;
    background: map-get($colors, 'grey-1');

    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'primary');
    }
  }
}

.content {
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  margin-left: -1px;
  margin-right: -1px;
}


.nav-icos {

  .nav-item {
    width: 95px;
    margin: 5px;

    .text {
      width: 100%;
      font-size: 14px;
      text-align: center;
    }
  }
}

.items {
  height: 350px;

  a:hover {
    color: map-get($colors, 'primary')
  }
  .server-items{
    .server-item{
      display: block;
      text-align: center;
      border-radius: 10%;
    }
  }
  .server-item:hover {
    background-color: map-get($colors, 'grey-1');
  }
  .iconfont{
    &.icon-time,&.icon-ditu,&.icon-fuwu {
      color: map-get($colors, 'primary')
    }
    
  }

}

.top-nav {
  .iconfont {
    margin: 6px auto;
    color: map-get($colors, 'drak-1')
  }
}

.nav-items {
  .title {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.swiper-book {
  swiper-slide:hover {
    background-color: map-get($colors, 'grey')
  }
}

.book-nav-link:hover {
  .book-name {
    color: map-get($colors, 'primary')
  }
}

</style>