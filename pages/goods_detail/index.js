// pages/goods_detail/index.js
import { request } from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_list: [],
    isCollect: false//收藏标识默认是不收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options)
  },
  // 获取商品信息
  getGoodsDetail: async function (params) {
    console.log(params)
    const detail_list = await request({
      url: '/goods/detail',
      data: params
    })
    let collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(v => v.goods_id === detail_list.goods_id)
    this.setData({
      detail_list,
      isCollect
    })
    console.log(detail_list)
  },
  // 处理点击图片进行预览效果
  handleImageClick: function (e) {
    console.log(e)
    // 解构出刚刚通过data-传入的参数
    const { pics, current } = e.currentTarget.dataset
    // 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作
    wx.previewImage({
      current: current,
      urls: pics.map(v => v.pics_mid),
    })
  },
  // 收藏的点击事件
  handleCollect: function (e) {
    // 标识是否收藏默认为false不收藏
    let isCollect = false
    // 从本地缓存中获取信息,因为一开始初始化时是没有数据的，所以在后面定义一个空数组
    let collect = wx.getStorageSync('collect') || []
    // 判断当前商品有没有在collect中收藏
    let index = collect.findIndex(v => v.goods_id === this.data.detail_list.goods_id)
    // 如果index不等于-1就代表collect本地缓存中已收藏有此数据
    if (index != -1) {
      // 已经收藏有就删除,splice(要删除的锁引值，要删除多少个)
      collect.splice(index, 1)
      // 标识一下该商品没有收藏
      isCollect = false
      // 提示用户
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        // mask:防止用户到处点击
        mask: true
      })
    } else {
      // 收藏成功，就把当前请求数据获取到的数据push添加到collect本地缓存中去
      collect.push(this.data.detail_list)
      // 标识一下该商品已收藏
      isCollect = true
      // 并提示用户
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 把更新的collect 收藏数据存储回本地
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })

  },
  // 加入购物车
  handleCartAdd: function (e) {
    // 从缓存中获取到购物车信息
    let carts = wx.getStorageSync('carts') || []
    // 通过 findIndex判断是否有当前该条信息数据
    let index = carts.findIndex(v => v.goods_id === this.data.detail_list.goods_id)
    // index=-1就代表是第一次添加
    if (index === -1) {
      let detail_list = this.data.detail_list
      // 第一次添加就是1，再继续添加就追加上去
      detail_list.mun = 1
      detail_list.checked = true
      // 把添加到购物车中的商品数据添加进carts中
      carts.push(detail_list)
    } else {
      // 如果该商品已经在购物车中了就把数量追加上去
      cates[index].mun++
    }
    // 重新把carts数据添加回缓存中
    wx.setStorageSync('carts', carts)
    // 提示用户 已经添加成功
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})