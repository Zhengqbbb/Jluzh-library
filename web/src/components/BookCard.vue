<template>
  <div class="book  text-center my-3 mx-5 p-2">
    <div class="bookimg "><img class="m0a w-178" :src="img"></div>
    <div class="bookname fs-xs mt-2">{{name}}</div>
    <router-link tag="a" target="_blank" class="button" :to="`/book/infor/${_id}`">查看详情</router-link>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      },
      _id: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/style';

  .button {
    display: block;
    width: 50%;
    margin: 5px auto;
    padding: 15px;
    line-height: 13px;
    background: map-get($colors, 'white');
    border: 1px solid map-get($colors, 'grey');
    border-radius: 20px;
    font-size: 13px;
    transition: all ease-in-out 100ms;
  }

  .button:hover {
    border: 1px solid map-get($colors, 'primary');
    background: map-get($colors, 'primary');
    color: map-get($colors, 'white');
  }

  .book-list {
    .book {
      width: 17%;
      height: 320px;
      border: 1px solid map-get($colors, 'white');
      border-radius: 10%;
      box-shadow: 0 0 8px map-get($colors, 'grey');
      transition: all ease-in-out 400ms;
    }

    .book:hover {
      box-shadow: 0 0 10px map-get($colors, 'primary');
    }
  }

  .bookimg {
    border: 1px solid map-get($colors, 'grey-1');
  }

  .w-178 {
    height: 178px;
    width: 178px;
  }

  .bookimg {
    img {
      display: block;
    }
  }
</style>