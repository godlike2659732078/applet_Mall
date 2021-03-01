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
    phone: "",
    card: "",
    phone: "",
    realName: "",
    userPhone: "",

   pageType:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.postData_token({
      url: "security/isPassword",
      method: "POST",
      success(res) {
       console.log(res)
       if(res.data=="true"){
         that.setData({
         scene:"SCENE_PAY_PWD_UPDATE"
         })
       }else{
        that.setData({
          scene:"SCENE_SET_PWD"
        })
       }
      }
    })

   
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },

  formSubmit(e) {
    let that = this;
    console.log(e.detail.value)
    call.postData_token({
      url: "my/alipay/add",
      data:{
        phone:e.detail.value.phone,
        card:e.detail.value.card,
        name:"支付宝",
        realName:e.detail.value.realName,
       
      } ,
      success(res) {
        console.log(res)
        if(res.code==0){
          wx.showToast({
            icon:"none",
            title: '添加成功',
          })
          wx.navigateTo({
            url: '/pages/Alipay/Alipay',
          });
        }else{
          wx.showToast({
            icon:"none",
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