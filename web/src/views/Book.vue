<template>
  <div>
    <div class="book-navs b-rl w-common d-flex mt-5 px-5 pb-2">
      <div class="book-nav px-2 b-r" v-for="(nav,i) in booknavs" :key="i" :class="{active : active=== i}"
        @click="active = i">
        <router-link class="title" :to="nav.path">{{nav.title}}</router-link>
      </div>
    </div>
    <div class="book-list b-rl w-common d-flex jc-center flex-wrap ">
      <div class="book  text-center my-3 mx-5 p-2" v-for="(book, index) in books" :key="index">
        <div class="bookimg"><img :src="book.img"></div>
        <div class="bookname fs-sm">{{book.name}}</div>
        <router-link class="button" :to="book.url">查看详情</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0,
        booknavs: [{
            title: '所有',
            path: '/book'
          },
          {
            title: '计算机',
            path: '/book'
          },
          {
            title: '美术',
            path: '/book'
          },
          {
            title: '金融',
            path: '/book'
          },
        ],
        books: [{
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          }, {
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          }, {
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          }, {
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          }, {
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          }, {
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          }, {
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          },
          {
            name: '软件工程导论',
            img: require('../assets/images/178x178.png'),
            url: '/',
          },
        ]
      }
    }

  }
</script>

<style lang="scss">
  @import '../assets/scss/style';

  .book-navs {
    border-bottom: 1px solid map-get($colors, 'grey-1');

    .title:hover {
      color: map-get($colors, 'primary');
    }

    .active {
      border-bottom: 4px solid map-get($colors, 'primary');
    }
  }

  .book-nav:hover {
    background: map-get($colors, 'grey-1');

  }

  .button {
    /*  cursor: pointer; */
    display: block;
    width: 50%;
    margin: 5px auto;
    padding: 15px;
    line-height: 15px;
    background: map-get($colors, 'white');
    border: 1px solid map-get($colors, 'grey');
    border-radius: 80%;
    font-size: 12px;
  }

  .button:hover {
    border: 1px solid map-get($colors, 'primary');
    background: map-get($colors, 'primary');
    color: map-get($colors, 'white');
  }

  .book {


    border: 1px solid map-get($colors, 'white');
    border-radius: 10%;
    box-shadow: 0 0 8px map-get($colors, 'grey');
  }

  .book:hover {
    box-shadow: 0 0 8px map-get($colors, 'primary');
  }
</style>