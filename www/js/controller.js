angular.module('starter')

.controller('MenuCtrl',function ($http, $scope ,$sce ,$ionicScrollDelegate) {
    
    $scope.categories=[];
    $scope.count_total = 1 ;
    $scope.offset = 0 ; 
    
    $http.get("http://www.theblushworks.com/api/get_category_index/").then(function(returnData){
        $scope.categories = returnData.data.categories; 
        console.log(returnData);
    },function(err){
        console.log(err);  
    })
    
    
   $scope.doRefresh = function(){
    
    $scope.recent_posts=[];
    $http.get("http://www.theblushworks.com/api/get_posts/").then(function (data) {
        
        $scope.recent_posts = data.data.posts;
        $scope.count_total = data.data.count_total; 
        $scope.recent_posts.forEach(function(elem , index , array){
         elem.excerpt = elem.excerpt.substr(0,70);
         elem.excerpt = elem.excerpt + "...Read More";
         elem.excerpt = $sce.trustAsHtml(elem.excerpt);
        })
            
        
        $scope.$broadcast('scroll.refreshComplete');
        
        
    },function (err) {
         console.log(err);  
    })   
       
       
   }
   
   
   
    
    $scope.recent_posts=[];
    $http.get("http://www.theblushworks.com/api/get_posts/").then(function (data) {
        
        $scope.recent_posts = data.data.posts;
        $scope.count_total = data.data.count_total; 
        $scope.recent_posts.forEach(function(elem , index , array){
         elem.excerpt = elem.excerpt.substr(0,100);
         elem.excerpt = elem.excerpt + "...Read More";
         elem.excerpt = $sce.trustAsHtml(elem.excerpt);
        })
            
        
        $scope.$broadcast('scroll.refreshComplete');
        
        
    },function (err) {
         console.log(err);  
    })   
   
 
    
    $scope.canLoadMore = function(){
        return true;
    }
    
    $scope.timer =  new Date().getTime();
    $scope.lastTimer = new Date().getTime();
    
    $scope.loadMore = function(){
    
          $scope.timer =  new Date().getTime();
            
            $http.get("http://www.theblushworks.com/api/get_posts/?offset="+$scope.offset).then(function (data) {
            var newPosts = data.data.posts;
            $scope.count_total = data.data.count_total; 
         
                 
                    newPosts.forEach(function(elem , index , array){
                    elem.excerpt = elem.excerpt.substr(0,100);
                    elem.excerpt = elem.excerpt + "...Read More";
                    elem.excerpt = $sce.trustAsHtml(elem.excerpt);
                    })
                                
                  $scope.recent_posts.push.apply($scope.recent_posts , newPosts);
                  $scope.$broadcast('scroll.infiniteScrollComplete');     
                  $scope.offset +=10;  
    
        });
            
    }
    
    
    $scope.searchTextChanged = function(){
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);
    }

    
    
    
})

.controller('PostCtrl',function () { 
   
            $http.get('http://www.theblushworks.com/api/get_post/?id='+$stateParams.postId).then(function (data) {
                $scope.postTitle = data.data.post.title ;
               
            },function(err){
                
                
                
            })
    
     
})

