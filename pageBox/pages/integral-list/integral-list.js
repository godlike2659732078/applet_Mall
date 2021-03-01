const app = getApp();
const call = require("../../../utils/request")
Page({
    data: {
        navH: "",
        boxHeight: 0,
        categoryList: [],
        pageItems: [],
        active: null,
        pageNum: 1,
        pages: null
    },
   
    onLoad: function () {
        let that = this
        that.setData({
            navH: app.globalData.navHeight,
        });
        let res = wx.getSystemInfoSync();
        let boxHeight = res.windowHeight-res.windowHeight*0.18;
        that.setData({
            'boxHeight': 2 * boxHeight
        });
        call.getData({
            url: 'exchange/category',
            method: 'GET',
            success(res) {
              console.log(res);
                let id = res.data[0].id
                if (res.code == 0) {
                    console.log(id)
                    that.setData({
                        categoryList: res.data
                    })
                    call.getData({
                        url: 'exchange/exchangeGoods' + '?pageNum=' + that.data.pageNum + '&pageSize=' +8 + '&classId='+ 62 +"&type="+"latest",
                        method: 'GET',
                        success(res) {
                        console.log(res)
                            if (res.code == 0) {
                                that.setData({
                                    pageItems: res.data.list,
                                    active: id,
                                    pages: res.data.total,
                                })
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
    getGoods(e) {
        let that = this
        that.setData({
            pageItems: "",
            pageNum: 1
        })
        let classId = that.data.categoryList[e.detail.index].id
        console.log(classId)
        call.getData({
          url: 'exchange/exchangeGoods' + '?pageNum=' + that.data.pageNum + '&pageSize=' + 8 + '&classId='+classId+"&type="+"latest",
            method: 'GET',
            success(res) {
              console.log(res)
                if (res.code == 0) {
                    that.setData({
                        pageItems: res.data.list,
                        pages: res.data.total,
                        active: classId
                    })
                }
            }
        })
    },
    loadMore() {
        let that = this;
        // console.log(that.data.pages)
        let pageNum = that.data.pageNum
        pageNum++;
        that.setData({
            pageNum: pageNum
        })
        // console.log(pageNum)
        if (pageNum <= that.data.pages) {
            call.getData({
                url: 'exchange/exchangeGoods' + '?pageNum=' + that.data.pageNum + '&pageSize=' + 8 + '&classId=' + that.data.active+"&type="+"latest",
                method: "GET",
                success(res) {
                    // console.log(res);

                    if (res.data.total == pageNum) {
                        that.setData({
                            pageNum: pageNum,
                            pageItems: that.data.pageItems.concat(res.data.list),
                        })

                    } else {
                        wx.showLoading({
                            title: '玩命加载中',
                            duration: 100
                        })
                        that.setData({
                            pageNum: pageNum,
                            pageItems: that.data.pageItems.concat(res.data.list),
                        })
                    }
                }
            });
        } else {
            wx.showToast({
                icon: "none",
                title: '已经到底了',
                duration: 500
            })
        }
        // 显示加载图标

    },
    goDetail: function (e) {
        let item = e.currentTarget.dataset.items;
        wx.navigateTo({
            url: '/pages/int-details/int-details?id=' + item.id,
        })
    },
})