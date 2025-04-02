export function formatTimeAgo(timestamp) {
	const now = Date.now();
	const diff = now - timestamp; // 毫秒差

	// 处理未来时间或无效值
	if (diff < 0 || isNaN(diff)) return null;

	const seconds = Math.floor(diff / 1000);

	// 1分钟内显示"1分钟"
	if (seconds < 60) return '1分钟';

	const minutes = Math.floor(seconds / 60);
	// 1小时内显示分钟数
	if (minutes < 60) return `${minutes}分钟`;

	const hours = Math.floor(seconds / 3600);
	// 1天内显示小时数
	if (hours < 24) return `${hours}小时`;

	const days = Math.floor(seconds / 86400);
	// 1个月内显示天数（按30天计算）
	if (days < 30) return `${days}天`;

	const months = Math.floor(days / 30);
	// 3个月内显示月数
	if (months < 3) return `${months}个月`;

	// 超过3个月返回null
	return null;
}