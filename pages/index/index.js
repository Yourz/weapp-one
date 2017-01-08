//index.js
import api from '../../api/api.js'
import util from '../../utils/util.js'

Page({
  data: {
    vols: [],
    current: 0
  },
  onLoad () {
    api.getVolIdList({
      success: (res) => {
        if (res.data.res === 0) {
          let idList = res.data.data
          console.log(idList)
          this.getVols(idList)
        }
      }
    })
  },
  getVols (idList) {
    let vols = this.data.vols

    if (idList.length > 0) {
      api.getVolById({
        query: {
          id: idList.shift()
        },
        success: (res) => {
          if (res.data.res === 0) {
            let vol = res.data.data
            
            vol.hp_author = util.formatTitle(vol.hp_author)
            vol.hp_content = util.formatContent(vol.hp_content)
            vols.push(vol)
          }
          this.getVols(idList)
        }
      })
    } else {
      this.setData({ vols })
    }
  },
  handleChange (e) {
    let current = e.detail.current
    let volsLength = this.data.vols.length

    if (current === volsLength) {
      this.setData({
        current: volsLength
      })
      wx.navigateTo({
        url: '../history/history?page=index',
        success: () => {
          this.setData({
            current: volsLength - 1
          })
        }
      })
    }
  }
})
