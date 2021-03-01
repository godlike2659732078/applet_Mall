// pages/about/about.js
const app = getApp();
const call = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    coinList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.postData_token({
      url: "token/index",

      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            coinList: res.data
          })
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  goToIncome() {
    wx.navigateTo({
      url: '/pages/int-detailed/int-detailed',
    })

  },
  gotoDetail(e) {
    console.log(e.currentTarget.dataset.coinid)
    wx.navigateTo({
      url: '/pages/operationList/operationList?coinId=' + e.currentTarget.dataset.coinid,
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
    this.onLoad()
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