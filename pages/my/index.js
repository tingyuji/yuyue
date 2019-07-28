const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo);
    let userInfo = app.globalData.userInfo;
    let nickName = userInfo.nickName;
    console.log(options);
    let _this = this;
    _this.setData({
      id: options.id,
      title: options.title,
      userInfo: app.globalData.userInfo
    });
    wx.login({
      success (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.xiaomutong.com.cn/web/index.php?r=wechat/getinfo',
            method: 'post',
            data: {
              code: res.code
            },
            success (res) {
              console.log(res.data);
              if(res.data && res.data.code == 0){
                let result = JSON.parse(res.data.result);
                console.log(result);
                _this.getOrders(result.openid);
                _this.setData({
                  openid: result.openid
                })
              }
            },
            fail (err){
              console.log(err);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  getOrders: function(openid){
    let _this = this;
    wx.request({
      url: 'https://www.xiaomutong.com.cn/web/index.php?r=orders/getordersbyopenid', //仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        let data = res.data;
        data.result.forEach(element => {
          console.log(element);
          console.log(typeof element.time1)
          let time1 = element.time1;
          let time2 = element.time2;
          console.log(time1.substr(11,5));
          element.time1 = time1.substr(11,5);
          element.time2 = time2.substr(11,5);
        });
        _this.setData({
          orders: data.result
        });
      }
    });
  },
  bindCreateOrder: function(){
    console.log(this.data);
    let _id = this.data.id;
    let _title = this.data.title;

    let url = '/pages/wechat/index?id='+_id +'&title=' +_title;
    wx.navigateTo({
      url: url
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let openid = this.data.openid;
    this.getOrders(openid);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})