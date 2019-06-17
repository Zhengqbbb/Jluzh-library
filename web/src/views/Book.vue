<template>
  <div>
    <qb-list :categories="booknavs">
      <template #items="{category}">
        <div class="book-list b-rl  w-common d-flex jc-center flex-wrap ">
          <qb-book v-for="(books, index) in category.booklist" :key="index" :name="books.name" :img="books.img" :_id="books._id">
          </qb-book>
        </div>
      </template>
    </qb-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        booknavs: [{
          title: "所有",
          _id: '123',
          booklist: [{
            categoryName: "计算机",
            _id: "123456",
            name: "计算机导论",
            img: require('../assets/images/178x178.png'),
          }, {
            categoryName: "美术",
            _id: "123456",
            name: "美术导论",
            img: require('../assets/images/178x178.png'),
          }]
        }, {
          title: "计算机",
          _id: '123',
          booklist: [{
            categoryName: "计算机",
            _id: "123456",
            name: "计算机导论",
            img: require('../assets/images/178x178.png'),
          }]
        }, {
          title: "美术",
          _id: '123',
          booklist: [{
            categoryName: "美术",
            _id: "123456",
            name: "美术导论",
            img: require('../assets/images/178x178.png'),
          }]
        }],
       
      }
    }

  }
</script>

<style>

</style>