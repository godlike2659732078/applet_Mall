const app = getApp();
const call = require("../../utils/request")
import WxParse from '../../wxParse/wxParse.js';
Page({
    data: {
        navH: "",
        boxHeight: 0,
        details: ""
    },

    onLoad: function (options) {
        let that = this
        that.setData({
            navH: app.globalData.navHeight,
        });
        let res = wx.getSystemInfoSync();
        let boxHeight = res.windowHeight - res.windowHeight * 0.18;
        that.setData({
            'boxHeight': 2 * boxHeight
        });
        let uuid = options.uuid
        // console.log(uuid)
        call.getData({
            url: "notice/view?id=" + uuid,
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



})