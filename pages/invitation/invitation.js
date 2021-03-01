// pages/share/share.js
const app = getApp();
const call=require("../../utils/request")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    show: false,
    link:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.postData_token({
      url: "distribute/share",
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
  copyCode(e){
      let that = this;
      console.log(e)
      wx.setClipboardData({
        data: that.data.link.shareUrl,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                icon:"none",
                title: '复制成功'
              })
            }
          })
        }
      })
    
  },
  gotoRecord(){
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
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: '链上商城-邀请',
      path: "/pages/invitation/invitation",
      success: function (res) {
        console.log("分享成功！:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("分享失败！:" + JSON.stringify(res));
      }
    }
  },
  //用户点击右上角分享朋友圈
onShareTimeline: function () {
  
},
})