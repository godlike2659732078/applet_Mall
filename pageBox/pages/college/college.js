const app = getApp();
const call = require("../../../utils/request")
Page({
    data: {
        navH: "",
        categoryList: [

        ],
        collegeList: [],
        active: 1,
        detailBox:[]
    },
    onLoad: function () {
        let that = this;
        that.setData({
            navH: app.globalData.navHeight,
        });
        call.postData({
            url: "college/selectCollegeActicleClass",
            method: "POST",
            data: {
                id: ""
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    that.setData({
                        categoryList: res.data.list,
                        active: res.data.list[0].id
                    })
                    call.postData({
                        url: "college/selectCollegeActicle",
                        method: "POST",
                        data: {
                            id: "",
                            classId: res.data.list[0].id,
                        },
                        success(res) {
                            console.log(res)
                            if (res.code == 0) {
                                that.setData({
                                    collegeList: res.data.list
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
    changeClloge(e) {
        let that = this
        console.log(e.detail.index)
        let classId = that.data.categoryList[e.detail.index].id
        call.postData({
            url: 'college/selectCollegeActicle',
            method: 'POST',
            data: {
                id: "",
                classId: classId
            },
            success(res) {
                console.log(res)
                if (res.code == 0) {
                    that.setData({
                        collegeList: res.data.list
                    })
                }
            }
        })

    },
    gotoDetail(e) {
        wx.navigateTo({
            url: '/pages/collegeDetails/collegeDetails?id='+e.currentTarget.dataset.id,
          })
        }

})