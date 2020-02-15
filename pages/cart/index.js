// pages/cart/index.js
import { showModal } from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],//购物车的数据
    allChecked: true,//购物车的全部选中，默认全部不选中
    totlaPrice: 0,//购物车的总价格
    totalNum: 0//选中商品的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 处理单项点击选择选中或不选中
  handleCheck: function (e) {
    // console.log(e)
    // 获取到传进来的goods_id
    const { goods_id } = e.currentTarget.dataset
    // 获取缓存中carts的数据
    const carts = wx.getStorageSync('carts') || []
    // 判断获取到的数据的goods_id与点击的goods_id是否一样
    const index = carts.findIndex(v => v.goods_id === goods_id)
    // 获取到之前定义好的checked的true或false判断是否有选中该商品
    carts[index].checked = !carts[index].checked
    // 把已经修改更新完成的数据存回缓存中去
    this.setCart(carts);
  },
  // 处理全部选中或全部不选中
  handleAllCheck: function (e) {
    // 从data数据中获取到allChecked,carts
    let { allChecked, carts } = this.data
    // 点击全选对allChecked的状态取反
    allChecked = !allChecked
    // 把checked的状态赋值给allChecked
    carts.forEach(v => v.checked = allChecked);
    console.log(allChecked)
    // 并把更新的数据存回缓存中去
    this.setCart(carts);
  },
  // 处理加减运算
  handleOperation: async function (e) {
    // 获取到从页面传来的参数
    const { goods_id, operation } = e.currentTarget.dataset
    // 获取到本地缓存中数据
    let carts = wx.getStorageSync('carts') || []
    // 获取到点击的该商品在carts中的位置
    const index = carts.findIndex(v => v.goods_id === goods_id)
    // 执行加减的操作
    if (operation == -1 && carts[index].num - 1 == 0) {
      // 当operation=-1或数量减到0时执行，并提示用户是否要删除掉该商品
      const res = await showModal({
        content: '你确定要删除该商品吗？'
      })
      //  wx.showModal中的成功的回调
      // 确定删除该商品
      if (res.confirm) {
        carts.splice(index, 1)
      }
    } else {
      carts[index].num += operation
    }
    this.setCart(carts);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取到缓存中的购物车数据 一开始获取到的数据会是空的
    let carts = wx.getStorageSync('carts') || []
    this.setCart(carts);
  },
  // 定义一个函数来计算购物车的总价和数量，以及把获取到全新carts的数据设置回缓存中去
  setCart: function (carts) {
    // 一开始allChecked默认为真
    let allChecked = true
    // 商品的总价
    let totlaPrice = 0
    // 选中商品的数量
    let totalNum = 0
    // 循环判断购物车列表里的v.checked的每一项是否都为真
    carts.forEach(v => {
      // 如果v.checked中有一项为false
      if (v.checked) {
        // 如果是真的就不用修改，因为一开始默认就为真
        // 商品的数量
        totalNum += v.num
        // 商品的总价格
        totlaPrice += v.num * v.goods_price

      } else {
        allChecked = false
      }
    })
    //把数据存到data中，视图会更新
    this.setData({
      carts, allChecked, totalNum, totlaPrice
    })
    // 把数据设置回缓存中去
    wx.setStorageSync('carts', carts)
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