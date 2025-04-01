const SYSTEM_INFO = uni.getSystemInfoSync()
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15
export const getTitleBarHeight = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		const {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect()
		return (top - getStatusBarHeight()) * 2 + height
	} else {
		return 40
	}
}
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()
export const getleftIcon = () => {
	// #ifdef MP-TOUTIAO
	let {
		leftInfo: {
			left,
			width
		}
	} = tt.getMenuButtonBoundingClientRect()
	return left + parseInt(width)
	// #endif
	// #ifndef MP-TOUTIAO
	return 0
	// #endif
}