const app = getApp();
const call = require("../../utils/request")
import WxParse from '../../wxParse/wxParse.js';
Page({
    data: {
        navH: "",
        boxHeight: 0,
        detailBox:[]
    },
    getGoods(e) {
        console.log(e)
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
        let id = options.id
        console.log(id)
        call.postData({
            url: 'college/selectCollegeActicle',
            method: 'POST',
            data: {
                id: id,
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    that.setData({
                        detailBox: res.data.list
                    })
                    WxParse.wxParse('particulars', 'html', that.data.detailBox[0].particulars, that, 0);
                }
            }
        })
    },

    onClickLeft: function () {
        wx.navigateBack();
    },



})