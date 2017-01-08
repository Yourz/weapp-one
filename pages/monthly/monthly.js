import api from '../../api/api.js'
import util from '../../utils/util.js'

Page({
  data: {
    title: '',
    monthly: [],
    type: ''
  },
  onLoad (options) {
    const getMonthApi = (type) => {
      if (type === 'vol') return api.getVolsByMonth
      if (type === 'music') return api.getMusicsByMonth
      return api.getArticlesByMonth
    }
    const monthApi = getMonthApi(options.type)
    this.setData({ 
      title: options.title,
      type: options.type
    })
    monthApi({
      query: {
        month: options.month,
        type: options.type
      },
      success: (res) => {
        if (res.data.res === 0) {
          let monthly = res.data.data

          monthly.map((vol) => {
            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
          })
          this.setData({ monthly })
        }
      }
    }) 
  },
  onReady () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  handleTap (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}&type=${this.data.type}`
    })
  }
})