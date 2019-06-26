<template>
  <div>
    <div class="server-infor-header d-flex jc-between">
      <div class="iconfont icon-time"></div>
      <div class="server-title fs-lg">开馆时间</div>
      <div class="server-time text-grey fs-sm">更新日期:2019-12-12</div>
    </div>
    <div class="server-infor-body  mt-4">
      <div class="ql-editor" data-gramm="false" contenteditable="true">
        <ul>
          <li><span style="color: rgb(13, 13, 13);">6F</span></li>
        </ul>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">报刊阅览区 ： 星期一至星期五、星期日 08:30 - 22:00</span></p>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">共享空间（自习区） ： 星期一至星期日 07:00-22:30</span></p>
        <ul>
          <li><span style="color: rgb(13, 13, 13);">5F</span></li>
        </ul>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">电子文献阅览区 ： 星期一至星期五、星期日 08:30 - 22:00</span></p>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">特色馆藏区、教师休息区、研讨间、共享空间（自习区） ： 星期一至星期日 07:00 -22:
            30</span></p>
        <ul>
          <li><span style="color: rgb(13, 13, 13);">4F</span></li>
        </ul>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">人文社会科学图书阅览区（I-K类） ： 星期一至星期六 08:30 - 22:00</span>
        </p>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">共享空间（自习区） ： 星期一至星期日 07:00-22:30</span></p>
        <ul>
          <li><span style="color: rgb(13, 13, 13);">3F</span></li>
        </ul>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">人文社会科学图书阅览区（A-H类）： 星期一至星期日 08:00-22:00</span></p>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">共享空间（自习区）： 星期一至星期日 07:00-22:30</span></p>
        <ul>
          <li><span style="color: rgb(13, 13, 13);">2F</span></li>
        </ul>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">西文阅览区 ： 星期一至星期五、星期日 08:00 - 22:00</span></p>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">新书阅览区、理科阅览区（N-Z类）、培训室和党员活动室 ： 星期一至星期五
            08:30-17:00</span></p>
        <ul>
          <li><span style="color: rgb(13, 13, 13);">1F</span></li>
        </ul>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">总借还台 ： 星期一至星期六 09:30-19:30</span></p>
        <p class="ql-indent-1"><span style="color: rgb(13, 13, 13);">自习区 ： 星期一至星期日 07:00-22:30</span></p>
        <p><br></p>
        <p class="ql-align-center"><span style="color: rgb(13, 13, 13);">（节假日放假时间另行通知）</span></p>
        <p class="ql-indent-1"><br></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }

  }
</script>

<style lang="scss">
  @import '../../assets/scss/style';

  .server-infor-header {
    .iconfont {
      color: map-get($colors, 'primary')
    }
  }

  .server-infor-body {
    margin-left: 15%;
  }
</style>