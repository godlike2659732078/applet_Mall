// pages/success/success.js
const app = getApp();
const call = require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    boxHeight: 0,
    details: null,
    showUnOut: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.1;
    that.setData({
      'boxHeight': boxHeight
    });
    console.log(options)
    let coinId = options.coinId
    call.postData_token({
      url: "token/view",
      data: {
        coinId: coinId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            details: res.data
          })

        }
      }
    })
    call.getData_token({
      url: "user/info",
      method: "GET",
      success(res) {
        if (options.coinId == "30" && res.data.level == "1") {
          that.setData({
            showUnOut: true
          })
        } else {
          that.setData({
            showUnOut: false
          })
        }
      }

    })
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
 
  gotoOperation() {
    let that = this;
    wx.navigateTo({
      url: '/pages/int-detailed/int-detailed?coinId=' + that.data.details.coinId,
    })
  },
  gotoPlace() {
    let that = this;
    wx.navigateTo({
      url: '/pages/place/place?coinId=' + that.data.details.coinId,
    })
  },
  gotoBrief() {
    let that = this;
    wx.navigateTo({
      url: '/pages/brief/brief',
    })
  },
  gotoOut() {
    let that = this;
    wx.navigateTo({
      url: '/pages/outoper/outoper?coinId=' + that.data.details.coinId,
    })
  },
  showUnout() {
    wx.showToast({
      title: '开通会员后即可转账CMT',
      icon: "none"
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
  onShow() {
    this.onLoad
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