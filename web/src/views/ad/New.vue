<template>
  <div>
    <qb-list :categories="newnavs">
      <template #items="{category}">
        <div class="new-list b-rl w-common">
          <router-link tag="a" target="_blank" v-for="(news, index) in category.newsList" :key="index"
            :to="`/new/infor/${news._id}`">
            <div class="new-item d-flex mx-4 my-1">
              <div class="new-category mx-2">[{{news.categoryName}}]</div>
              <div class="segmentation mr-2">|</div>
              <div class="new-title flex-1">{{news.name}}</div>
              <div class="new-data mr-2">{{news.createdAt | date}}</div>
            </div>
          </router-link>
        </div>
      </template>
    </qb-list>
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
    data() {
      return {
        newnavs: []
      }
    },
    methods: {
      async fetchNews() {
        const res = await this.$http.get('new/list')
        this.newnavs = res.data
      }
    },
    created() {
      this.fetchNews()
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .new-list {
    min-height: 710px;
  }

  .new-item {
    border-radius: 5px;
    border-bottom: 1px solid map-get($colors, 'grey-1');
  }

  .new-item:hover {
    color: map-get($colors, 'primary');
    background: map-get($colors, 'grey-1')
  }
</style>