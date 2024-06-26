<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
::v-deep .uni-tabbar {
    height: 158rpx;
}

/* 提示框 */
.info-box {
  background-color: #f0f8ff; /* 轻淡的蓝色背景 */
  border: 1px solid #b0c4de; /* 边框颜色与背景相称 */
  padding: 15rpx 0; /* 内边距 */
  margin-bottom: 100rpx; /* 与后续元素的间距 */
  width: 100%; /* 占满父元素宽度 */
  text-align: center; /* 文字居中 */
  font-size: 25rpx; /* 文字大小 */
  color: #4682b4; /* 文字颜色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
</style>
