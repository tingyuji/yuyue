// pages/orders/index.js
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
    console.log(options);
    let _this = this;
    _this.setData({
      id: options.id,
      title: options.title
    });
    wx.request({
      url: 'https://www.xiaomutong.com.cn/web/index.php?r=orders/getorders', //仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        projectid: options.id
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

  },
  bindHome: function(){
    let url = '/pages/info/index';
    wx.switchTab({
      url: url
    })
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