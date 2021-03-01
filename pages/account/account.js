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
    columns: ['支付宝'],
    amount:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      navH: app.globalData.navHeight,
    });
    call.postData_token({
      url:"my/account",
      success(res){
        console.log(res)
        that.setData({
          amount:res.data
        })
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  goToIncome() {
    wx.navigateTo({
      url: '/pages/income-detailed/income-detailed',
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  // 点击弹出框确认触发
  confirm(event) {
    // const { picker, value, index } = event.detail;
    console.log(event.detail)
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: '/pages/withdrawal/withdrawal',
    })
  },
  // 点击取消触发
  onCancel(){
    this.setData({
      show: false
    })
  },
  goToRecharge(){
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },
  goToAudit(){
    wx.navigateTo({
      url: '/pages/audit-status/audit-status',
    })
  },
  gotoRule(){
wx.navigateTo({
  url: '/pages/ruless/ruless',
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