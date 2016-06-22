angular.module('starter')

    .controller('MainCtrl', function ($http, $scope, $sce, $ionicScrollDelegate, $localStorage) {

        $scope.doRefresh = function () {

            $scope.recent_posts = [];
            $http.get("http://www.theblushworks.com/api/get_posts/").then(function (data) {

                $scope.recent_posts = data.data.posts;
                $scope.count_total = data.data.count_total;
                $scope.recent_posts.forEach(function (elem, index, array) {
                    elem.excerpt = elem.excerpt.substr(0, 70);
                    elem.excerpt = elem.excerpt + "...Read More";
                    elem.excerpt = $sce.trustAsHtml(elem.excerpt);
                    if ($scope.Favorites.indexOf(elem.id) != -1)
                        elem.isFavorite = true;
                    else
                        elem.isFavorite = false;
                })

                $scope.$broadcast('scroll.refreshComplete');

            }, function (err) {
                console.log(err);
            })
        }

        $scope.Favorites = $localStorage.Favorites;

        if (!$scope.Favorites)
            $scope.Favorites = [];


        $scope.recent_posts = [];
        $http.get("http://www.theblushworks.com/api/get_posts/").then(function (data) {

            $scope.recent_posts = data.data.posts;
            $scope.count_total = data.data.count_total;
            $scope.recent_posts.forEach(function (elem, index, array) {
                elem.excerpt = elem.excerpt.substr(0, 100);
                elem.excerpt = elem.excerpt + "...Read More";
                elem.excerpt = $sce.trustAsHtml(elem.excerpt);

            })

            $scope.$broadcast('scroll.refreshComplete');

        }, function (err) {
            console.log(err);
        })



        $scope.canLoadMore = function () {
            return true;
        }

        $scope.timer = new Date().getTime();
        $scope.lastTimer = new Date().getTime();

        $scope.loadMore = function () {

            $scope.timer = new Date().getTime();

            $http.get("http://www.theblushworks.com/api/get_posts/?offset=" + $scope.offset).then(function (data) {
                var newPosts = data.data.posts;
                $scope.count_total = data.data.count_total;


                newPosts.forEach(function (elem, index, array) {
                    elem.excerpt = elem.excerpt.substr(0, 100);
                    elem.excerpt = elem.excerpt + "...Read More";
                    elem.excerpt = $sce.trustAsHtml(elem.excerpt);
                })

                $scope.recent_posts.push.apply($scope.recent_posts, newPosts);
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.offset += 10;

            });

        }


        $scope.searchTextChanged = function () {
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);
        }


        $scope.toggleFavorite = function (post) {
            console.log("POST", post);
            post.isFavorite = !post.isFavorite;

            if (post.isFavorite == true) {
                $scope.Favorites.push(post.id);
            } else {
                $scope.Favorites.forEach(function (e, i, a) {
                    if (e == post.id) {
                        $scope.Favorites.splice(i, 1);
                        console.log("SPLICE", i);
                    }

                })
            }

            $localStorage.Favorites = $scope.Favorites;
            console.log("FAV", $scope.Favorites);


        }
        
    })
    
    
      .controller('MenuCtrl', function ($http, $scope, $sce, $ionicScrollDelegate, $localStorage) {
  
       $scope.categories = [];
        $scope.count_total = 1;
        $scope.offset = 0;

        $http.get("http://www.theblushworks.com/api/get_category_index/").then(function (returnData) {
            $scope.categories = returnData.data.categories;
        }, function (err) {
            console.log(err);
        })

  
  
  })
    
    
    .controller('PostCtrl', function ($http, $scope, $stateParams, $sce) {

        $http.get('http://www.theblushworks.com/api/get_post/?id=' + $stateParams.postId).then(function (data) {
            $scope.post_title = data.data.post.title;
            $scope.post_category = data.data.post.categories[0].title ? data.data.post.categories[0].title : 'No Category';
            $scope.post_content = $sce.trustAsHtml(data.data.post.content);
            $scope.post_date = data.data.post.date;
            $scope.post_authorName = data.data.post.author.name;
            if ($scope.post_authorName.trim() == '')
                $scope.post_authorName = "No Name";
            $scope.post_authorImage = "";
            $scope.post_image = data.data.post.thumbnail_images.medium_large.url;
            $scope.post_commentCount = data.data.post.comment_count;
            // $scope.post_views = data.data.post.custom_fields.post_views_count[0];
            $scope.post_url = data.data.post.url;

        }, function (err) {

        })


        $scope.Share  = function(){
            window.plugins.socialsharing.share($scope.post_title , $scope.post_title ,  $scope.post_image , $scope.post_url)


        }






    })


    .controller('CatCtrl', function ($http, $scope, $stateParams, $localStorage , $sce) {
        
        if (!$scope.Favorites)
            $scope.Favorites = [];

        $scope.doRefresh = function () {


            $http.get('http://www.theblushworks.com/api/get_category_posts/?id=' + $stateParams.catId).then(function (data) {
                console.log("PPPPP", data.data.category.title);
                $scope.category_posts = data.data.posts;

                $scope.category_posts.forEach(function (elem, index, array) {
                    elem.excerpt = elem.excerpt.substr(0, 100);
                    elem.excerpt = elem.excerpt + "...Read More";
                    elem.excerpt = $sce.trustAsHtml(elem.excerpt);
                })
                $scope.catagroy_title = data.data.category.title;
                $scope.$broadcast('scroll.refreshComplete');

            }, function (err) {

            })

        }

         $scope.toggleFavorite = function (post) {
            console.log("POST", post);
            post.isFavorite = !post.isFavorite;

            if (post.isFavorite == true) {
                $scope.Favorites.push(post.id);
            } else {
                $scope.Favorites.forEach(function (e, i, a) {
                    if (e == post.id) {
                        $scope.Favorites.splice(i, 1);
                        console.log("SPLICE", i);
                    }

                })
            }

            $localStorage.Favorites = $scope.Favorites;
            console.log("FAV", $scope.Favorites);


        }

         $scope.doRefresh();

    })

    .controller('FavCtrl', function ($http, $scope, $localStorage, $sce) {
        
        $scope.doRefresh = function() {
            
            
            
             
        $scope.Favorites = $localStorage.Favorites;
        $scope.favorite_posts = [];
        $scope.Favorites.forEach(function (e, i, a) {
            $http.get('http://www.theblushworks.com/api/get_post/?id=' + e).then(function (data) {
               console.log("FAVORITE",data);
                $scope.favorite_posts.push(data.post);

                if ($scope.favorite_posts.length == $scope.Favorites.length) {
                        $scope.favorite_posts.forEach(function (post, index, array) {
                            post.excerpt = post.excerpt.substr(0, 100);
                            post.excerpt = post.excerpt + "...Read More";
                            post.excerpt = $sce.trustAsHtml(post.excerpt);

                            if ($scope.Favorites.indexOf(post.id) != -1)
                                post.isFavorite = true;
                            else
                                post.isFavorite = false;

                        })
                }

            })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');

                })
            
        })
            
            
            $scope.doRefresh();
            
            $scope.toggleFavorite = function (post) {
            console.log("POST", post);
            post.isFavorite = !post.isFavorite;

            if (post.isFavorite == true) {
                $scope.Favorites.push(post.id);
            } else {
                $scope.Favorites.forEach(function (e, i, a) {
                    if (e == post.id) {
                        $scope.Favorites.splice(i, 1);
                        console.log("SPLICE", i);
                    }

                })
            }

            $localStorage.Favorites = $scope.Favorites;
          

        }
            
            
            
            
            
            
            
            
            
            
            
        }
       


    })