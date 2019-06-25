<template>
  <div>
    <qb-list :categories="booknavs">
      <template #items="{category}">
        <div class="book-list b-rl  w-common d-flex jc-center flex-wrap ">
          <qb-book v-for="(books, index) in category.bookList" :key="index" :name="books.name" :img="books.img" :_id="books._id">
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
        booknavs: [],
      }
    },
    methods: {
      async fetchBooks(){
        const res = await this.$http.get('book/list')
        this.booknavs = res.data
      }
    },
    created () {
      this.fetchBooks()
    }

  }
</script>

<style>

</style>