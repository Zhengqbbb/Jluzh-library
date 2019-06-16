<template>
  <div>
    <div class="swiper bg-white d-flex jc-center  w-common pt-s">
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="(item,i) in items" :key="i">
          <router-link :to="item.url">
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
          <div><a href="#">更多 &gt;</a></div>
        </div>
        <div class="nav-items d-if flex-wrap">
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont">&#xe60d;</i>
              <div class="text">开馆时间</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont">&#xe606;</i>
              <div class="text">借读须知</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont hot">&#xe638;</i>
              <div class="text">热门活动</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont">&#xe610;</i>
              <div class="text">好物推荐</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont ramain">&#xe700;</i>
              <div class="text">借记登记</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont">&#xe61f;</i>
              <div class="text">理赔须知</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont book">&#xe6f9;</i>
              <div class="text">图书业务</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont">&#xe68b;</i>
              <div class="text">馆内布局</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="nav-item jc-center">
              <i class="iconfont">&#xe6d8;</i>
              <div class="text">联系我们</div>
            </div>
          </router-link>
        </div>

      </div>

      <!-- 新闻通告 -->
      <div class="nav-news bd  w-1 bg-white px-2">
        <div class="top-nav  d-flex flex-wrap">
          <i class="iconfont">&#xe617;</i>
          <div class="guide">新闻公告</div>
          <div class="flex-1"></div>
          <div><a href="#">更多 &gt;</a></div>
        </div>
        <div class="nav-items" v-for="(item,i) in news" :key="i">
          <router-link :to="item.url">
            <div class="d-flex flex-wrap mt-1 lh-xs fs-sm">
              <span class="title">[{{item.category}}]</span>
              <span>|</span>
              <span class="flex-1">{{item.title}}</span>
              <span>{{item.data}}</span>
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
          <div><a href="#">更多 &gt;</a></div>
        </div>
        <div class="swiper-book my-3">
          <swiper :options="swiperOption1">
            <swiper-slide v-for="(item,i) in books" :key="i">
              <router-link class="book-nav-link" :to="item.url">
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
  export default {
    name: 'carrousel',
    data() {
      return {
        items: [],
        news: [{
          category: '新闻',
          title: 'qbqbqbqbqbqb',
          data: '12/12',
          url: '/'
        }, {
          category: '新闻',
          title: 'qbqbqbqbqbqb',
          data: '12/12',
          url: '/'
        }, {
          category: '新闻',
          title: 'qbqbqbqbqbqb',
          data: '12/12',
          url: '/'
        }, {
          category: '新闻',
          title: 'qbqbqbqbqbqb',
          data: '12/12',
          url: '/'
        }, {
          category: '新闻',
          title: 'qbqbqbqbqbqb',
          data: '12/12',
          url: '/'
        }],
        books: [{
            name: '计算机导论',
            img: require('../assets/images/1.png'),
            url: '/'
          },
          {
            name: '计算机导论',
            img: require('../assets/images/1.png'),
            url: '/'
          }
        ],



        swiperOption1: {
          slidesPerView: 3,
          spaceBetween: 30,
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
          loop: true,
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
      }
    },
    created() {
      this.fetchAd()
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/style';

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
    line-height: 40px;
  }

  .padgination-book {
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
      width: 97px;
      margin: 10px;
      margin-top: px;

      .text {
        width: 100%;
        font-size: 14px;
        text-align: center;

      }
    }
  }

  .items {
    a:hover {
      color: map-get($colors, 'primary')
    }
  }


  .nav-icos {
    .nav-item {
      line-height: 30px;
    }

    .nav-item:hover {
      background-color: #eeeeee;
    }
  }

  .top-nav {
    .iconfont {
      margin: 6px auto;
      color: map-get($colors, 'drak-1')
    }
  }

  .nav-items {
    .nav-item {
      border-radius: 10%;
    }

    span {
      margin-left: 5px;
      margin-right: 2px;

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