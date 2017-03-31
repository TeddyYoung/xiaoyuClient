angular.module('starter.services', ['starter.UtilServices'])

  .factory('Request', function (Util) {
    return {
      //接口：我要申请代收
      wantToCollectService: function(memberId,remark,cou,address,phone,name,deliverId,trackingNo,collectorId,completed){
        Util.get('wantToCollect',{memberId:memberId,remark:remark,cou:cou,address:address,phone:phone,name:name,deliverId:deliverId,
          trackingNo:trackingNo,collectorId:collectorId},completed)
      },
      //接口：查询快递公司列表
      deliverListService: function(completed){
        Util.get('deliverList',completed)
      },
      //接口：查询我的代收人列表queryOrderList
      myCollectorListService: function(memberId,completed){
        Util.get('myCollectorList',{memberId:memberId},completed)
      },
      //接口：查询订单列表
      queryOrderListService: function(memberId,status,pageNum,memberType,completed){
        if(memberType == 1){
          Util.get('queryOrderList',{memberId:memberId,status:status,pageNum:pageNum},completed)
        }else{
          Util.get('queryOrderList',{collectorId:memberId,status:status,pageNum:pageNum},completed)
        }

      },
      //接口：变更订单状态
      changeOrderStatusService: function(orderId,status,completed){
        Util.get('changeOrderStatus',{orderId:orderId,status:status},completed)
      },
      //接口：获取用户信息
      getMemberInfoService: function(memberId,completed){
        Util.get('getMemberInfo',{memberId:memberId},completed)
      },
      //接口：修改用户信息
      updateMemberService: function(memberId,name,address,phone,completed){
        Util.get('updateMember',{memberId:memberId,name:name,address:address,phone:phone},completed)
      },
      //接口：获取二维码
      myQrCodeService: function(memberId,completed){
        Util.get('myQrCode',{memberId:memberId},completed)
      },
      //接口：会员添加代收人
      addCollectorService: function(memberId,collectorId,completed){
        Util.get('addCollector',{memberId:memberId,collectorId:collectorId},completed)
      },


    }
  });



