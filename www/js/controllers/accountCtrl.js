angular.module('starter.accountCtrl', ['starter.UtilServices','starter.services','starter.StorageService'])
.controller('accountCtrl', function($scope,Request,Util,$ionicScrollDelegate,$location,Storage,$ionicPopup,$state) {
      //0-申请中
      //1-商家确认
      //2-已代收
      //3-会员确认
    $scope.memberInfo = Storage.get("memberInfo");;
      var memberId = $scope.memberInfo.memberId ;
      $scope.memberType = $scope.memberInfo.memberType;
      $scope.pageNum = 1;
      $scope.status = "-3";  //3:已签收   -3：未签收
      //$scope.collectorId =""
      $scope.slectStatus = function(status){
        $ionicScrollDelegate.scrollTop();
        if(status == -3){
           $(".title_center:nth-child(1)").addClass("redColor");
           $(".title_center").not(".title_center:nth-child(1)").removeClass("redColor") ;
        }else if(status == 3) {
          $(".title_center:nth-child(2)").addClass("redColor");
          $(".title_center").not(".title_center:nth-child(2)").removeClass("redColor") ;
        }else{
          $(".title_center:nth-child(3)").addClass("redColor");
          $(".title_center").not(".title_center:nth-child(3)").removeClass("redColor") ;
        }
        $scope.status = status;
        $scope.queryOrderList()    ;
      }
      $scope.queryOrderList = function(){//查询订单列表
        //$scope.$broadcast('scroll.refreshComplete');
        Request.queryOrderListService(memberId,$scope.status,$scope.pageNum,$scope.memberType,function (data) {
          var code = data.responseCode;
          var msg  = data.responseMessage;
          var obj = data.responseObj;
          if(code == 200){//成功
            var orderList = obj.records;
            if ($scope.pageNum == 1){
              $scope.orderList = orderList;
            }else {
              $scope.orderList.append(orderList)
            }
          }else{
            Util.toast(msg);
          }

          $scope.$broadcast('scroll.infiniteScrollComplete')
          if($scope.orderList.length < $scope.pageNum * 15){
            $scope.showLoading = false
            $scope.enableScrollable = false
          }else{
            $scope.showLoading = true
            $scope.enableScrollable = true
          }
        })
      }
  $scope.$on('$ionicView.beforeEnter',function(){
    $scope.queryOrderList();
  })

  $scope.loadMoreGoodsList = function () {//加载更多
    $scope.pageNum =$scope.pageNum + 1;
    $scope.queryOrderList();
  }
    //下拉刷新
    $scope.refreshData = function(){
      $scope.pageNum = 1;
      $scope.queryOrderList();
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.changeOrderStatus = function(orderId,status,mess){//变更订单状态
      var confirmPopup = $ionicPopup.confirm({
        //title: '小鱼代收',
        template: '<div style="text-align: center;font-size: 18px;position: absolute;left: 0; ' +
        'right: 0;top: 20px;padding-left: 10px;padding-right:10px">'+mess+'</div>',
        buttons: [
          { text: '确认' ,
            type: 'okbtn',
            onTap: function(e){
              Request.changeOrderStatusService(orderId,status,function (data) {
                var code = data.responseCode;
                var msg  = data.responseMessage;
                var obj = data.responseObj;
                if(code == 200){//成功
                  $scope.queryOrderList();
                }else{
                  Util.toast(msg);
                }
              })
            }
          },
          {
            text: '取消',
            type: 'errBtn',
            onTap: function(e){
            }
          },
        ]
      });

    }
  $scope.tipTop = function(mess){
    Util.toast(mess)
  }
})
