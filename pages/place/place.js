// pages/share/share.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    show: false,
    link: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.postData_token({
      url: "token/address",
      data: {
        coinId: options.coinId
      },
      success(res) {
        console.log(res)
        that.setData({
          link: res.data
        })
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  copyCode(e) {
    let that = this;
    console.log(e)
    wx.setClipboardData({
      data: that.data.link.address,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              icon: "none",
              title: '复制成功'
            })
          }
        })
      }
    })

  },
  gotoRecord() {
    wx.navigateTo({
      url: '/pages/record/record',
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