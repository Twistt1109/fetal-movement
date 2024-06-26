<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="home">
        <button
          :class="{
            'fetal-button': true,
            'pulse-animation': !isButtonDisabled,
          }"
          :disabled="isButtonDisabled"
          @click="recordFetalMovement"
        >
          <span v-if="!isCounting">{{
            isRecording ? "记录中..." : "崽崽动啦!!!"
          }}</span>
          <span v-if="isCounting" class="countdown">{{ countdown }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { storeFetalMovement } from "@/utils/storeFetalMovement";

export default {
  setup() {
    const time = 10; // 倒计时时间

    const isButtonDisabled = ref(false);
    const isRecording = ref(false);
    const isCounting = ref(false);
    let countdownInterval = null; // 用来存储计时器的引用

    // 添加倒计时相关变量
    const countdown = ref(time); // 初始倒计时为10秒

    const recordFetalMovement = async () => {
      isButtonDisabled.value = true;
      isRecording.value = true;

      // 获取当前时间，并按天和小时+分钟格式化
      const now = new Date();
      const dayKey = now.toISOString().split("T")[0];
      const timeKey = `${now.getHours().toString().padStart(2, "0")}${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      // 存储逻辑
      await storeFetalMovement(dayKey, timeKey, 1); // 假设value为次数，每次点击加1

      // 显示成功消息
      uni.showToast({
        title: "记录成功",
        icon: "none",
      });

      isCounting.value = true;
      startCountdown(); // 开始倒计时
    };

    const startCountdown = () => {
      countdownInterval = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--; // 每秒递减
        } else {
          clearInterval(countdownInterval); // 结束计时
          isButtonDisabled.value = false;
          isRecording.value = false;
          isCounting.value = false;
          countdown.value = time; // 重置倒计时
        }
      }, 1000); // 每秒执行一次
    };

    onMounted(() => {
      // 初始化或检查缓存等操作
    });

    return {
      recordFetalMovement,
      isButtonDisabled,
      isRecording,
      isCounting,
      countdown,
    };
  },
};
</script>

<style scoped>
.home {
  background-color: var(--app-theme-color);
}

.app-container {
  /* 确保app-container充满整个屏幕但不滚动 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; /* 假设TabBar高度为50px */
  display: flex;
  flex-direction: column;
  background-color: var(--app-theme-color);
}

.content-wrap {
  /* 内容包裹层，用于flex布局和内容限制 */
  flex: 1;
}

.home {
  /* 保持之前的居中样式 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 充满content-wrap的高度 */
}

.pulse-animation {
  animation: pulse 2s ease-in-out infinite;
}

.fetal-button {
  /* 保持之前样式 */
  width: 500rpx;
  height: 500rpx;
  border-radius: 50%;
  background-color: #FFA07A;
  color: white;
  font-size: 64rpx;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 1s ease-in-out infinite; /* 添加动画属性： 秒数 */
}

/* 名为 pulse 的关键帧动画， 跳动幅度 */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>