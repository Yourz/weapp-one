const host = 'http://v3.wufazhuce.com:8000'
const oneReq = (options, url) => {
    wx.showToast({
        title: '加载中',
        icon: 'loading'
    })
    wx.request({
        url: url,
        method: options.method || 'GET',
        data: options.data || {},
        header: {
            'content-type': 'application/json'
        },
        success (res) {
            options.success && options.success(res)
            wx.hideToast()
        },
        fail (err) {
            options.fail && options.fail(err)
        },
        complete (res) {
            options.complete && options.complete(res)
        }
    })
}

//index 
const getVolById = (options) => oneReq(options, `${host}/api/hp/detail/${options.query.id}`)
const getVolIdList = (options) => oneReq(options, `${host}/api/hp/idlist/0`)
const getVolsByMonth = (options) => oneReq(options,`${host}/api/hp/bymonth/${options.query.month}`)

//reading
const getCarousel = (options) => oneReq(options, `${host}/api/reading/carousel`)
const getLastArticles = (option) => oneReq(options,`${host}/api/reading/index`)
const getEssayById = (options) => oneReq(options,`${host}/api/essay/${options.query.id}`)
const getSerialById = (options) => oneReq(options,`${host}/api/serialcontent/${options.query.id}`)
const getQuestionById = (options) => oneReq(options,`${host}/api/question/${options.query.id}`)
const getArticlesByMonth = (options) => oneReq(options,`${host}/api/${options.query.type}/bymonth/${options.query.month}`)
const getArticleById = (options) => oneReq(options,`${host}/api/${options.query.type}/${options.query.id}`)

//music
const getMusicIdList = (options) => oneReq(options,`${host}/api/music/idlist/0`)
const getMusicsByMonth = (options) => oneReq(options,`${host}/api/music/bymonth/${options.query.month}`)
const getMusicDetailById = (options) => oneReq(options,`${host}/api/music/detail/${options.query.id}`)

//movie
const getMovieListById = (options) => oneReq(options,`${host}/api/movie/list/${options.query.id}`)
const getMovieDetailById = (options) => oneReq(options,`${host}/api/movie/detail/${options.query.id}`)
const getMovieStoryById = (options) => oneReq(options,`${host}/api/movie/${options.query.id}/story/1/0`)

module.exports = {
    getVolById,
    getVolIdList,
    getVolsByMonth,
    getCarousel,
    getLastArticles,
    getEssayById,
    getSerialById,
    getQuestionById,
    getArticlesByMonth,
    getMusicIdList,
    getMusicsByMonth,
    getMusicDetailById,
    getMovieListById,
    getMovieDetailById,
    getMovieStoryById,
    getArticleById
}