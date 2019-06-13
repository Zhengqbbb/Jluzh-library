<template>
  <div>
    <div class="swiper bg-white d-flex jc-center  w-common pt-s">
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide>
          <img class="w-100 h-100" src="../assets/images/topbar.jpg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 h-100" src="../assets/images/1309x410.png" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 h-100" src="../assets/images/topbar1.jpg" alt="">
        </swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination padgination-home px-3 pb-1" slot="pagination"></div>
        <div class="swiper-button-prev swiper_btn swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper_btn swiper-button-white" slot="button-next"></div>
      </swiper>

    </div>
    <!-- end of swiper -->
    <!-- start of nav-icos -->
    <div class="items d-flex w-common bg-white mt-2 ">
      <!--  服务指南 -->
      <div class="nav-icos bd w-1  ">
        <div class="top-nav d-flex px-2">
          <i class="iconfont">&#xe614;</i>
          <div class="guide">服务指南</div>
          <div class="flex-1"></div>
          <div><a href="#">更多 &gt;</a></div>
        </div>
        <div class="nav-items d-if flex-wrap">
          <div class="nav-item jc-center">
            <i class="iconfont">&#xe60d;</i>
            <div class="text">开馆时间</div>
          </div>

          <div class="nav-item jc-center">
            <i class="iconfont">&#xe606;</i>
            <div class="text">借读须知</div>
          </div>
          <div class="nav-item jc-center">
            <i class="iconfont hot">&#xe638;</i>
            <div class="text">热门活动</div>
          </div>
          <div class="nav-item jc-center">
            <i class="iconfont">&#xe610;</i>
            <div class="text">好物推荐</div>
          </div>
          <div class="nav-item jc-center">
            <i class="iconfont ramain">&#xe700;</i>
            <div class="text">借记登记</div>
          </div>
          <div class="nav-item jc-center">
            <i class="iconfont">&#xe61f;</i>
            <div class="text">理赔须知</div>
          </div>
          <div class="nav-item jc-center">
            <i class="iconfont book">&#xe6f9;</i>
            <div class="text">图书业务</div>
          </div>
          <div class="nav-item jc-center">
            <i class="iconfont">&#xe68b;</i>
            <div class="text">馆内布局</div>
          </div>
          <div class="nav-item jc-center">
            <i class="iconfont">&#xe6d8;</i>
            <div class="text">联系我们</div>
          </div>
        </div>

      </div>

      <!-- 新闻通告 -->
      <div class="nav-news bd  w-1 bg-white px-2">
        <div class="top-nav  d-flex">
          <i class="iconfont">&#xe617;</i>
          <div class="guide">新闻公告</div>
          <div class="flex-1"></div>
          <div><a href="#">更多 &gt;</a></div>
        </div>
        <div class="nav-items" v-for="n in 7" :key="n">
          <router-link to="/">
            <div class="d-flex mt-1 lh-xs fs-sm">
              <span class="title">[新闻]</span>
              <span>|</span>
              <span class="flex-1">qbqbqbqqbqb</span>
              <span>12/12</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 书籍推荐 -->
      <div class="nav-books bd w-2 bg-white px-2">
        <div class="top-nav  d-flex">
          <i class="iconfont">&#xe644;</i>
          <div class="guide ">书籍推荐</div>
          <div class="flex-1"></div>
          <div><a href="#">更多 &gt;</a></div>
        </div>
        <div class="swiper-book my-3">
          <swiper :options="swiperOption1">
            <swiper-slide class="w-100 h-100"><img src="../assets/images/178x178.png"></swiper-slide>
            <swiper-slide class="w-100 h-100"><img src="../assets/images/178x178.png"></swiper-slide>
            <swiper-slide class="w-100 h-100"><img src="../assets/images/178x178.png"></swiper-slide>
            <swiper-slide class="w-100 h-100"><img src="../assets/images/178x178.png"></swiper-slide>
            <swiper-slide class="w-100 h-100"><img src="../assets/images/178x178.png"></swiper-slide>
            <swiper-slide class="w-100 h-100"><img src="../assets/images/178x178.png"></swiper-slide>
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
    line-height: 100px;
  }

  .padgination-book {
    .swiper-pagination-bullet {
      opacity: 1;
      background: map-get($colors, 'grey-1');

      &.swiper-pagination-bullet-active {
        background: map-get($colors, 'primary');
      }
    }

    margin-bottom: -25px;
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
      cursor: pointer;

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

    span {
      margin-left: 5px;
      margin-right: 2px;

    }
  }
</style>