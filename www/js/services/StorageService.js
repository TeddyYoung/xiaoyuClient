/**
 * Created by pig33 on 15-11-26.
 */
'use strict';

angular.module('starter.StorageService',[])

  .factory('Storage', function($log) {

    return {
      set: function(key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      get: function(key) {
        return window.JSON.parse(window.localStorage.getItem(key));
      },
      remove: function(key) {
        return window.localStorage.removeItem(key);
      }
    };

  });
