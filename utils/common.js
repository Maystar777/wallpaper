export function formatTimeAgo(timestamp) {
	const now = Date.now();
	const diff = now - timestamp; // 毫秒差

	// 处理未来时间或无效值
	if (diff < 0 || isNaN(diff)) return null;
	// 1分钟内显示"1分钟"
	const seconds = Math.floor(diff / 1000);
	if (seconds < 60) return '1分钟';
	// 1小时内显示分钟数
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}分钟`;
	// 1天内显示小时数
	const hours = Math.floor(seconds / 3600);
	if (hours < 24) return `${hours}小时`;
	// 1个月内显示天数（按30天计算）
	const days = Math.floor(seconds / 86400);
	if (days < 30) return `${days}天`;
	// 3个月内显示月数
	const months = Math.floor(days / 30);
	if (months < 3) return `${months}个月`;
	// 超过3个月返回null
	return null;
}

export function goHome() {
	uni.showModal({
		title: '提示',
		content: '页面有误将返回首页',
		showCancel: false,
		success: (res) => {
			if (res.confirm) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	})
}