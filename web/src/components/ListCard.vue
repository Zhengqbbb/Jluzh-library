<template>
  <div class="nav-news bd  w-1 bg-white px-2">
    <div class="top-nav  d-flex">
      <i class="iconfont">&#xe624;</i>
      <div class="guide">新闻公告</div>
      <div class="flex-1"></div>
      <div><a href="#">更多 &gt;</a></div>
    </div>
    <div class="nav-items d-if jc-center " v-for="n in 10" :key="n">
      <div>
        <i class="sprite sprite-time"></i>
        <div class="text">开馆时间</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style>

</style>