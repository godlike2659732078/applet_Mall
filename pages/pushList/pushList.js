const app = getApp();
const call = require("../../utils/request")
Page({
    data: {
        noticeList:[],
        navH: "",
        collegeList: [
        ],
        detailBox: [],
        pageNum: 1,
        pageSize: 10,
        allPages: 3
    },
    onLoad: function () {
        let that = this;
        that.setData({
            navH: app.globalData.navHeight,
        });
        call.postData_token({
            url: "userInform/push/informList",
            method: "POST",
            data: {
                pageNum: that.data.pageNum,
                pageSize: that.data.pageSize
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    that.setData({
                        collegeList: res.data.items,
                        allPages: res.data.pages
                    })
                }
            }
        })
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
    },
    onShow() {
        let that = this;
        call.postData_token({
            url: "userInform/push/informList",
            method: "POST",
            data: {
                pageNum: 1,
                pageSize: 100
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    that.setData({
                        collegeList: res.data.items,
                        allPages: res.data.pages
                    })

                }
            }
        })
    },
    onClickLeft: function () {
        wx.navigateBack();
    },
    gotoDetail(e) {
        wx.navigateTo({
            url: '/pages/pushDetails/pushDetails?id=' + e.currentTarget.dataset.id,
        })
    },
    gotoDetails(e) {
        wx.navigateTo({
          url: '/pages/noticeDetails/noticeDetails?uuid=' + e.currentTarget.dataset.id,
        })
      },
    // 上拉加载更多
    loadMore() {
        let that = this;
        let pageNum = that.data.pageNum
        pageNum++;
        that.setData({
            pageNum: pageNum
        })
        if (pageNum <= that.data.allPages) {
            wx.showLoading({
                icon: "none",
                title: '玩命加载中',
                duration: 200
            })
            call.postData_token({
                url: "userInform/push/informList",
                method: "POST",
                data: {
                    pageNum: that.data.pageNum,
                    pageSize: that.data.pageSize
                },
                success(res) {
                    console.log(res)
                    if (res.code == 0) {
                        that.setData({
                            collegeList:that.data.collegeList.concat(res.data.items),
                            allPages: res.data.pages
                        })
                    }
                }
            })
        } else {
            wx.showToast({
                icon: "none",
                title: '已经到底了',
            })
        }
    }
})