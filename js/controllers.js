/** *************Angular controller JS*********************/
"use strict"; 
app.controller('NotifyController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(notifyform, e) {
		e.preventDefault();
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (notifyform.$valid) {
            $http({
                method  : 'POST',
                url     : 'notify-me.php',
                data    : $('[name="' + notifyform.$name + '"]').serialize(),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = false;
		            $scope.formData = null;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
					$scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Ingresa una dirección de correo válida.';
            $scope.result='bg-danger';
        }
    }
});