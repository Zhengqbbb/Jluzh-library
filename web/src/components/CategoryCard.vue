<template>
  <div>
    <div class="book-navs b-rl w-common d-flex mt-5 px-5 pb-2">
      <div class="book-nav px-2 b-r" v-for="(category,i) in categories" :key="i" :class="{active : active=== i}"
        @click="active = i">
        <div class="nav-link title">{{category.title}}</div>
      </div>
    </div>
    <swiper>
      <swiper-slide v-for="(category,i) in categories" :key="i">
        <slot name="items" :category="category"></slot>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        active: 0,
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
</style>