// pages/history/history.js
var util = require('../../utils/util.js')
Page({
  data: {
    dateList: [],
    types: [
      {
        type: 'vol',
        name: '图文'
      },
      {
        type: 'essay',
        name: '阅读'
      },
      {
        type: 'serialcontent',
        name: '连载'
      },
      {
        type: 'question',
        name: '问题'
      },
      {
        type: 'music',
        name: '音乐'
      }
    ],
    type: 'vol'
  },
  onLoad (options) {
    let page = options.page
    let dateList = util.getDateList(page)
    this.setData({
      page: page,
      dateList: dateList
    })
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: '往期列表'
    })
  },
  setType (e) {
    let type = e.target.dataset.type
    let dateList = util.getDateList(type)
    this.setData({
      dateList: dateList,
      type: type
    })
  },
  getMonthly (e) {
    let month = e.currentTarget.dataset.month
    let title = e.currentTarget.dataset.title
    let type = this.data.type
    wx.navigateTo({
      url: `../monthly/monthly?type=${type}&title=${title}&month=${month}`
    })
  }
})
