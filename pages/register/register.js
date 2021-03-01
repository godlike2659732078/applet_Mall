const app = getApp();
const call = require("../../utils/request")
var CryptoJS = require('../../utils/crypto-js');
Page({
    data: {
        navH: "",
        mobile: "",
        code: "",
        password: "",
        invation: "",
        checked: true,
        show: false,
        time: "获取验证码",
        currentTime: 60,
        disabled: false,
    },
    onLoad: function () {
        let that = this;
        that.setData({
            navH: app.globalData.navHeight,
        });
       
    },
    encrypt(str) {
        let key=CryptoJS.enc.Hex.parse('31323334353637383930313233343132');
        let iv= CryptoJS.enc.Hex.parse('30313233343536373839414243444546');//向量iv
        let phone = CryptoJS.AES.encrypt(str, key,{ iv: iv, mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7 });
        phone=phone.ciphertext.toString();
        return phone;
    },
    getmobile(e) {
        let that = this;
        that.setData({
            mobile: e.detail.value
        })
    },
    // 验证码输入
    getcode(e) {
        let that = this;
        that.setData({
            code: e.detail.value
        })
    },
    // 获取验证码
    getCode() {
        let that = this;
        console.log(111)
        call.postData({
            url: "captcha/index",
            method: 'POST',
            data: {
                phone: this.encrypt(that.data.mobile),
                scene: "SCENE_REGISTER"
            },
            success(res) {
                //请求成功
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
                console.log(res);
            },
        });

    },
    // 修改按钮状态
    getVerificationCode() {
        this.getCodes();
        let that = this
        that.setData({
            disabled: true
        })
    },
    // 获取重置密码框
    getpwd(e) {
        let that = this;
        that.setData({
            password: e.detail.value
        })
    },
    // 邀请码
    getInvitation(e) {
        let that = this;
        that.setData({
            invation: e.detail.value
        })
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
    showPopup() {
        if (!/^1[3456789]\d{9}$/.test(this.data.mobile) || this.data.code == "" || this.data.password == "") {
            wx.showToast({
                icon: "none",
                title: '请按要求正确输入信息',
            })
        } else if (this.data.checked == false) {
            wx.showToast({
                icon: "none",
                title: '请勾选同意条款和条件',
            })
        } else {
            let obj = {
                username: this.data.mobile,
                code: this.data.code,
                password: this.data.password,
                invitation: this.data.invation,
                scene: "SCENE_REGISTER"
            };
            console.log(obj)
            //ajax请求
            call.postData({
                url: "user/register",
                method: 'POST',
                data: {
                    username: this.data.mobile,
                    code: this.data.code,
                    password: this.data.password,
                    invitation: this.data.invation,
                    scene: "SCENE_REGISTER"
                },
                success(res) {
                    //请求成功
                    console.log(res);
                    if (res.data.code == 0) {
                        this.setData({
                            show: true
                        })
                    }
                },
            })
        }
    },
    onClose() {
        this.setData({
            show: false
        })
    },


    onClickLeft: function () {

        wx.navigateBack();
    },
    changeChecked(event) {
        this.setData({
            checked: event.detail,
        });
        console.log(event.detail)
    },
    onChange: function (e) {
        console.log(e.detail)
    },
    goToLogin() {
        wx.navigateTo({
            url: '/pages/login/login',
        })

    },
    goToLogins() {
        console.log(this.data.checked)
    }

})