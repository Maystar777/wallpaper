const SYSTEM_INFO = uni.getSystemInfoSync()

// 状态栏高度
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15

// 标题栏高度
export const getTitleBarHeight = () => {
	// 获取右侧小程序自带菜单按钮的定位数据
	if (uni.getMenuButtonBoundingClientRect) {
		const {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect()
		return (top - getStatusBarHeight()) * 2 + height //按钮的上margin*2+高度
	} else { //H5获取不到，直接返回
		return 40
	}
}

// navBar总高度 = 状态栏高度 + 标题栏高度
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()

// 头条小程序左上角有一个菜单按钮，为了避免挡住标题，需计算一下宽度作为标题的margin-left
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