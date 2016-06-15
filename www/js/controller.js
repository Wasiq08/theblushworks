angular.module('starter')

.controller('MenuCtrl',function ($http, $scope) {
    
    $scope.categories=[];
    $http.get("http://www.theblushworks.com/api/get_category_index/").then(function(returnData){
        $scope.categories = returnData.data.categories; 
        console.log(returnData);
    },function(err){
        console.log(err);  
    })
    
    
    $scope.recent_posts=[];
    $http.get("http://www.theblushworks.com/api/get_posts/").then(function (data) {
        
        $scope.recent_posts = data.data.posts;
    },function (err) {
         console.log(err);  
    })
    
})


.controller('PostCtrl',function () {
    
})

