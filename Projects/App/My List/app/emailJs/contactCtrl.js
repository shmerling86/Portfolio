app.controller('contactCtrl', function ($scope) {


    $scope.template_params = {
        reply_to: "",
        from_name: "",
        from_email: "",
        message_html: ""
    }

    var service_id = "default_service";
    var template_id = "template_dlc0Ty6L";
    $scope.sendEmail = function () {
        emailjs.send(service_id, template_id, $scope.template_params);
        alert("Mail sent!");
        $scope.template_params = {
            reply_to: "",
            from_name: "",
            from_email: "",
            message_html: ""
        }
    }


});