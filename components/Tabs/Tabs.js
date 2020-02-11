// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 从父组件中传递来的参数
    Tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tabs栏时触发
    handleTabClick: function(e) {
      console.log(e)
      // 获取到点击tabs栏时的id
      const id = e.currentTarget.dataset.id
      // 获取到从父组件传递过来的tabs值
      let {Tabs} = this.data
      // 使用三元表达式判断点击是的id值是否和父组件传递过来的id是否一样
      Tabs.forEach(v => v.id == id ? v.isActive = true : v.isActive = false)
      this.setData({
        Tabs
      })
      // 把点击更新后获取到Tabs数据传递回父组件中
      this.triggerEvent('TabsChange',Tabs)
    }
  }
})