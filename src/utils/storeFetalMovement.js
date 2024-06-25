export function storeFetalMovement(dayKey, timeKey, count) {
    // 获取当前存储的记录或初始化为空对象
    const existingRecords = uni.getStorageSync(dayKey) || {};

    // 更新或添加记录
    existingRecords[timeKey] = (existingRecords[timeKey] || 0) + count;

    // 存储回本地
    uni.setStorageSync(dayKey, existingRecords);

    
}