<template>
  <div class="record-page">
    <!-- 提示框 -->
    <view class="info-box">
      <text class="tips">记录存在本地，切勿清理app缓存!!!否则数据丢失。</text>
    </view>

    <ul class="day-list">
      <li
        v-for="(dayRecords, day) in groupedRecords"
        :key="day"
        class="day-item"
      >
        <h2 class="day-title">{{ day }}</h2>
        <ul class="hourly-list">
          <li
            v-for="(hourlyData, hourMinute) in dayRecords"
            :key="hourMinute"
            class="hourly-item"
          >
            <span class="time-label">{{ hourMinute }}: 起1小时内</span>
            <span class="count-value">{{ hourlyData.count }} 次</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
    
  <script>
import { computed } from "vue";
import { loadFetalMovements } from "@/utils/loadFetalMovements";

export default {
  data() {
    return {
      groupedRecords: {},
    };
  },

  methods: {
    getData() {
      const allRecords = loadFetalMovements();
      const result = {};

      for (const day in allRecords) {
        let previousTime = null; // 用来存储上一个时间记录

        result[day] = Object.entries(allRecords[day]).reduce(
          (acc, [timeKey, count]) => {
            const hour = parseInt(timeKey.substring(0, 2), 10); // 取前两位作为小时
            const minute = parseInt(timeKey.substring(2), 10); // 取后两位作为分钟

            // const hour = timeKey.substring(0, 2).padStart(2, '0');
            // const minute = timeKey.substring(2).padStart(2, '0');

            const currentTime = new Date(); // 创建当前时间对象
            currentTime.setHours(hour, minute, 0, 0); // 设置时间为指定的小时和分钟

            // 计算与上一个时间的差值（以分钟为单位）
            const timeDifference = previousTime
              ? Math.abs((currentTime - previousTime) / (1000 * 60)) // 时间差转换为分钟
              : null;

            // 如果是第一个时间记录，或者时间差在60分钟内
            if (
              !previousTime ||
              (timeDifference !== null && timeDifference <= 60)
            ) {
              if (!previousTime) {
                previousTime = currentTime; // 更新previousTime
              }

              // 获取上一个时间分组
              const oldGroup = `${previousTime.getHours()}:${previousTime.getMinutes()}`;

              if (!acc[oldGroup]) acc[oldGroup] = { count: 0 };
              acc[oldGroup].count += count;
            } else {
              // 否则，开始一个新的hourGroup
              const hourGroup = `${hour}:${minute}`;
              previousTime = currentTime;
              acc[hourGroup] = { count: count };
            }
            return acc;
          },
          {}
        );
      }
      console.log("----------result------------");
      console.log(result);

      this.groupedRecords = result;
    },

    // 将方法直接定义在 methods 对象中
    formatTime(hourMinute) {
      //   const [hour, minute] = hourMinute.split("").map(Number);
      const hour = parseInt(hourMinute.substring(0, 2), 10); // 取前两位作为小时
      const minute = parseInt(hourMinute.substring(2), 10); // 取后两位作为分钟
      return `${hour}:${minute < 10 ? "0" : ""}${minute}`;
    },
  },

  onShow() {
    this.getData();
  },
};
</script>
    
<style scoped>
.record-page {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 5px;
}

.tips {
  color: red;
}

.day-list {
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.day-item {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
}

.day-title {
  color: #343a40;
  font-size: 24px;
  margin-bottom: 15px;
}

.hourly-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.hourly-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6c757d;
  font-size: 16px;
}

.time-label {
  text-align: left;
  width: 200px;
}

.count-value {
  font-weight: bold;
  color: #007bff;
}
</style>