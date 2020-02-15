// 使用promise对我笑的异步接口操作继续封装


// 异步showModal
export const showModal = (params) => {
  return new Promise(function (resolve, reject) {
    wx.showModal({
      content: params.content,
      // 成功的回调
      success: (res) => {
        resolve(res)
      },
      // 失败的回调
      fail: (err) => {
        reject(err)
      }
    })
  })
}