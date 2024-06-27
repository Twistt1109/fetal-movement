<template>
  <view class="add-record-container">
    <!-- 提示框 -->
    <view class="info-box">
      <text>这里可以录入之前的记录，仅显示120天内的。</text>
    </view>

    <!-- 日期选择器 -->
    <view class="input-section">
      <view class="input-label">日期:</view>
      <picker
        mode="date"
        :value="dateValue"
        fields="year-month-day"
        @change="handleDateChange"
      >
        <view class="picker">{{ dateDisplay }}</view>
      </picker>
    </view>

    <!-- 时间选择器 -->
    <view class="input-section">
      <view class="input-label">时间:</view>
      <picker
        mode="time"
        :value="timeValue"
        fields="hour-minute"
        @change="handleTimeChange"
      >
        <view class="picker">{{ timeDisplay }}</view>
      </picker>
    </view>

    <!-- 滑动条选择次数 -->
    <view class="view-for-slider">
      <view class="input-label">次数:</view>
      <slider
        :value="movementCount"
        min="1"
        max="10"
        @change="handleSliderChange"
        activeColor="#FFC0CB"
        backgroundColor="#E0E0E0"
        class="slider"
      />
      <view class="slider-value">{{ movementCount }}</view>
    </view>

    <!-- 保存按钮 -->
    <view class="save-button-section">
      <button type="primary" @click="saveRecord">保存记录</button>
    </view>
  </view>

  <!-- 作者信息 -->
  <view class="powered-by-section">
    <view class="powered-by-container" @click.stop>
      Powered by
      <view class="twist" @click="twistClicked">Twist</view>
    </view>
  </view>
</template>
<script>
import { ref } from "vue";
import { storeFetalMovement } from "@/utils/storeFetalMovement";

export default {
  setup() {
    const dateValue = ref(new Date().toISOString().slice(0, 10));
    const timeValue = ref(new Date().toTimeString().slice(0, 5));
    const dateDisplay = ref(new Date().toISOString().slice(0, 10));
    const timeDisplay = ref(new Date().toTimeString().slice(0, 5));
    const movementCount = ref(1); // 默认次数为1

    const handleDateChange = (e) => {
      dateValue.value = e.detail.value;
      dateDisplay.value = e.detail.value;
    };

    const handleTimeChange = (e) => {
      timeValue.value = e.detail.value;
      timeDisplay.value = e.detail.value;
    };

    const handleSliderChange = (e) => {
      movementCount.value = e.detail.value;
    };

    const saveRecord = () => {
      const dayKey = dateValue.value;
      const timeKey = timeValue.value.replace(/:/g, "");
      storeFetalMovement(dayKey, timeKey, movementCount.value);
    };

    const twistClicked = () => {
      uni.navigateTo({
        url: "webview",
      });
    };

    return {
      dateValue,
      timeValue,
      dateDisplay,
      timeDisplay,
      movementCount,
      handleDateChange,
      handleTimeChange,
      handleSliderChange,
      saveRecord,
      twistClicked,
    };
  },
};
</script>

<style scoped>
.add-record-container {
  padding: 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 垂直居中 */
  max-height: 100vh; /* 最大高度等于视口高度 */
  overflow: hidden; /* 隐藏溢出的内容，防止滚动 */
}

.input-section {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  flex-wrap: wrap; /* 允许在小屏幕下换行 */
}

.input-label {
  font-size: 30rpx;
  color: #696969;
  width: 120rpx;
  margin-right: 10rpx;
}

.picker {
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 10rpx;
  border: 1px solid #ccc;
  padding: 0 20rpx;
  flex-grow: 1; /* 让 picker 占据剩余空间 */
  width: 200rpx;
}

.view-for-slider {
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.slider-value {
  margin-left: 20rpx;
  font-size: 30rpx;
  color: #696969;
  margin-top: 20rpx;
}

.save-button-section {
  margin-top: 200rpx;
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
}

.powered-by-container {
  margin-top: 220rpx; /* 根据需要调整间距 */
  display: flex; /* 使用Flex布局来确保元素在同一行显示 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  cursor: pointer; /* 当鼠标悬停时显示手形光标 */
  font-size: 24rpx; /* 调整字体大小 */
  color: #999; /* 调整字体颜色 */
}

.twist {
  margin-left: 4px; /* 添加一些左边距以分隔文本 */
  color: blue; /* 你可以自定义颜色 */
  text-decoration: underline; /* 添加下划线以表示可点击 */
}

/* 对于小于600rpx的屏幕 */
@media screen and (max-width: 600rpx) {
  .input-section {
    flex-direction: column;
  }

  .picker {
    margin-top: 10rpx;
  }

  .slider {
    width: 100%; /* 在小屏幕上占据全部宽度 */
  }

  .slider-value {
    margin-top: 10rpx;
  }
}
</style>