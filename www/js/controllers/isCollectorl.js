angular.module('starter.isCollector', ['starter.UtilServices','starter.services','starter.StorageService'])

.controller('isCollectorCtrl', function($scope,Request,Util,$rootScope,$location,Storage,$ionicLoading,$timeout,$state) {
    var memberInfo = Storage.get("memberInfo")
    var memberId = memberInfo.memberId;
    $scope.getCollectorInfo = function(){//获取代收人信息
      Request.getMemberInfoService(memberId,function (data) {
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
  $scope.goAccount = function(){
    $state.go('tab.account');
  }
})
