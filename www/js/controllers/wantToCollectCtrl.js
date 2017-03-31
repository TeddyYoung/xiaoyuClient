angular.module('starter.wantToCollectCtrl', ['starter.UtilServices','starter.services','starter.StorageService'])

.controller('wantToCollectCtrl', function($scope,Request,Util,$rootScope,$location,Storage,$ionicLoading,$timeout,$state) {
        $scope.$on('$ionicView.beforeEnter',function(){
          $scope.deliverList();
          $scope.myCollectorList();
        })
      var memberInfo = Storage.get("memberInfo") ;
      if(memberInfo == null){
        var memberId = $location.search().memberId;
        var memberType = $location.search().memberType;
      }else{
        var memberId = memberInfo.memberId;
        var memberType = memberInfo.memberType;
      }


      $scope.getCollectorInfo = function(){//获取代收人信息
        Request.getMemberInfoService(memberId,function (data) {
          var code = data.responseCode;
          var msg  = data.responseMessage;
          var obj = data.responseObj;
          if(code == 200){//成功
            $scope.collector = obj;
            $scope.curr = {
              phone: $scope.collector.phone,//电话号码
              name: $scope.collector.collectorName, //收件人姓名
              address:$scope.collector.address,
              trackingNo: '', //快件单号（非必填）
              cou:'1',
              remark:''
            }
          }else{
            Util.toast(msg);
          }
        })
      }
  $scope.$on('$ionicView.enter',function(){
    $scope.getCollectorInfo();
    $rootScope.deliverId="";
    $rootScope.collectorId="";
    $("#deliver").show();
    $("#remark").hide();
  })

      $("#deliver").change(function(){
        $rootScope.deliverId = $("#deliver").val();
        //alert( $rootScope.deliverId)
        if($rootScope.deliverId == "000"){
          $("#deliver").hide();
          $("#remark").show();
        }

      })
      $("#collector").change(function(){
        $rootScope.collectorId = $("#collector").val();
      })
      $("#cou").change(function(){
        $rootScope.cou = $("#cou").val();
      })
    $scope.deliverList = function(){//查询快递公司列表
          Request.deliverListService(function (data) {
            var code = data.responseCode;
            var msg  = data.responseMessage;
            var obj = data.responseObj;
            if(code == 200){//成功
              $scope.delivers = obj;
            }else{
              Util.toast(msg);
            }
          })
        }
        //var memberId = '20170209223118cKUk97kF'


        //var memberId = memberInfo.memberId;
        $scope.myCollectorList = function(){//查询我的代收人列表
          Request.myCollectorListService(memberId,function (data) {
            var code = data.responseCode;
            var msg  = data.responseMessage;
            var obj = data.responseObj;
            if(code == 200){//成功
              $scope.myCollectorLists = obj;
            }else{
              Util.toast(msg);
            }
          })
        }

        $scope.checkInput = function(phone,name,trackingNo,address,cou,remark){
          $scope.phone = phone;
          $scope.name = name;
          $scope.trackingNo = trackingNo;
          $scope.address = address;
          $rootScope.cou = cou;
          $scope.remark = remark;
          if($scope.phone!= ""){
            if($scope.name != ""){
              if($rootScope.deliverId != undefined){
                if($rootScope.deliverId !=""){
                  if($rootScope.collectorId != undefined){
                    if($rootScope.collectorId != ""){
                      Request.wantToCollectService(memberId,$scope.remark,$rootScope.cou,$scope.address,$scope.phone,$scope.name,$rootScope.deliverId,$scope.trackingNo,$rootScope.collectorId,function(data){
                        var code = data.responseCode;
                        var msg  = data.responseMessage;
                        var obj = data.responseObj;
                        if(code == 200){
                          $ionicLoading.show({ template: msg, noBackdrop:false , duration: 1000 });
                          $timeout(function(){
                            $state.go('tab.account');
                          },1000)
                        }else{
                          //请求失败
                          Util.toast("请求失败");
                          //$state.go('tab.account');
                          //})
                        }
                      })
                    }else{
                      Util.toast("请选择代收人！")
                    }

                  }else{
                    Util.toast("请选择代收人！")
                  }
                }else{
                  Util.toast("请选择快递公司")
                }

              }else{
                Util.toast("请选择快递公司")
              }

            }else{
              Util.toast("请填写收件人姓名");
            }
          }else{
            Util.toast("请填写联系电话");
          }
        }
        $scope.queryGoodsCatList = function(){//我要代收
          $scope.phone = $scope.curr.phone;
          $scope.name = $scope.curr.name;
          $scope.trackingNo = $scope.curr.trackingNo;
          $scope.address = $scope.curr.address;
          $rootScope.cou = $scope.curr.cou;
          $scope.remark = $scope.curr.remark;
          if($rootScope.deliverId == "000"){//其他快递
            if($scope.remark.length<=6){
                $scope.checkInput($scope.phone,$scope.name,$scope.trackingNo,$scope.address,$rootScope.cou,$scope.remark)
            }else{
              Util.toast("请输入正确快递公司")
            }
          }else{
            $scope.checkInput($scope.phone,$scope.name,$scope.trackingNo,$scope.address,$rootScope.cou,$scope.remark)
          }




  }

})
