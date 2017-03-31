'use strict';
angular.module('starter.UtilServices', [])
  .factory('Util',function($http,$ionicPopup, $ionicLoading,$ionicHistory,$log,$ionicModal,$rootScope) {
    var util = {
      transform: function(data) {
        var s = [];
        if (data != null && typeof data === "object") {
          for (var key in data) {
            var value = data[key] == null ? "": data[key];
            if(key == "currentPage"){
              s.push(encodeURIComponent("pageBean.currentPage") + "=" + encodeURIComponent(value));
            }else if(key == "perPageSize"){
              s.push(encodeURIComponent("pageBean.perPageSize") + "=" + encodeURIComponent(value));
            }else{
              s.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
            }
          }
        }
        return s.join("&").replace(/%20/g, "+");
      },
      toast: function(msg){
        $ionicLoading.show({ template: msg, noBackdrop:false , duration: 1000 })
      },
      baseUrl: function(){
        //测试服务器
        //return "http://116.62.48.90:8001/"
		return "http://wx.xykdds.com/"
      },
      hostAddress: function() {
        return util.baseUrl() + "api/"
      },
      webUrl: function(){
        return util.baseUrl() + "qmdb/"
      },
      timeout: function() {
        return 10000;
      },
      timeoutMessage: function() {
        return "连接服务器失败，请重试";
      },
      toUTF8String: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

          var c = string.charCodeAt(n);

          if (c < 128) {
            utftext += String.fromCharCode(c);
          }
          else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }

        }

        return utftext
      },
      md5: function (string) {
        function RotateLeft(lValue, iShiftBits) {
          return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
          var lX4, lY4, lX8, lY8, lResult;
          lX8 = (lX & 0x80000000);
          lY8 = (lY & 0x80000000);
          lX4 = (lX & 0x40000000);
          lY4 = (lY & 0x40000000);
          lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
          if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
          }
          if (lX4 | lY4) {
            if (lResult & 0x40000000) {
              return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
              return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
          } else {
            return (lResult ^ lX8 ^ lY8);
          }
        }

        function F(x, y, z) {
          return (x & y) | ((~x) & z);
        }

        function G(x, y, z) {
          return (x & z) | (y & (~z));
        }

        function H(x, y, z) {
          return (x ^ y ^ z);
        }

        function I(x, y, z) {
          return (y ^ (x | (~z)));
        }

        function FF(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
          return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
          return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
          return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a, b, c, d, x, s, ac) {
          a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
          return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
          var lWordCount;
          var lMessageLength = string.length;
          var lNumberOfWords_temp1 = lMessageLength + 8;
          var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
          var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
          var lWordArray = Array(lNumberOfWords - 1);
          var lBytePosition = 0;
          var lByteCount = 0;
          while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
          }
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4) * 8;
          lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
          lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
          lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
          return lWordArray;
        };

        function WordToHex(lValue) {
          var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
          for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
          }
          return WordToHexValue;
        };

        function Utf8Encode(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";

          for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
              utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
            }

          }

          return utftext;
        };

        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
          AA = a;
          BB = b;
          CC = c;
          DD = d;
          a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
          d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
          c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
          b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
          a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
          d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
          c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
          b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
          a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
          d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
          c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
          b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
          a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
          d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
          c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
          b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
          a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
          d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
          c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
          b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
          a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
          d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
          c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
          b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
          a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
          d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
          c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
          b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
          a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
          d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
          c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
          b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
          a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
          d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
          c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
          b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
          a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
          d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
          c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
          b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
          a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
          d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
          c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
          b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
          a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
          d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
          c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
          b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
          a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
          d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
          c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
          b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
          a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
          d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
          c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
          b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
          a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
          d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
          c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
          b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
          a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
          d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
          c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
          b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
          a = AddUnsigned(a, AA);
          b = AddUnsigned(b, BB);
          c = AddUnsigned(c, CC);
          d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

        return temp.toLowerCase();

      },
      ionicPopupAlert: function(message) {
        var result = $ionicPopup.alert({
          title: '提示信息',
          template: message,
        }).then(function(res) {});
        return result;
      },
      RndNum: function(n) {
        var rnd = "";
        for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
        return rnd;
      },
      showLoading: function(loadingType) {
        var showType;
        switch (loadingType) {
          case 1:
            showType = "<ion-spinner icon='ios'></ion-spinner>";
            break;
          case 2:
            showType = "<ion-spinner icon='bubbles'></ion-spinner>";
            break;
          case 3:
            showType = "<ion-spinner icon='android'></ion-spinner>";
            break;
          case 4:
            showType = "<ion-spinner icon='ios-small'></ion-spinner>";
            break;
          default:
            showType = "<ion-spinner icon='ios'></ion-spinner>";
        }
        $ionicLoading.show({
          template: showType,
        });
      },
      loadingHide :function(){
        $ionicLoading.hide();
      },
      showConfirm :function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Consume Ice Cream',
        template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    },
      isEmptyObject:function(obj){
        for(var n in obj){return false}
        return true;
      },
      request:function(method,url,params,completed){
        if (arguments.length <= 2){
          $log.log("number of parameters is error")
          return
        }
        var argCount = arguments.length
        var _params = {}
        var callback = function(){}
        if (argCount == 3){
          if (typeof arguments[2] === "object"){
            _params = arguments[2]
          }else if(typeof arguments[2] === "function"){
            callback = arguments[2]
          }
        }else if( argCount == 4){
          _params = arguments[2]
          callback = arguments[3]
        }

        var urlStr = util.hostAddress()+url
        console.log("url..",urlStr);
        if (!util.isEmptyObject(_params)){
          urlStr =decodeURIComponent( util.hostAddress()+url +"?" + util.transform(_params));
        }
        var result = $http({
          url: urlStr,
          method: method,
          //data: util.transform(_params),
          //data:_params,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
            "Accept" : "application/json; charset=utf-8",
          },
          timeout: 10000,
        }).success(function(data){
          if (data.res_code == 3){
            util.clearToken()
          }
          callback(data)
        }).error(callback)

        return result
      },
      get: function(url,params,completed){
        if (arguments.length <= 1){
          $log.log("number of parameters is error")
          return
        }
        if(arguments.length == 2){
          return util.request("GET",url,arguments[1])
        }else{
          return util.request("GET",url,params,completed)
        }
      },
      post: function (url,params,completed) {
        if (arguments.length <= 1){
          $log.log("number of parameters is error")
          return
        }
        if(arguments.length == 2){
          return util.request("POST",url,arguments[1])
        }else{
          return util.request("POST",url,params,completed)
        }

      },
      //clearToken: function(){
      //  $rootScope.isLogin = false;
      //  Storage.remove("memberId");
      //  Storage.remove("token");
      //  Storage.remove("memberInfo");
      //},
      showLoginView: function(scope){
        //document.title = '登录';
        //var $body = $('body');
        //var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
        //$iframe.on('load',function() {
        //  setTimeout(function() {
        //    $iframe.off('load').remove();
        //  }, 0);
        //}).appendTo($body);
        //显示登录框
        $ionicModal.fromTemplateUrl('templates/tab-login.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          scope.modal = modal
          scope.modal.show()
        });
        scope.closeModal = function() {
          scope.modal.hide()
        }
      },
      validMobile: function(mobile){
        return /^1[3|4|5|7|8]\d{9}$/.test(mobile)
      }
    }
    return util
  });
