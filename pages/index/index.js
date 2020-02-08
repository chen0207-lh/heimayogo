import {
  request
} from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_list: [],
    menu_list: [],
    floor_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSwiperList();
    this.getmenuList();
    this.getfloorList()
  },
  //获取路播图数据
  getSwiperList: async function(e) {
    const swiper_list = await request({
      url: '/home/swiperdata'
    })
    this.setData({
      swiper_list
    })
    // console.log(swiper_list)
  },
  // 获取菜单导航数据
  getmenuList: async function(e) {
    const menu_list = await request({
      url: '/home/catitems'
    })
    this.setData({
      menu_list
    })
    // console.log(menu_list)
  },
  // 获取楼层数据
  getfloorList: async function (e){
    const floor_list = await request({
      url:'/home/floordata'
    })
    this.setData({
      floor_list
    })
    console.log(floor_list)
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