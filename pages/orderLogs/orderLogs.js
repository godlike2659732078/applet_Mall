// pages/orderLogs/orderLogs.js
const app = getApp();
const call = require("../../utils/request")
const format = require("../../utils/time")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    active: 0,
    steps: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    })

    call.postData_token({
      url: "order/cxkd",
      data: {
        orderNo: options.orderNo
      },
      success(res) {
    
        if (res.code == 0) {
          that.setData({
            steps: res.data.msg.context
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '出错了，请稍后重试',
          })
        }
        console.log(res)
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
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