const app = getApp();
const call = require("../../../utils/request")
const forMat = require("../../../utils/util")
Page({
  data: {
    navH: "",
    boxHeight: 0,
    liveList: [],
    liveArrar: [],
    actionTime: "",
    start: 0,
    limit: 6,
    total: null,
  },
  // 页面加载
  onLoad: function () {
    let that = this
    that.setData({
      navH: app.globalData.navHeight,
    });
    call.getData({
      url: "applet/getWeChatAppletAccessToken",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          call.getData({
            url: "applet/getDirectBroadcastingRoom?start=" + that.data.start + "&limit=" + that.data.limit + "&accessToken=" + res.data.accessToken,
            success(res) {
              console.log(res)
              if (res.code == 0) {
                that.setData({
                  total: res.data.total,
                  liveList: res.data.room_info
                })
                for (let item in that.data.liveList) {
                  var liveArrar = 'liveList[' + item + ']';
                  if (that.data.liveList[item].live_status == 102) {
                    that.setData({
                      //viparray
                      [liveArrar + 'actionTime']: forMat.formatTimeTwo(that.data.liveList[item].start_time, 'Y-M-D h:m:s'),
                    })
                  }
                }
              }
            }
          })
        }
      }
    })
 
  },

  onClickLeft: function () {
    wx.navigateBack();
  },

  loadMore() {
    let that = this;
    // console.log(that.data.pages)
    let limits = that.data.limit
    limits += 6;
    that.setData({
      limit: limits,
      start: limits + 1
    })
    call.getData({
      url: "applet/getWeChatAppletAccessToken",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          call.getData({
            url: "applet/getDirectBroadcastingRoom?start=" + that.data.start + "&limit=" + that.data.limit + "&accessToken=" + res.data.accessToken,
            success(res) {
              // console.log(res)
              if (res.code == 0 && res.data.room_info.length != 0) {
                wx.showLoading({
                  title: '玩命加载中',
                  duration: 100
                })
                let liveLists = that.data.liveList
                that.setData({
                  liveList: liveLists.concat(res.data.room_info)
                })
                for (let item in that.data.liveList) {
                  var liveArrar = 'liveList[' + item + ']';
                  if (that.data.liveList[item].live_status == 102) {
                    that.setData({
                      //viparray
                      [liveArrar + 'actionTime']: forMat.formatTimeTwo(that.data.liveList[item].start_time, 'Y-M-D h:m:s'),
                    })
                  }
                }
              } else {
                wx.showToast({
                  icon: "none",
                  title: '已经到底了',
                  duration: 500
                })

              }
            }
          })
        }
      }
    })


  },

})