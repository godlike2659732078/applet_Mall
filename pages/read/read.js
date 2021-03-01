const app = getApp();
const call = require("../../utils/request")
Page({
  data: {
    navH: "",
    circular: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    showJifen:"",
    statusBarHeight: "",
    noticeList: [],
    newsList: [],
    show: false,
    imgUrls: [{
        image: "../../images/read/luckyDraw.png"
      },
      {
        image: "../../images/read/luckyDraw.png"
      }
    ]
  },
  onLoad: function () {
    let that = this;
    that.setData({
      navH: app.globalData.navHeight,
      statusBarHeight: app.globalData.statusBarHeight
    });
    call.getData({
      url: "rule/getAppletParam",
      success(res) {
        that.setData({
          showJifen: res.data
        })
      }
    })
    let userId = wx.getStorageSync('userId')
    console.log(userId)
    if (userId) {
      call.postData({
        url: "exchange/award",
        data: {
          userId: userId,
        },
        success(res) {
          if (res.message == "免费领取已到期") {
            if (app.globalData.global == 1) {
              that.setData({
                show: true
              })
              app.globalData.global == 2
            } else {

            }
          } else {

          }
        }
      })
    } else {

    }


    call.getData({
      url: "notice/index?num=" + 6,
      method: "GET",
      success(res) {
        if (res.code == 0) {
          that.setData({
            noticeList: res.data
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '加载失败！请稍后重试',
          })
        }
      }
    })
    call.getData({
      url: "discover/news?pageNum=" + 1 + '&pageSize=' + 10,
      method: "GET",
      success(res) {
        // console.log(res)
        if (res.code == 0) {
          that.setData({
            newsList: res.data.articles
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '加载失败！请稍后重试',
          })
        }
      }
    })
  },
  gotoVip() {
    wx.navigateTo({
      url: '/pages/buyvip/buyvip',
    })
  },
  onClose() {
    let that = this;
    that.setData({
      show: false
    })
  },
  gotoLuckyDraw() {
      let luckDrawUrl = encodeURIComponent('https://app.chainmall.pro/luckyDraw?token='+wx.getStorageSync('user'))
      wx.navigateTo({
        url: '/pages/bannerDetail/bannerDetail?&url=' + luckDrawUrl,
      })
    

  },
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: '链上商城-资讯',
      path: "/pages/read/read",
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
  gotoAll() {
    wx.navigateTo({
      url: '/pages/newsAll/newsAll',
    })
  },

  gotonewsDetails(e) {
    wx.navigateTo({
      url: '/pages/newsDetails/newsDetails?id=' + e.currentTarget.dataset.id,
    })
  }
})