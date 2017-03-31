// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.memberInfoCtrl',
  'starter.services',
  'starter.wantToCollectCtrl',
  'starter.accountCtrl' ,
  'starter.tabCtrl',
  'starter.followCollectCtrl' ,
  'starter.hideTabs',
  'starter.isCollector'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js   tabCtrl.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html' ,
    controller: 'tabCtrl'
  })

  // Each tab has its own nav history stack:
    //我要申请代收
  .state('tab.wantToCollect', {
    url: '/wantToCollect',
    views: {
      'tab-wantToCollect': {
        templateUrl: 'templates/tab-wantToCollect.html',
        controller: 'wantToCollectCtrl'
      }
    }
  })
  //我是代收人
    .state('tab.isCollector', {
      url: '/isCollector',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-isCollector.html',
          controller: 'isCollectorCtrl'
        }
      }
    })
    //会员中心
  .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'accountCtrl'
        }
      }
    })

  //资料管理
  .state('tab.memberInfo', {
    url: '/memberInfo',
    views: {
      'tab-memberInfo': {
        templateUrl: 'templates/tab-memberInfo.html',
        controller: 'memberInfoCtrl'
      }
    }
  })
    //修改个人信息
    .state('tab.updateMember', {
      url: '/memberInfo/updateMember',
      views: {
        'tab-memberInfo': {
          templateUrl: 'templates/tab-updateMember.html',
          controller: 'memberInfoCtrl'
        }
      }
    })



    //关注代收人
    .state('tab.followCollect', {
      url: '/followCollect',
      views: {
        'tab-memberInfo': {
          templateUrl: 'templates/tab-followCollect.html',
          controller: 'followCollectCtrl'
        }
      }
    })



        // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/account');

});
