const app = getApp();
const call = require("../../utils/request.js");
Page({
    data: {
        navH: "",
        mobile: "",
        password: "",
        getinput: "",
    },
    getmobile(e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    getpwd(e) {
        this.setData({
            password: e.detail.value
        })
    },
    onLoad: function () {
        this.setData({
            navH: app.globalData.navHeight,
        });
    },
    onClickLeft: function () {
       wx.reLaunch({
         url: '../index/index',
       })
    },
    phoneBlur(e) {
        if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
            wx.showToast({
                title: '联系人电话格式错误',
                icon: 'none',
            });
            return;
        }
    },
    goToLose() {
        wx.navigateTo({
            url: '../losepwd/losepwd',
        })
    },
    goToRegister() {
        wx.navigateTo({
            url: '../register/register',
        })
    },
    goToIndex() {
        let that = this
        wx.showLoading({
          title: '登录中，请稍等',
          duration:1500
        })
        wx.login({
            success(res) {
                console.log(res)
                if (res.code) {
                    let code = res.code
                    call.postData({
                        url: 'weixin/getAppletOpenId',
                        method: 'POST',
                        data: {
                            code: code
                        },
                        success(res) {
                            console.log(res)
                            call.postData({
                                url: 'user/wxAppletLogin',
                                method: 'POST',
                                data: {
                                    username: that.data.mobile,
                                    password: that.data.password,
                                    openid: res.data.openid
                                },
                                success(res) {
                                    console.log(res)
                                    if (res.code != 0) {
                                        wx.showToast({
                                            icon: "none",
                                            title: res.message,
                                        })
                                    } else {
                                        wx.setStorageSync('user', res.data.accessToken)
                                        wx.setStorageSync('userId', res.data.uid)
                                        wx.showToast({
                                            icon: "none",
                                            title: "登录成功",
                                            duration: 500
                                        })
                                        wx.reLaunch({
                                            url: '/pages/index/index',
                                        })
                                    }
                                }
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        icon:"none",
                      title: '登录失败！' + res.errMsg,
                    })
                    
                }
            }
        })
        
    }
})