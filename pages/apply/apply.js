const app = getApp();
const call = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: "",
    show: false,
    actions: [],
    explain: "",
    fileList: [],
    goodDetail: "",
    orderId: "",
    chooseReason: "请选择",
    chooseImage1: "../../images/order/orderMessage/photo.png",
    chooseImage2: "../../images/order/orderMessage/photo.png",
    chooseImage3: "../../images/order/orderMessage/photo.png",
    chooseImage1s: "",
    chooseImage2s: "",
    chooseImage3s: ""
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
      url: "order/refund",
      data: {
        orderId: options.orderId
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            goodDetail: res.data,
            orderId: options.orderId
          })
        }
      }
    })
    call.getData({
      url: "order/refund/reason",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            actions: res.data
          })
        }
      }
    })
  },
  onClickLeft: function () {
    wx.navigateBack();
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  getexplain(e) {
    let that = this;

    that.setData({
      explain: e.detail.value
    })
  },
  cancleTp(e) {
    let that = this;
    that.setData({
      show: false
    })
  },
  confirmTp(e) {
    let that = this;
    console.log(e.detail)

    that.setData({
      chooseReason: e.detail.value,
      show: false
    })
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onSelect(event) {
    console.log(event.detail);
  },
  // 第三张
  chooseImage1() {
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
              chooseImage1: headImage.data,
              chooseImage1s: backCardImg[1]
            })
            // console.log(headImage)

            //do something
          }
        })
      }
    })


  },
  //第二张
  chooseImage2() {
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
              chooseImage2: headImage.data,
              chooseImage2s: backCardImg[1]
            })
            // console.log(headImage)

            //do something
          }
        })
      }
    })
  },
  // 第三张
  chooseImage3() {
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
              chooseImage3: headImage.data,
              chooseImage3s: backCardImg[1]
            })
            // console.log(headImage)

            //do something
          }
        })
      }
    })

  },
  goToResponse() {
    let that = this;
    console.log(that.data.goodDetail.amount.toFixed(2))
    let obj = {
      orderId: that.data.orderId,
      context: that.data.goodDetail.goodsTitle,
      reason: that.data.chooseReason,
      amount: that.data.goodDetail.amount,
      remark: that.data.explain,
      firstImage: that.data.chooseImage1s,
      secondImage: that.data.chooseImage2s,
      thirdImage: that.data.chooseImage3s,
    };
    console.log(obj)
    call.postData_token({
      url: "order/refund/submit",
      data: {
        orderId: that.data.orderId,
        context: that.data.goodDetail.goodsTitle,
        reason: that.data.chooseReason,
        amount: that.data.goodDetail.amount.toFixed(2),
        remark: that.data.explain,
        firstImage: that.data.chooseImage1s,
        secondImage: that.data.chooseImage2s,
        thirdImage: that.data.chooseImage3s,
      },
      success(res) {
        console.log(res)
        if (res.code == 0) {
        wx.showToast({
          icon:"none",
          title: '提交成功，请等待处理',
        })
        }else{
          wx.showToast({
            icon:"none",
            title: res.message,
          })
        }
      }
    })

  }
})