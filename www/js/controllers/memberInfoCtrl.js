angular.module('starter.memberInfoCtrl', ['starter.UtilServices','starter.services','starter.StorageService'])

.controller('memberInfoCtrl', function($scope,Util,Request,$rootScope,$state,Storage) {
    //var memberId = "20170209223118cKUk97kF"
    var memberInfo = Storage.get("memberInfo") ;
    if(memberInfo == null){
      var memberId = $location.search().memberId;
    }else{
      var memberId = memberInfo.memberId;
    }


    $scope.getMemberInfo = function(){//获取个人信息
      Request.getMemberInfoService(memberId,function (data) {
        var code = data.responseCode;
        var msg  = data.responseMessage;
        var obj = data.responseObj;
        if(code == 200){//成功
          $scope.memberInfo = obj;
          $rootScope.current = {
            name:$scope.memberInfo.collectorName,
            address:$scope.memberInfo.address,
            phone:$scope.memberInfo.phone
          }
        }else{
          Util.toast(msg);
        }
      })
    }
    $scope.QrCode = function(){//获取二维码
       Request.myQrCodeService(memberId,function (data) {
        var code = data.responseCode;
        var msg  = data.responseMessage;
        var obj = data.responseObj;
        if(code == 200){//成功
          $scope.myQrCode = obj;
        }else{
          Util.toast(msg);
        }
      })
    }

    $scope.updateMember = function(){//更新个人信息
      var  name = $rootScope.current.name;
      var  address = $rootScope.current.address;
      var  phone = $rootScope.current.phone;
      var reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
      if(reg.test(phone)){
        Request.updateMemberService(memberId,name,address,phone,function (data) {
          var code = data.responseCode;
          var msg  = data.responseMessage;
          var obj = data.responseObj;
          if(code == 200){//成功
            $scope.memberInfo = obj;
            $state.go('tab.memberInfo')
          }else{
            Util.toast(msg);
          }
        })
      }else{
        Util.toast("请输入正确的手机号码")
      }

    }

  $scope.$on('$ionicView.afterEnter',function(){
    $scope.getMemberInfo();
    $scope.QrCode();
  })
})

angular.module('starter.followCollectCtrl', ['starter.UtilServices','starter.services','starter.StorageService'])

  .controller('followCollectCtrl', function($scope,Util,Request,$location,$state,$timeout) {
    var memberId = $location.search().memberId;
    var collectorId = $location.search().collectorId;
    $scope.flag = $location.search().flag;
    //$scope.flag = "0"
    //var memberId = "20170210094152YQ2oT9KP"
    //var collectorId = "20170210094152YQ2oT9KP"


    $scope.getCollectorInfo = function(){//获取代收人信息
      Request.getMemberInfoService(collectorId,function (data) {
        var code = data.responseCode;
        var msg  = data.responseMessage;
        var obj = data.responseObj;
        if(code == 200){//成功
          $scope.collector = obj;
        }else{
          Util.toast(msg);
        }
      })
    }
    $scope.getCollectorInfo();

    $scope.addCollector = function(){//会员添加代收人
      Request.addCollectorService(memberId,collectorId,function (data) {
        var code = data.responseCode;
        var msg  = data.responseMessage;
        var obj = data.responseObj;
        if(code == 200){//成功
          $scope.addCollector = obj;
          Util.toast("关注代收人成功")
          $timeout(function(){
            $state.go('tab.wantToCollect');
          },1000)
        }else{
          Util.toast(msg);
        }
      })
    }

    $scope.goOrder =function(){
      $state.go('tab.wantToCollect')
    }

  })
