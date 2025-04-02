import {
	request
} from '/utils/request.js'

export const apiGetBanner = async () => {
	return request({
		url: 'homeBanner',
	})

}
export const apiGetDayRandom = async () => {
	return request({
		url: 'randomWall',

	})
}

export const apiGetNotice = async (data) => {
	return request({
		url: 'wallNewsList',
		data
	})
}

export const apiGetClassify = async (data) => {
	return request({
		url: 'classify',
		data
	})
}

export const apiGetWallList = async (data) => {
	return request({
		url: 'wallList',
		data
	})
}

export const apiSetScore = async (data) => {
	return request({
		url: 'setupScore',
		// method: 'post',
		data
	})
}