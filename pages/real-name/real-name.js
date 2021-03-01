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
    name: "",
    gender: "",
    idNumber: "",
    household: "",
    sex: "男",
    positive: [],
    back: [],
    image_face: "../../images/user/positive.png",
    image_back: "../../images/user/opposite.png",
    frontCardImg: "",
    backCardImg: ""

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
  // 选择身份证正面照
  chooseFace() {
    let that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //可以指定来源是相册还是相机，黑t认二者都有
      success: function (res) {
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFiles[0].path
        // tempFiles[0].path
        console.log(res)
        wx.uploadFile({
          url: 'https://app.chainmall.pro/api/saveImage/image', //仅为示例，非真实的接口地址
          header: {
            "content-type": "application/json;charset=UTF-8",
          },
          filePath: tempFilePaths,
          name: "file",
          formData: {
            file: tempFilePaths,
            type: "card",
          },
          success(res) {
            console.log(JSON.parse(res.data))
            let headImage = JSON.parse(res.data)
            let frontCardImg = headImage.data.split("https://res.chainmall.pro/")
            that.setData({
              image_face: headImage.data,
              frontCardImg: frontCardImg[1]
            })
            // console.log(headImage)
           
            //do something
          }
        })
      }
    })


  },
  // 选择身份证背面照
  chooseBack() {
    let that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //可以指定来源是相册还是相机，黑t认二者都有
      success: function (res) {
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFiles[0].path
        // tempFiles[0].path
        console.log(res)
        wx.uploadFile({
          url: 'https://app.chainmall.pro/api/saveImage/image', //仅为示例，非真实的接口地址
          header: {
            "content-type": "application/json;charset=UTF-8",
          },
          filePath: tempFilePaths,
          name: "file",
          formData: {
            file: tempFilePaths,
            type: "card",
          },
          success(res) {
            console.log(JSON.parse(res.data))
            let headImage = JSON.parse(res.data)
            let backCardImg = headImage.data.split("https://res.chainmall.pro/")
            that.setData({
              image_back: headImage.data,
              backCardImg: backCardImg[1]
            })
            // console.log(headImage)
          
            //do something
          }
        })
      }
    })


  },
  formSubmit(e) {
    console.log(e.detail.value)
    let that = this;
    let userContent = e.detail.value;
    call.postData_token({
      url: "security/auth",
      data: {
        realName: userContent.name,
        sex: userContent.sex,
        cardCode: userContent.idNumber,
        frontCardImg: that.data.frontCardImg,
        backCardImg: that.data.backCardImg,
      },
      success(res) {
        console.log(res)
        if(res.code==0){
          wx.showToast({
            icon:"none",
            title: '上传成功，等待审核',
          })
          wx.navigateTo({
            url: '../securitys/securitys',
          })
        }else{
          wx.showToast({
            icon:"none",
            title: res.data,
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