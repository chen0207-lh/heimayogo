// pages/goods_list/index.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goods: []
  },
  //列表需要的参数
  QueryParams: {
    pagenum: 1,//页码
    pagesize: 10 //页容量
  },
  totalPages: 0,//页码的总数量

  // 处理子组件Tabs重新获取更新的Tabs数据传递过来的
  handlTabsChange(e) {
    console.log(e)
    this.setData({
      // 把重新获取到的数据重新赋值给Tabs数组中
      Tabs: e.detail
    })
  },
  // 获取列表数据
  getgoodsList: async function () {
    const goods_list = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    // 计算总页数为多少，列表的总数量除以this.QueryParams.pagesize就可以得出
    this.totalPages = Math.ceil(goods_list.total / this.QueryParams.pagesize)
    console.log(goods_list)
    this.setData({
      // [...goods_list.goods 在上拉时追加上去的数据, ...this.data.goods上拉之前原有的数据]
      goods: [...goods_list.goods, ...this.data.goods]
    })
    // 关闭下拉提示圈
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取当前页面
    const pages = getCurrentPages();
    // pages.length等于负一就是当前页面
    const currentPages = pages[pages.length - 1]
    // 在当前页面中有两个参数在currentPages.options中
    console.log(currentPages)
    const cid = currentPages.options.cid
    const query = currentPages.options.query
    // const cid = parseInt(data)
    console.log(cid, query)
    // 判断如果在currentPages.options中有cid或query参数就传进this.QueryParams中
    if (cid) {
      this.QueryParams['cid'] = cid
    }
    if (query) {
      this.QueryParams['query'] = query
    }
    this.getgoodsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // 下拉重新加载数据 
  onPullDownRefresh: function () {
    // 1.需要把列表清空先
    this.setData({
      goods: []
    })
    // 2.把页面重重置为1
    this.QueryParams.pagenum = 1
    // 3.重新请求数据
    this.getgoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // 触底加载下一页数据
  onReachBottom: function () {
    // 判断当前的页码是否大于请求的页码
    if (this.totalPages >= this.QueryParams.pagenum) {
      // 如果大于就继续请求获取
      this.QueryParams.pagenum++;
      // 继续获取列表数据
      this.getgoodsList();
    } else {
      wx.showToast({
        title: '已经没有下一页的数据了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})