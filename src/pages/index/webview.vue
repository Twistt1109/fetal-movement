<template>
  <view>
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      url: "",
    };
  },
  onLoad(item) {
    this.url = "https://www.kejipp.cn";
    // 传入需要跳转的链接 使用web-view标签进行跳转
  },
  methods: {},
  created() {},
};
</script>
<style lang="less" scoped>
</style>
