const app = getApp();
const call = require("../../utils/request")
Page({
  data: {
    navH: "",
    boxHeight: 0,
    statusBarHeight: "",
    noticeList: [],
    newsList: [],
    curNav: 0,
    clickTag: [{
      id: 0,
      name: "最新"
    }, {
      id: 1,
      name: "最热",
    }],
    change: "latest",
    pageNum: 1,
    pageSize: 10
  },
  onLoad: function () {
    let that = this;
    this.setData({
      navH: app.globalData.navHeight,
      statusBarHeight: app.globalData.statusBarHeight
    });
    let res = wx.getSystemInfoSync();
    let boxHeight = res.windowHeight - res.windowHeight * 0.154;
    that.setData({
      'boxHeight': 2 * boxHeight
    });
 
    call.getData({
      url: "discover/news?pageNum=" + that.data.pageNum + '&pageSize=' + that.data.pageSize,
      method: "GET",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            newsList: res.data.articles,
          })
        }
      }
    })
  },
  changeNeme(e) {
    let that = this;
    that.setData({
      newsList: []
    })
    console.log(e.currentTarget.dataset.item.id)
    let filter = e.currentTarget.dataset.item.id;

    if (filter == 0) {
      that.setData({
        change: "latest"
      })
    } else {
      that.setData({
        change: "hot"
      })
    }
    
    call.getData({
      url: "discover/news?filter=" + that.data.change + '&pageNum=' + that.data.pageNum + '&pageSize=' + that.data.pageSize,
      method: "GET",
      success(res) {
        console.log(res)
        if (res.code == 0) {
          that.setData({
            curNav: filter,
            newsList: res.data.articles,

          })
        }
      }
    })
  },
  loadMore() {
    let that = this;
    let pageNum = that.data.pageNum
    pageNum+=1;
    that.setData({
      pageNum: pageNum
    })
    console.log(pageNum)
      call.getData({
        url: 'discover/news?filter=' + that.data.change + '&pageNum=' + that.data.pageNum + '&pageSize=' +that.data.pageSize,
        method: "GET",
        success(res) {
          console.log(res);
          if (res.data.articles.length==0) {
            wx.showLoading({
              icon:"none",
              title: '已经到底了',
              duration: 100
            })
          } else {
            wx.showLoading({
              title: '玩命加载中',
              duration: 100
            })
            that.setData({
              pageNum: pageNum,
              newsList: that.data.newsList.concat(res.data.articles),
            })
          }
        }
      });
    // 显示加载图标
  },
  onClickLeft: function () {
    wx.navigateBack();
},
  gotoDetails(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/newsDetails/newsDetails?id=' + e.currentTarget.dataset.id,
    })
  }
})