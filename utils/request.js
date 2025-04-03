const accessKey = '474441' // 'yuhuiwallpaper@'
const BASE_URL = 'https://tea.qingnian8.com/api/bizhi/'

export function request(option = {}) {
	const {
		url,
		header = {},
		...other
	} = option
	header["access-key"] = accessKey
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			...other,
			header,
			success: res => {
				if (res.data.errCode === 0) {
					resolve(res.data)
				} else if (res.data.errCode === 400) {
					uni.showModal({
						title: "错误提示",
						content: res.data.errMsg,
						showCancel: false
					})
					reject(res.data)
				} else {
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					reject(res.data)
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})

}