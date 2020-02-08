// pages/search/index.js
import {
  request
} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Inputval: '', //用来存放input输入框的内容
    goods_list: [
      // {
      //   "goods_id": 57444,
      //   "goods_name": "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）"
      // },
      // {
      //   "goods_id": 57444,
      //   "goods_name": "创维（Skyworth）42X6 42英寸10核智能酷开网络平板液晶电视（黑色）"
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 获取到input输入框的内容并赋值给先前定义好的Inputval
  handleInputChange: function(e) {
    // console.log(e.detail.value)
    this.setData({
      Inputval: e.detail.value
    })
  },
  // 处理搜索按钮的点击事件
  handleSearch: async function(e) {
    const {
      Inputval
    } = this.data
    // 判断Inputval的值是否为空
    if (!Inputval) {
      wx.showToast({
        title: '输入的商品名称不能为空',
        icon: "none"
      })
      return false;
    }
    const goods_list = await request({
      url: '/goods/qsearch',
      data: {
        query: Inputval
      }
    })
    if (goods_list.length === 0) {
      wx.showToast({
        title: '查无数据',
        icon: 'none'
      })
    }
    this.setData({
      goods_list
    })
    console.log(goods_list)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})