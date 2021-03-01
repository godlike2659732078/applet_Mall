// pages/success/success.js
const app = getApp();
const call = require("../../utils/request")
var CryptoJS = require('../../utils/crypto-js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    boxHeight: 0,
    oldPwd: "",
    newPwd: "",
    reNewPwd: "",
    phone: "",
    code: "",
    userPhone: "",
    time: "获取验证码",
    currentTime: 60,
    disabled: false,
    code:0
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
      method: "GET",
      success(res) {
        let reg = /^(\d{3})\d*(\d{4})$/;
        let str1 = res.data.phone.replace(reg, '$1****$2')
        // console.log(str1);
        that.setData({
          userPhone: str1,
          phone: res.data.phone
        })
      }
    })
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  encrypt(str) {
    let key = CryptoJS.enc.Hex.parse('31323334353637383930313233343132');
    let iv = CryptoJS.enc.Hex.parse('30313233343536373839414243444546'); //向量iv
    let phone = CryptoJS.AES.encrypt(str, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    phone = phone.ciphertext.toString();
    return phone;
  },
  getCode() {
    console.log(111)
    let that = this;
    call.postData({
      url: "captcha/index",
      method: 'POST',
      data: {
        phone: this.encrypt(that.data.phone),
        scene: "SCENE_PWD_UPDATE"
      },
      success(res) {
        // console.log(res);
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: "获取成功",
          })
          let currentTime = that.data.currentTime
          let interval = setInterval(function () {
            currentTime--;
            that.setData({
              time: currentTime + 's'
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                time: '重新发送',
                currentTime: 60,
                disabled: false
              })
            }else{
              that.setData({
                disabled: true
              })
            }
          }, 1000)
        } 
        else {
          wx.showToast({
            icon: "none",
            title: res.message,
          })
        }
      },
    })
  },
  getVerificationCode() {
    this.getCodes();
    let that = this
    that.setData({
      disabled: true
    })
  },
  formSubmit(e) {
    console.log(e.detail.value)
    let that = this;
    console.log(e.detail.value)
    call.postData_token({
      url: "security/pwdUpdate",
      data: {
        oldPwd: e.detail.value.oldPwd,
        newPwd: e.detail.value.newPwd,
        reNewPwd: e.detail.value.reNewPwd,
        code: e.detail.value.code,
        phone: that.data.phone,
        scene: "SCENE_PWD_UPDATE"
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: '设置成功',
          })
          wx.navigateBack();
        } else {
          wx.showToast({
            icon: "none",
            title: res.message,
          })
        }
      }
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