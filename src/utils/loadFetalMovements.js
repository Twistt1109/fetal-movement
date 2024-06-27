export function loadFetalMovements() {
    // 初始化结果对象
    let allRecords = [];

    // 遍历所有可能的日期键（这里简化处理，未限制日期范围）
    for (let i = 0; i <= 120; i++) { // 假定查看最近120天的记录
        const dateKey = getDateString(new Date(Date.now() - i * 24 * 60 * 60 * 1000));
        const recordsForDay = uni.getStorageSync(dateKey);
        if (recordsForDay) {
            let recordsArray = Object.entries(recordsForDay);
            // recordsArray = [
            //     ['1003', 1],
            //     ['1011', 1],
            //     ['0958', 2],
            //     ['0959', 2],
            // ];
            recordsArray.sort((a, b) => a[0].localeCompare(b[0]));
            allRecords[dateKey] = recordsArray
        }
    }

    // [
    //     '2024-06-27' = [
    //         ['0958', 2],
    //         ['0959', 2]
    //         ['1003', 1],
    //         ['1011', 1],
    //     ]
    // ]
    return allRecords;
}

// 辅助函数，获取指定日期的字符串格式，例如 "2023-04-01"
function getDateString(date) {
    return date.toISOString().split('T')[0];
}