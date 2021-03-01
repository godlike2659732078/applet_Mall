// pages/success/success.js
const app = getApp();
const call = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    status: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.getData_token({
      url: "user/info",
      success(res) {
        console.log(res)
        let status = ""
        if (res.data.isAuth == 0) {
          status = "未认证"
        } else if (res.data.isAuth == 1) {
          status = "认证中"
        } else if (res.data.isAuth == 2) {
          status = "认证失败"
        } else {
          status = "已认证"
        }
        that.setData({
          status: status
        })
      }
    })
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  goToSetpwd() {
    wx.navigateTo({
      url: '/pages/setpassword/setpassword',
    })
  },
  goToChange() {
    wx.navigateTo({
      url: '/pages/change-password/change-password',
    })
  },
  goToName() {
    let that=this;
    call.getData_token({
      url: "user/info",
      success(res) {
        console.log(res)
        let status = ""
        if (res.data.isAuth == 0||res.data.isAuth==2) {
          wx.navigateTo({
            url: '/pages/real-name/real-name',
          })
        } else {
          wx.showToast({
            icon:"none",
            title: '您已实名认证！',
          })
        }
      }
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