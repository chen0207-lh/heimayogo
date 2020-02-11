// pages/category/index.js
import {
  request
} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_list: [],
    category_left: [],
    category_right: [],
    menuIndex: 0, //默认选中菜单栏的第一项
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCategoryList();
  },
  // 获取分类页面的数据
  getCategoryList: async function(e) {
    const category_list = await request({
      url: '/categories'
    })
    console.log(category_list)
    let category_left = category_list.map(v => v.cat_name)
    let category_right = category_list[0].children
    this.setData({
      category_list,
      category_left,
      category_right
    })
    // console.log(category_left)
    // console.log(category_right)
  },
  // 点击左侧的菜单列表数据切换到对应的数据
  handleItemClick(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      category_right: this.data.category_list[index].children,
      menuIndex: index
    })

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