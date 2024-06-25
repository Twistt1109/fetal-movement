export async function storeFetalMovement(dayKey, timeKey, count) {
    try {
        // 获取当前存储的记录或初始化为空对象
        let existingRecords = uni.getStorageSync(dayKey) || {};

        // 更新或添加记录
        existingRecords[timeKey] = (existingRecords[timeKey] || 0) + count;

        // 存储回本地
        uni.setStorageSync(dayKey, existingRecords);

        // 显示成功消息
        uni.showToast({
            title: "记录已保存",
            icon: "success",
        });
    } catch (error) {
        // 处理错误情况
        uni.showToast({
            title: "保存失败，请重试",
            icon: "none",
        });
        throw error; // 如果需要在外部捕获错误，可以抛出异常
    }
}