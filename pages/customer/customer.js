// pages/share/share.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    showQQ: false,
    showWechat: false,
    showEmail: false,
    showPhone: false,
    QQ: "",
    wechat: "",
    email: "123456789",
    phone: "123456789"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    });
  },
  copyText (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
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
  onClickLeft: function () {
    wx.navigateBack();
  },
  showQQ() {
    let that = this;
 
    that.setData({
      showQQ: true
    })
  },
  showWechat() {
    let that=this;
    call.getData_token({
      url: "rule/getemail",
      success(res) {
        console.log(res)
        that.setData({
          wechat:res.data.qrimage
        })
      }
    })
    that.setData({
      showWechat: true
    })
  },
  showEmail() {
    let that=this;
    call.getData_token({
      url: "rule/getemail",
      success(res) {
        console.log(res)
        that.setData({
          email:res.data.email
        })
      }
    })
    that.setData({
      showEmail: true
    })
  },
  showPhone() {
    let that=this;
    call.getData_token({
      url: "rule/getemail",
      success(res) {
        console.log(res)
        that.setData({
          phone:res.data.phone
        })
      }
    })
    that.setData({
      showPhone: true
    })
  },
  onClose() {
    this.setData({
      showQQ: false,
      showWechat: false,
      showEmail: false,
      showPhone: false
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