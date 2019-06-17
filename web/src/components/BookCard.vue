<template>
      <div class="book  text-center my-3 mx-5 p-2">
        <div class="bookimg"><img :src="img"></div>
        <div class="bookname fs-sm">{{name}}</div>
        <router-link class="button" :to="`/book/infor/${_id}`">查看详情</router-link>
      </div>
</template>

<script>
  export default {
    props: {
      name: {type:String ,required: true},
      img: {type:String ,required: true},
      _id: {type:String ,required: true}
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/style';
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
    transition: all ease-in-out 100ms;
  }

  .button:hover {
    border: 1px solid map-get($colors, 'primary');
    background: map-get($colors, 'primary');
    color: map-get($colors, 'white');
  }

  .book-list {
    .book {
      border: 1px solid map-get($colors, 'white');
      border-radius: 10%;
      box-shadow: 0 0 8px map-get($colors, 'grey');
      transition: all ease-in-out 400ms;
    }

    .book:hover {
      box-shadow: 0 0 10px map-get($colors, 'primary');
    }
  }
</style>