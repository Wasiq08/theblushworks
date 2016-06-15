angular.module('starter')

.controller('MenuCtrl',function ($http,$scope) {
    
    $scope.categories=[];
    $http.get("http://www.theblushworks.com/api/get_category_index/").then(function(returnData){
        $scope.categories = returnData.data.categories; 
        console.log(returnData);
    },function(err){
        console.log(err);
        
        
    })
    
})


.controller('PostCtrl',function () {
    
})

