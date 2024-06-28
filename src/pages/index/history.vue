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
            <i
              class="delete-icon"
              @click="confirmDelete(day, hourMinute, hourlyData.count)"
            >
              X
            </i>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { loadFetalMovements } from "@/utils/loadFetalMovements";
import { removeFetalMovement } from "@/utils/removeFetalMovement";

function parseTime(timeKey) {
  // const hour = parseInt(timeKey.substring(0, 2), 10); // 取前两位作为小时
  // const minute = parseInt(timeKey.substring(2), 10); // 取后两位作为分钟

  // 以字符串形式处理可以保留前导零
  const hour = timeKey.substring(0, 2).padStart(2, "0");
  const minute = timeKey.substring(2).padStart(2, "0");
  return { hour, minute };
}

export default {
  data() {
    return {
      groupedRecords: {},
    };
  },

  methods: {
    getData() {
      // allRecords = [
      //     '2024-06-27' = [
      //         ['0958', 2],
      //         ['0959', 2]
      //         ['1003', 1],
      //         ['1011', 1],
      //     ]
      // ]
      const allRecords = loadFetalMovements();
      const result = {};

      for (const day in allRecords) {
        let previousTime = null; // 用来存储上一个时间记录

        result[day] = allRecords[day].reduce((acc, [timeKey, count]) => {
          const { hour, minute } = parseTime(timeKey);

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

            // 获取上一个时间分组, 保留前导零
            const oldGroup = `${previousTime
              .getHours()
              .toString()
              .padStart(2, "0")}:${previousTime
              .getMinutes()
              .toString()
              .padStart(2, "0")}`;

            if (!acc[oldGroup]) acc[oldGroup] = { count: 0 };
            acc[oldGroup].count += count;
          } else {
            // 否则，开始一个新的hourGroup
            const hourGroup = `${hour}:${minute}`;
            previousTime = currentTime;
            acc[hourGroup] = { count: count };
          }
          return acc;
        }, {});
      }

      this.groupedRecords = result;
    },

    confirmDelete(day, hourMinute, count) {
      // 弹出确认框询问是否删除
      uni.showModal({
        title: "确认删除",
        content: "要删除 " + day + " " + hourMinute + " 记录吗？",
        success: (res) => {
          if (res.confirm) {
            // 用户点击了确认，执行删除操作
            this.deleteRecord(day, hourMinute, count);
          } else if (res.cancel) {
            // 用户点击了取消，不做任何操作
            console.log("用户取消了删除操作");
          }
        },
      });
    },

    deleteRecord(day, hourMinute, count) {
      // 删除指定日期的指定时间段的记录
      if (this.groupedRecords[day] && this.groupedRecords[day][hourMinute]) {
        delete this.groupedRecords[day][hourMinute];
        removeFetalMovement(day, hourMinute, count);
        // 如果某天的记录为空对象，则删除该天对象
        if (Object.keys(this.groupedRecords[day]).length === 0) {
          delete this.groupedRecords[day];
          removeFetalMovement(day, null, 0);
        }
      } else {
        console.log("没找到记录");
      }
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
  background-color: var(--app-theme-color);
  padding: 20px;
  border-radius: 5px;
  min-height: 100vh;
  /* 设置最小高度为视口高度，确保背景色覆盖整个视口 */
  overflow-y: auto;
  /* 允许内容超过容器时出现垂直滚动条 */
}

.tips {
  color: red;
}

.day-list {
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.day-item {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 15px;
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
  margin-bottom: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6c757d;
  font-size: 16px;
}

.time-label {
  text-align: left;
  width: 160px;
}

.count-value {
  font-weight: bold;
  color: #007bff;
}

.delete-icon {
  cursor: pointer;
  /* 在这里添加您想要的图标样式，例如使用背景图像、字体图标等 */
}
</style>