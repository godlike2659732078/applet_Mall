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
    lv: "",
    userContent: "",
    userPhone: "",
    show: false,
    value: "",
    nickName: "",
    nickNames: "",
    imgUrl: "",
    fileList: [],
    userId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.1;
    that.setData({
      'boxHeight': boxHeight
    });
    call.getData_token({
      url: "user/info",
      method: "GET",
      success(res) {
        console.log(res)
        let reg = /^(\d{3})\d*(\d{4})$/;
        let str1 = res.data.phone.replace(reg, '$1****$2')
        console.log(str1);
        that.setData({
          userContent: res.data,
          userPhone: str1,
          nicknames: res.data.nickname.substring(0, 10),
          userId:res.data.uuid
        })
      }
    })
  },
  // 返回上一页
  onClickLeft: function () {
    wx.navigateBack();
  },
  formSubmit(e) {
    let that = this;
    console.log(e.detail.value.nickName)
    call.postData_token({
      url: "my/editNickname",
      method: "POST",
      data: {
        nickname: e.detail.value.nickName
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.showToast({
            icon: "none",
            title: '修改成功！',
          })
          that.setData({
            show: false
          })
          that.onShow()
        }
      }
    })
  },
  onClose() {
    let that = this;
    that.setData({
      show: false
    })
  },
  changeImage() {
    let that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //可以指定来源是相册还是相机，黑t认二者都有
      success: function (res) {
        console.log(res)
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFiles[0].path
        // tempFiles[0].path
        console.log(res)
        wx.uploadFile({
          url: 'https://app.chainmall.pro/api/saveImage/image', 
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
            console.log(res)
            console.log(JSON.parse(res.data))
            let headImage = JSON.parse(res.data)
            let image = headImage.data.split("https://res.chainmall.pro/")
            // console.log(headImage)
            // console.log(image)
            call.postData_token({
              url: "my/editHeadImage",
              method: "POST",
              data: {
                headImage: image[1]
              },
              success(res) {
                console.log(res)
                if (res.code == 0) {
                  that.onShow()
                  wx.showToast({
                    icon: "none",
                    title: '修改成功！',
                  })

                }
              }
            })
            that.setData({
              imgUrl: tempFilePaths
            })
            //do something
          }
        })
      }
    })


  },
  setUserName() {
    let that = this;
    that.setData({
      show: true
    })
  },
  goToSecurtys() {
    wx.navigateTo({
      url: '/pages/securitys/securitys',
    })
  },
  gotoUserId(){
    let that=this;
    wx.navigateTo({
      url: '/pageBox/pages/userId/userId?userId='+that.data.userId,
    })
  },
  goToAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  gotoAlipy() {
    wx.navigateTo({
      url: '/pages/Alipay/Alipay',
    })
  },
  clearUser() {
    wx.clearStorageSync('user')
    wx.clearStorageSync('userId')
    call.postData_token({
      url: "user/logOut",
      method: "POST",
      data: {},
      success(res) {
        console.log(res)
        if (res.code == 0) {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    })

  },
  gotoAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  gotoCustom() {
    wx.navigateTo({
      url: '/pages/customer/customer',
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
    let that = this;
    call.getData_token({
      url: "user/info",
      method: "GET",
      success(res) {
        console.log(res)
        let reg = /^(\d{3})\d*(\d{4})$/;
        let str1 = res.data.phone.replace(reg, '$1****$2')
        console.log(str1);
        that.setData({
          userContent: res.data,
          userPhone: str1
        })
      }
    })
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