export async function removeFetalMovement(dayKey, timeKey, count) {
    try {
        // 获取当前存储的记录或初始化为空对象
        let dayRecords = uni.getStorageSync(dayKey) || {};

        if (timeKey == null) {
            uni.removeStorageSync(dayKey);
            
        } else {
            // 假设缓存中的时间键格式为"HHMM"，这里将"H:M"转换为"HHMM"
            timeKey = timeKey.replace(':', '')
            console.log('2timeKey=',timeKey);

            // 对象转数组
            let recordsArray = Object.entries(dayRecords);


            let keysArray = [];
            for (const key in recordsArray) {
                keysArray.push(recordsArray[key][0]);
            }

            // 对keys进行排序
            keysArray.sort((a, b) => a.localeCompare(b));
            
            let num = 0;
            // 删除keysArray中 >timeKey的元素, 删除数量为count
            for (const key of keysArray) {
                if (key >= timeKey && num < count) {
                    console.log('删除',key);
                    delete dayRecords[key]
                    num++;
                }
            }

            // // 存储回本地
            uni.setStorageSync(dayKey, dayRecords);
        }

        // 显示成功消息
        uni.showToast({
            title: "记录已删除",
            icon: "success",
        });
    } catch (error) {
        // 处理错误情况
        uni.showToast({
            title: "已删除失败，请重试",
            icon: "none",
        });
        throw error; // 如果需要在外部捕获错误，可以抛出异常
    }
}