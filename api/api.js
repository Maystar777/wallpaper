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
		data
	})
}

export const apiWriteDownload = async (data) => {
	return request({
		url: 'downloadWall',
		data
	})
}

export const apiDetailWall = async (data) => {
	return request({
		url: 'detailWall',
		data
	})
}

export const apiUserInfo = async (data) => {
	return request({
		url: 'userInfo',
		data
	})
}

export const apiUserWallList = async (data) => {
	return request({
		url: 'userWallList',
		data
	})
}

export const apiNoticeList = async (data) => {
	return request({
		url: 'wallNewsDetail',
		data
	})
}

export const apiSearchWall = async (data) => {
	return request({
		url: 'searchWall',
		data
	})
}