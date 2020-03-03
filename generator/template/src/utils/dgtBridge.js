/* eslint-disable */
//! DGTBridge.js
//! Authors : Dalsen Chung
//! Created At 2019年11月12日11:02:14

(function (factory) {
  typeof window === 'object' ? window.DGTBridge = factory() : global.DGTBridge = factory()
})(function () {
  'use strict';
  var Bridge = function () {
    this.messageHandlers = {};
    this.responseCallbacks = {};
    this.ua = (function (u) {
      return {
        isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //Android
        isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //Ios
      }
    })(navigator.userAgent)
  }
  Bridge.prototype.invoke = function (handlerName, param, callback) {
    var msgHandler = this.messageHandlers[handlerName];
    if (!msgHandler) throw new Error('Function: ' + handlerName + ' is not registered');
    this.messageHandlers[handlerName](param, handlerName);
    var notifyName = handlerName + 'Notify';
    this.responseCallbacks[notifyName] = callback;
  }
  Bridge.prototype.register = function (handlerName, handler) {
    var msgHandler = this.messageHandlers[handlerName];
    if (msgHandler) throw new Error('This handler has already been registered');
    this.messageHandlers[handlerName] = handler;
  }
  Bridge.prototype.notify = function (callbackName, data) {
    var respHandler = this.responseCallbacks[callbackName];
    if (!respHandler) throw new Error('Callback function: ' + callbackName + ' is not registered');
    this.responseCallbacks[callbackName](data);
  }

  var paramDetect = function (funcName, keyList, param) { //  检测调用方法时传入的参数
    if (!(keyList instanceof Array)) throw new Error('variable keyList must be an Array');
    keyList.forEach(function (key) {
      var detectRes = param.hasOwnProperty(key)
      if (!detectRes) throw new Error('Function [' + funcName + '] missing parameter: ' + key);
    });
  }

  var dgtBridge = new Bridge();
  var ua = dgtBridge.ua;

  /**
   * 无感支付扣款-调用Native支付功能
   */
  dgtBridge.register('NonInductivePay', function (param, funcName) {
    var paramKeyList = [ //..定义该方法传入的参数对象所需要的属性
      'app_id', //..应用ID
      'pre_order_no', //..预下单订单号
      'pay_amount', //..支付金额
      'scene_type', //..支付场景
      'sign' //..签名
    ];
    paramDetect(funcName, paramKeyList, param); //..检测param是否缺少参数
    var baseParam = { //  基础参数
      domain: window.location.host,
      notifyName: funcName + 'Notify'
    };
    var realParam = Object.assign(baseParam, param);
    console.log(realParam);
    try {
      if (ua.isAndroid) {
        window.JsPayInterface.toPay(JSON.stringify(realParam));
      } else if (ua.isiOS) {
        window.webkit.messageHandlers.toPay.postMessage(realParam);
      } else {
        throw new Error('非Native环境');
      }
    } catch (error) {
      console.error(error);
      console.error('调用Native方法失败');
    }
  });

  /**
   * 调用无感支付签约及选择扣款顺序原生页面
   */
  dgtBridge.register('SignAutoPay', function (param, funcName) {
    var paramKeyList = []; //..定义该方法传入的参数对象所需要的属性
    paramDetect(funcName, paramKeyList, param); //..检测param是否缺少参数
    var baseParam = { //  基础参数
      notifyName: funcName + 'Notify'
    };
    var realParam = Object.assign(baseParam, param);
    console.log(realParam);
    try {
      if (ua.isAndroid) {
        window.JsPayInterface.openNonInductivePay(JSON.stringify(realParam))
      } else if (ua.isiOS) {
        window.webkit.messageHandlers.toPay.postMessage(realParam);
      } else {
        throw new Error('非Native环境');
      }
    } catch (error) {
      console.error(error);
      console.error('调用Native方法失败');
    }
  });

  /**
   * 在H5中调用原生扫一扫功能
   */
  dgtBridge.register('CallNativeScan', function (param) {
    try {
      if (ua.isAndroid) {
        window.JsPayInterface.navigationScan(JSON.stringify(param))
      } else if (ua.isiOS) {
        window.webkit.messageHandlers.toPay.postMessage(param);
      } else {
        throw new Error('非Native环境');
      }
    } catch (error) {
      console.error(error);
      console.error('调用Native方法失败');
    }
  });

  /**
   * 优惠券支付-调用Native支付功能
   */
  dgtBridge.register('CouponPay', function (param, funcName) {
    var paramKeyList = [ //..定义该方法传入的参数对象所需要的属性
      'app_id', //..应用ID
      'pre_order_no', //..预下单订单号
      'pay_amount', //..支付金额
      'scene_type', //..支付场景
      'sign' //..签名
    ];
    paramDetect(funcName, paramKeyList, param); //..检测param是否缺少参数
    var baseParam = { //  基础参数
      notifyName: funcName + 'Notify'
    };
    var realParam = Object.assign(baseParam, param);
    try {
      if (ua.isAndroid) {
        window.JsPayInterface.toPay(JSON.stringify(realParam));
      } else if (ua.isiOS) {
        window.webkit.messageHandlers.toPay.postMessage(realParam);
      } else {
        throw new Error('非Native环境');
      }
    } catch (error) {
      console.error(error);
      console.error('调用Native方法失败');
    }
  });

  /**
   * 关闭webview
   */
  dgtBridge.register('CloseWebView', function () {
    try {
      if (ua.isAndroid) {
        window.JsPayInterface.finish();
      } else if (ua.isiOS) {
        window.webkit.messageHandlers.closeWebView.postMessage({});
      } else {
        throw new Error('非Native环境');
      }
    } catch (error) {
      console.error(error);
      console.error('调用Native方法失败');
    }
  })

  return dgtBridge;
});