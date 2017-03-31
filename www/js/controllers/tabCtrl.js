angular.module('starter.tabCtrl', ['starter.UtilServices','starter.services','starter.StorageService'])

.controller('tabCtrl', function($scope,Request,Util,$rootScope,$location,Storage,$state) {
  //var memberInfo = Storage.get("memberInfo");;
  //if(memberInfo == null){
  //
  //}else{
  //  $scope.memberType = memberInfo.memberType ;
  //}
  //var memberInfo = Storage.get("memberInfo");;
  //var memberId = memberInfo.memberId ;
  $scope.$watch("memberId",function(newValue,oldValue,scope) {
    var headImg = $location.search().headImg;
    var memberType = $location.search().memberType;//1:普通会员 0:代收人
    var memberNo = $location.search().memberNo;
    var nickName = $location.search().nickName;
    var memberId = $location.search().memberId;
    if(headImg != undefined){
      //普通会员
      //$scope.memberInfo = {"memberId":"20170218231931k0whlP1K","nickName":"杨杰灿","memberNo":"ID0001013","memberType":"1","headImg":"http://wx.qlogo.cn/mmopen/zXnHQxEJqTOUrTMNyVArxqzG0ymBL2Ytu9SqE6wVN591JwPA5HMe8TGSTIcBUkibRPNnpcOibmVCqUxMEBABqStLNsubzA4VaV/0"}
      //代收人
      //$scope.memberInfo = {"memberId":"20170218220301EVJjy0VF","nickName":"teddy","memberNo":"ID0001013","memberType":"0","headImg":"http://wx.qlogo.cn/mmopen/zXnHQxEJqTOUrTMNyVArxqzG0ymBL2Ytu9SqE6wVN591JwPA5HMe8TGSTIcBUkibRPNnpcOibmVCqUxMEBABqStLNsubzA4VaV/0"}
      $scope.memberInfo = {
        "memberId":memberId,"nickName":nickName,"memberNo":memberNo,"memberType":memberType,"headImg":headImg
      }
      Storage.set("memberInfo",$scope.memberInfo);
      var memberInfo = Storage.get("memberInfo");;
      var memberId = memberInfo.memberId ;
      $scope.memberType = memberInfo.memberType;
      if($scope.memberType == 0){
        var urlType = $location.search().urlType;
        if(urlType == 1){
          $state.go("tab.isCollector");
        }
        //location.href=""

      }
    }



  }, true);

    $scope.goAccount = function () {
         $state.go('tab.account') ;
    }
    $scope.goWantToCollect = function () {
      $state.go('tab.wantToCollect') ;
    }
    $scope.goMemberInfo = function(){
      $state.go('tab.memberInfo')  ;
    }

})
