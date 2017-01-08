import api from '../../api/api.js'
import util from '../../utils/util.js'

Page({
  data: {
    detail: [],
    type: ''
  },
  onLoad: function (options) {
    const type = options.type
    this.setData ({ type })
    const getDetailApi = (type) => {
      if (type === 'vol') return api.getVolById
      if (type === 'music') return api.getMusicDetailById
      return api.getArticleById
    }
    const detailApi = getDetailApi(type)
    detailApi({
      query: {
        id: options.id,
        type: options.type
      },
      success: (res) => {
        if (res.data.res === 0) {
          let detail = res.data.data
          detail.hp_makettime = detail.hp_makettime && util.formatMakettime(detail.hp_makettime)
          detail.hp_content = detail.hp_content && util.formatContent(detail.hp_content)
          this.setData({ detail })
          console.log(detail)
        }
      }
    })
  },
  onReady: function () {
    const titles = {
        'vol': '图文',
        'essay': '一个阅读',
        'serialcontent':'阅读·连载',
        'question': '阅读·问答',
        'music': '一个音乐',
        'movie': '一个影视'
    }
    wx.setNavigationBarTitle({
      title: titles[this.data.type]
    })
  }
})