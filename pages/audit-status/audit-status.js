// pages/success/success.js
const app = getApp();
const call = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",

    auditList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.getData_token({
      url: "withdraw/records" + "?pageNum=" + 1 + "&pageSize=" + 20,
      success(res) {
        console.log(res)
        if(res.code==0){
          that.setData({
            auditList:res.data.recordList
          })
        }
      }
    })
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  // 设置默认地址
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  // 跳转到添加地址
  foToAdd() {
    wx.navigateTo({
      url: '/pages/addressAdd/addressAdd',
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