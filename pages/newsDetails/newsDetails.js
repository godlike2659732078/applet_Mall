const app = getApp();
const call = require("../../utils/request")
import WxParse from '../../wxParse/wxParse.js';
Page({
    data: {
        navH: "",
        boxHeight: 0,
        details: "",
        articleId: "",

    },

    onLoad: function (options) {
        let that = this
        that.setData({
            navH: app.globalData.navHeight,
        });
        let res = wx.getSystemInfoSync();
        let boxHeight = res.windowHeight - res.windowHeight * 0.18;
        that.setData({
            'boxHeight': 2 * boxHeight,
            articleId: options.id
        });
        let id = options.id
        // console.log(id)
        call.getData({
            url: "discover/view?id=" + id,
            method: "GET",
            success(res) {
                // console.log(res)
                // if(res.code==0){
                that.setData({
                    details: res.data
                })
                WxParse.wxParse('content', 'html', that.data.details.content, that, 0);
                // }
            }
        })
    },

    onClickLeft: function () {
        wx.navigateBack();
    },

    lower() {
        let that = this;
        let userId = wx.getStorageSync('userId')
        console.log(userId)
        if (userId) {
            call.postData({
                url: "exchange/award",
                data: {
                    userId: userId,
                    articleId: that.data.articleId
                },
                success(res) {
                    console.log(res)
                    if (res.message == "免费领取已到期") {
                        return;
                    } else {
                        wx.showToast({
                            title: res.data,
                            icon: "none"
                        })
                    }

                }
            })
        }

    }


})