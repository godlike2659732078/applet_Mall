const app = getApp();
const call = require("../../utils/request")
Page({
    data: {
        navH: "",
        userContent: "",
        userPhone: "",
        headMenuList: [],
        statusNums: "",
        nickname: "",
        showJifen: 0,
        showVote: 0,
        pushNum: null
    },
    onLoad: function () {
        let that = this;
        that.setData({
            navH: app.globalData.navHeight,
        });
        //    console.log(wx.getStorageSync('user'))
        //    获取用户导航
        call.getData({
            url: "rule/getAppletParam",
            success(res) {
                // console.log(res.data)
                if (res.code == 0) {
                    that.setData({
                        showJifen: res.data
                    })
                }
            }
        })
        call.getData({
            url: "coinName/findIfVote",
            success(res) {
                // console.log(res.data)
                if (res.code == 0) {
                    that.setData({
                        showVote: res.data
                    })
                }
            }
        })
        //   查询通知数量
        call.postData_token({
            url: "userInform/push/informNum",
            data: {},
            success(res) {
                // console.log(res)
                if (res.code == 0) {
                    that.setData({
                        pushNum: res.data
                    })
                }
            }
        })
        call.getData({
            url: "nav/appletNav",
            success(res) {
                // console.log(res)
                if (res.code == 0) {
                    let menuList = res.data
                    for (let item in menuList) {
                        menuList[2].path = "../invitation/invitation",
                            menuList[2].title = "邀请好友"
                    }
                    that.setData({
                        headMenuList: menuList
                    })
                } else {
                    wx.showToast({
                        icon: "none",
                        title: '加载出错',
                    })
                }
            }
        })
        //    获取会员列表
        call.getData_token({
            url: "user/info",
            method: "GET",
            success(res) {
                // console.log(res)
                if (res.code == 0) {
                    let reg = /^(\d{3})\d*(\d{4})$/;
                    let str1 = res.data.phone.replace(reg, '$1****$2')
                    // console.log(str1);
                    that.setData({
                        userContent: res.data,
                        userPhone: str1,
                        nickname: res.data.nickname.substring(0, 10)
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/login/login',
                    })
                }

            }
        })
        // 获取订单数量
        call.getData_token({
            url: "order/findAllStatusNum",
            method: "GET",
            success(res) {
                // console.log(res)
                if (res.code == 0) {
                    that.setData({
                        statusNums: res.data
                    })
                } else {
                    wx.showToast({
                        icon: "none",
                        title: '加载失败，请稍后重试',
                    })
                }

            }
        })
    },

    onShow() {
        this.onLoad()
    },
    // 前往消息列表
    gotoPushlist() {
        wx.navigateTo({
            url: '/pages/pushList/pushList',
        })
    },
    // 购买会员
    gotoBuyvip() {
        wx.navigateTo({
            url: '/pages/buyvip/buyvip',
        })
    },
    // 跳转到订单列表
    goToOrders() {
        wx.navigateTo({
            url: '/pages/order/order',
        })
    },

    goToOrderO() {
        wx.navigateTo({
            url: '/pages/order/order?index=' + 1,
        })
    },
    goToOrderT() {
        wx.navigateTo({
            url: '/pages/order/order?index=' + 2,
        })
    },
    goToOrderTh() {
        wx.navigateTo({
            url: '/pages/order/order?index=' + 3,
        })
    },
    goToOrderF() {
        wx.navigateTo({
            url: '/pages/order/order?index=' + 4,
        })
    },
    // 跳转到设置
    goTosettings() {
        wx.navigateTo({
            url: '/pages/account-settings/account-settings',
        })
    },

    // 跳转到积分
    gotomyPoints() {
        wx.navigateTo({
            url: '/pages/myPoints/myPoints',
        })
    },
    // 跳转到邀请
    gotoInvation() {
        wx.navigateTo({
            url: '/pages/invitation/invitation',
        })
    },

    // 卡包
    gotoPaid() {
        wx.navigateTo({
            url: '/pageBox/pages/paid/paid',
        })
    }, // 客服
    gotoCustom() {
        wx.navigateTo({
            url: '/pages/customer/customer',
        })
    },

})