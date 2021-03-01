// pages/share/share.js
const app = getApp();
var QRCode = require('../../../utils/weapp-qrcode.js');
var qrcode;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    show: false,
    link: "",
    userId:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
      userId:options.userId
    });
    qrcode = new QRCode('canvas', {
      text: that.data.userId,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    console.log(qrcode)
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  copyCode(e) {
    let that = this;
    console.log(e)
    wx.setClipboardData({
      data: that.data.userId,
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