const app = getApp();
const call = require("../../utils/request.js");
Page({
    data: {
        navH: "",
        mobile: "",
        code: "",
        show: false,
        rePwd: "",
        rePwds: "",
        nonce: "",
        time: "获取验证码",
        currentTime: 60,
        disabled: false
    },
    phoneBlur(e) {
        console.log()
        if (!/^1[3456789]\d{9}$/.test(e.detail.value)) {
            wx.showToast({
                title: '手机号码格式错误',
                icon: 'none',
            });
            return;
        }
    },
    getMobile(e) {
        let that = this;
        that.setData({
            mobile: e.detail.value
        })
    },
    getCode(e) {
        let that = this;
        that.setData({
            code: e.detail.value
        })
    },

    onClose() {
        this.setData({
            show: false
        })
    },
    // 提交
    formSubmit(e) {
        console.log(e.detail.value)
        let obj = e.detail.value;
        let that = this;
        call.postData({
            url: "password/reset",
            method: "POST",
            data: {
                password: obj.rePwd,
                repeat_password: obj.rePwds,
                nonce: that.data.nonce
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    wx.showToast({
                        icon: "none",
                        title: '修改成功',
                    })
                    that.setData({
                        show: false
                    })
                    wx.navigateTo({
                        url: '/pages/login/login',
                    })
                }else{
                    wx.showToast({
                        icon: "none",
                        title: '修改失败',
                    })
                }
            }
        })
    },
    onLoad: function () {
        this.setData({
            navH: app.globalData.navHeight,
        });
    },
    onClickLeft: function () {
        wx.navigateBack();
    },

    onChange: function (e) {
        console.log(e.detail)
    },

    getCodes() {
        let that = this;
        call.postData({
            url: "captcha/send",
            method: "POST",
            data: {
                phone: that.data.mobile,
                scene: "SCENE_PWD_RESET"
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    wx.showToast({
                        icon: "none",
                        title: "获取成功",
                    })
                    let currentTime = that.data.currentTime
                   let interval = setInterval(function () {
                        currentTime--;
                        that.setData({
                            time: currentTime + 's'
                        })
                        if (currentTime <= 0) {
                            clearInterval(interval)
                            that.setData({
                                time: '重新发送',
                                currentTime: 60,
                                disabled: false
                            })
                        }else{
                            that.setData({
                              disabled: true
                            })
                          }
                    }, 1000)
                } else {
                    wx.showToast({
                        icon: "none",
                        title: res.message,
                    })
                }
            }
        })
    },

    getVerificationCode() {
        this.getCodes();
        let that = this
        that.setData({
            disabled: true
        })
    },
    goToIndex() {
        let that = this;
        call.postData({
            url: "captcha/verify",
            method: "POST",
            data: {
                phone: that.data.mobile,
                scene: "SCENE_PWD_RESET",
                code: that.data.code
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    that.setData({
                        show: true,
                        nonce: res.data.nonce
                    })
                } else {
                    wx.showToast({
                        icon: "none",
                        title: res.message,
                    })
                }
            }
        })
        // that.setData({
        //     show: true
        // })
    },
    goToregister() {
        wx.navigateTo({
            url: '../register/register',
        })
    }

})