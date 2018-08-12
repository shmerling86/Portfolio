app.factory('randomUrlSrv', function ($http, $q, userSrv) {

  function makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


  function addCodeToUserObj(code) {
    var async = $q.defer();

    var URL = 'https://json-server-heroku-kycjbhiagv.now.sh/users/' + userSrv.getActiveUser().id

    var patch = {"code": code}

    $http.patch(URL, patch).then(function (response) {

        async.resolve(response);
      }, function (err) {
        async.reject(err);
      });
    return async.promise;
  };


  return {
    makeId: makeId,
    addCodeToUserObj: addCodeToUserObj
  }

});

