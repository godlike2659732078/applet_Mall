// pages/success/success.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    boxHeight: 0,
    passwordType1: true,
    defaultType1: true,
    passwordType2: true,
    defaultType2: true,
    passwordType3: true,
    defaultType3: true,
    oldPwd:"",
    newPwd1:"",
    newPwd2:"",
    phone:"185****9288"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    });
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  formSubmit(e) {
    console.log(e.detail.value)
  },
  changePwd1() {
    this.data.defaultType1 = !this.data.defaultType1
    this.data.passwordType1 = !this.data.passwordType1
    this.setData({
      defaultType1: this.data.defaultType1,
      passwordType1: this.data.passwordType1
    })
  },
  changePwd2() {
    this.data.defaultType2 = !this.data.defaultType2
    this.data.passwordType2 = !this.data.passwordType2
    this.setData({
      defaultType2: this.data.defaultType2,
      passwordType2: this.data.passwordType2
    })
  },
  changePwd3() {
    this.data.defaultType3 = !this.data.defaultType3
    this.data.passwordType3 = !this.data.passwordType3
    this.setData({
      defaultType3: this.data.defaultType3,
      passwordType3: this.data.passwordType3
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
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