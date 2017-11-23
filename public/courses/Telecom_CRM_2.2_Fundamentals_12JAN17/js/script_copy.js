
	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'pages/intro.html',
				controller  : ''
			})
			.when('/elabs', {
				templateUrl : 'pages/elabs.html',
				controller  : ''
			})
			.when('/intro', {
				templateUrl : 'pages/intro.html',
				controller  : ''
			})
			// route for the about page
			.when('/menu', {
				templateUrl : 'pages/menu.html',
				controller  : ''
			})

			// route for the contact page
			.when('/content', {
				templateUrl : 'pages/contentLoader.html',
				controller  : ''
			});			
	});
scotchApp.directive('disableContents', function() {
    return {
        compile: function(tElem, tAttrs) {
            var inputs = tElem.find('div');
            inputs.attr('ng-disabled', tAttrs['disableContents']);
            for (var i = 0; i < inputs.length; i++) {
            }
        }
    }
});
	scotchApp.directive('popup', function() {
	  var p = {
		  link : function(scope, iElement, iAttrs){
			   //code to wrap the div (iElement) with a abs pos div (parentDiv)
			  // code to add a mask layer div behind 
			  // if the parent is already there, then skip adding it again.
			 //use jquery ui to make it dragable etc.
			  scope.watch(showPopup, function(newVal, oldVal){
				   if(newVal === true){
					   $(parentDiv).show();
					 } 
				  else{
					 $(parentDiv).hide();
					}
			  });
		  }


	   }
	  return p;
	});
	
	
	/*scotchApp.directive('starRating',	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				scope.updateStars = function() {
				alert("updateStars");
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						
							scope.updateStars();
						
					}
				);
			}
		};
	});

	
	*/
	

	scotchApp.directive('fancybox', function ($compile, $http) {
        return {
            restrict: 'A',

            controller: function($scope) {
                $scope.openFancybox = function (url) {

                        $http.get(url).then(function(response) {
                            if (response.status == 200) {

                                var template = angular.element(response.data);
                                var compiledTemplate = $compile(template);
                                compiledTemplate($scope);

                                $.fancybox.open({ content: template, type: 'html' });
                            }
                        });
                };
            }
        };
    });
    scotchApp.directive('starRating', function () {
        return {
            scope: {
                rating: '=',
                maxRating: '@',
                readOnly: '@',
                click: "&",
                mouseHover: "&",
                mouseLeave: "&"
            },
            restrict: 'EA',
            template:
                "<div class='allstars' style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                        <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.trainingtelecoms.com/GLW/L1C/images/u386.png\" || \"http://www.trainingtelecoms.com/GLW/L1C/images/u388.png\"}}' \
                        ng-Click='isolatedClick($index + 1)' \
                        ng-mouseenter='isolatedMouseHover($index + 1)' \
                        ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
                </div>",

            compile: function (element, attrs) {
            //alert("compile >>>> ");
                if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                    attrs.maxRating = '5';
                    //alert(" attrs.maxRating : "+ attrs.maxRating);
                };
            },
            controller: function ($scope, $element, $attrs) {
               $scope.maxRatings = [];

                for (var i = 1; i <= $scope.maxRating; i++) {
                    $scope.maxRatings.push({});
                };

                $scope._rating = $scope.rating;
                $scope.resetStars = function (param) {
                     $scope.maxRatings = [];

                    for (var j = 1; j <= $scope.maxRating; j++) {
                        $scope.maxRatings.push({});
                    };

                    $scope._rating = $scope.rating;
                }

                $scope.isolatedClick = function (param) {
                    if ($scope.readOnly == 'true') return;

                    $scope.rating = $scope._rating = param;
                    $scope.hoverValue = 0;
                    //alert(" hoverValue : "+ $scope.rating+" : "+param);
                    $scope.click({
                        param: param
                    });
                };

                $scope.isolatedMouseHover = function (param) {
                    if ($scope.readOnly == 'true') return;

                    $scope._rating = 0;
                    $scope.hoverValue = param;
                    $scope.mouseHover({
                        param: param
                    });
                };

                $scope.isolatedMouseLeave = function (param) {
                    if ($scope.readOnly == 'true') return;

                    $scope._rating = $scope.rating;
                    $scope.hoverValue = 0;
                    $scope.mouseLeave({
                        param: param
                    });
                };
            }
        };
    });	
	
				
					
	scotchApp.value('currentModuleId', 4);

	scotchApp.directive('myBackgroundImage', function () {
        return function (scope, element, attrs) {
            element.css({
                'background-image': 'url(' + attrs.myBackgroundImage + ')',
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center'
            });
        };
    });

	scotchApp.factory('scotchFactory',function($http){
          var factory = [];	
		
          factory.getTodos = function(){
            return $http.get("xml/course_content_01.xml");
          }
		 return factory;
    });
	
	scotchApp.factory('configFactory',function($http){
          var factory1 = [];		  
          factory1.getTodos = function(){
            return $http.get("xml/config.xml");
          }
		 return factory1;
    }); 

	scotchApp.factory('dataService', function() {

          // private variable
          var _dataObj = [];

          // public API
          return {
            dataObj: _dataObj
          };
    }); 

    scotchApp.factory('quizFactory',function($http){
          var factory2 = [];	
          // alert("quiz : "+dataService.dataObj);
          factory2.getTodos = function(){
            return $http.get(dataService.dataObj);
          }
		 return factory2;
    });
	scotchApp.factory('dataService', function() {

          // private variable
          var _dataObj = [];

          // public API
          return {
            dataObj: _dataObj
          };
        });
	scotchApp.controller('introController', ['$compile', '$scope','$window', function($compile, $scope, $window) {
		$scope.openWindow = function() {
			$window.open('pages/intro_oss_bss.html', 'Intro_to_OSS_BSS', 'width=656,height=377');
		};
	}]);	

    scotchApp.controller('mainController',function($scope, $rootScope, scotchFactory, $sce, currentModuleId, $window, dataService){  

		//alert("Active Module1:"+ currentModuleId);
		$scope.modules=[];
		var ocontentModules=[];		
		var knowledgeBooster="";		
		var moduleTracking = [];
		var modTracking = [];
		var showDmenu = false;
		var showDmenu1 = false;		
		var showDmenu2 = false;		
		var showMask = false;
		var showMask1 = false;
		var showMask2 = false;
		$scope.mylink="content";
		$scope.modPages=[];
		$scope.signum = $('#signum').text;
		//alert("signum : "+signum);
		$scope.placeholder = "(Enter recipients email address here)";
		$rootScope.curModuleId = currentModuleId;
		$scope.hideBtn = currentModuleId;
		$scope.nextDisabled = "";
		$scope.assessmentAvailable; 
		 $scope.modulePages= [];
		 $scope.showTrackIcon = "true";
        $scope.curModId = 0;
        $scope.quizIndex = 0;
		$scope.moduleObj=[];
		$scope.exercise=[];
		$scope.roleList1=[];
		$scope.roleList2=[];
		scotchFactory.getTodos().success(function(data){				
		
			var courses  = x2js.xml_str2json(data);				
			$scope.moduleObj = courses.content.module;	
			$scope.modPages = $(data).find('page');
			$scope.allModules = $(data).find('module');
			alert("Children : "+$scope.allModules[6].getElementsByTagName('page').length);
            $scope.assessmentAvailable = courses.content.course.assessmentAvailable;
            $scope.eLabs = courses.content.course.eLabs;
            if($scope.assessmentAvailable == "yes"){
			     var numOfModules = $scope.moduleObj.length;
            }else{
                if($scope.eLabs == "false"){   
                    var numOfModules = $scope.moduleObj.length-1;
                }else{
                    
                    var numOfModules = $scope.moduleObj.length;
                }
                
            }
            var totalMods = $scope.modPages.length;
            dataService.dataObj.template = courses.content.course.template;
			
            if($scope.eLabs == "false"){
                $scope.showpagination= "true";
			     $window.updateTrackingArr(numOfModules, $scope.eLabs);
            }else{
                $scope.showpagination = courses.content.course.showpagination
                $window.updateTrackingArr(totalMods, $scope.eLabs);
                
            }
             
            $scope.quizxml = courses.content.course.quizxmlPath;
            
            dataService.dataObj.xml = $scope.quizxml;
            dataService.dataObj.assessAvail = $scope.assessmentAvailable;
            var pagearr =[];
            
           angular.forEach(values, function(modvalue, modkey) {
              angular.forEach(values, function(value, key) {
                    
                });
            });

          // alert("$scope.roleList1 : "+JSON.stringify($scope.roleList1[6].pages));
			for (var i = 0; i <numOfModules; i++) {
              modTracking[i]=0
             
              
            var pagelen = $scope.allModules[i].getElementsByTagName('page');
                //alert("leed :"+pagelen.length);
                 for (var j = 0; j <pagelen.length; j++) {
                      alert("pagelen : "+$scope.allModules[i].getElementsByTagName('page')[j].getElementsByTagName('title')[0].textContent);
                      
               
				$scope.modules[i] = [
                      
					'title': $scope.moduleObj[i]._title,
					'id': $scope.moduleObj[i]._mid,
					'type': $scope.moduleObj[i].page.type,
					'pages': [
                    
                     'title': $scope.allModules[i].getElementsByTagName('page')[j].getElementsByTagName('title')[0].textContent,						
                        'type': $scope.allModules[i].getElementsByTagName('page')[j].getElementsByTagName('type')[0].textContent,						
                        'desc': $scope.allModules[i].getElementsByTagName('page')[j].getElementsByTagName('desc')[0].textContent,						
                        'id': $scope.allModules[i].getElementsByTagName('page')[j].getAttribute('id')[0].textContent,		
                        'pages':[],
                        
                    
                    
                    ],
					'desc': $sce.trustAsHtml(""+$scope.moduleObj[i].moddesc),				
					'icon': $scope.moduleObj[i]._icon,
					'smallicon': $scope.moduleObj[i]._smallicon,
					'oasset': $scope.moduleObj[i].page.ocontent,
					
                    'isMenuDisabled':	"active" , 
                    'track':modTracking[i]
				  }];
                  
          
                  }       
              
                
           // alert("pages : "+JSON.stringify(pagearr));
                
				if($scope.moduleObj[i].page.type == "text"){
					var olength = $scope.modules[i].oasset.ltext;// error on this line
					alert("fafaad : "+olength);
					for (var k = 0; k < olength.length; k++) {
						//alert("length : "+$scope.moduleObj[i].page.ocontent.ltext[k].__text);
						//ocontentModules[k] = $scope.moduleObj[i].page.ocontent.ltext[k].__text;
						ocontentModules.push({
                        text: $scope.moduleObj[i].page.ocontent.ltext[k].__text,
                        url: $scope.moduleObj[i].page.ocontent.ltext[k]._url                        
                        });
					}
			     
                }
			     //alert("knowledgeBooster : "+angular.isObject($scope.modules[i].pages) );
                
                 if($scope.moduleObj[i].page.type == "iframe"){			  

                    $scope.exercise.push({url:$scope.moduleObj[i].page.ocontent});			  
                    

                  }
                
                  if($scope.moduleObj[i].page.type == "quiz")
                  {			  
                        // //alert("$scope.assessmentAvailable : "+$scope.assessmentAvailable+" : "+modules[i].isMenuDisabled);
                      
                        if($scope.assessmentAvailable == "yes"){
                            $scope.quizIndex = i;
                             $scope.modules[i].isMenuDisabled = "disabled";
                        }else{
                            $scope.modules[i].isMenuDisabled = "active";

                        }
              
            }
           
            
			for (var m = 0; m < $scope.modPages.length; m++) {
                 
                    var description = $scope.modPages[m].getElementsByTagName("desc")[0].childNodes[0].textContent;
                   // var match = myRegexp.exec(myString);
                    
                   moduleTracking[m] = 0;
                   $scope.modulePages.push({
                      
                        type: $scope.modPages[m].getElementsByTagName("type")[0].textContent,	
                        title: $scope.modPages[m].getElementsByTagName("title")[0].textContent,
                        desc: description.replace('[CDATA[', '').replace(']]', ''),
                        modVideoUrl: $scope.modPages[m].getElementsByTagName("assethighres")[0].textContent,					
                        oasset:	$scope.modPages[m].getElementsByTagName("ocontent")[0].textContent,		
                        tracking:	moduleTracking[m] ,		
                        activeModule:	moduleTracking[m] ,		
                        	
                        modId: $scope.modPages[m].getAttribute("class"),	
                        id: (m+1),
                        dmenuIcon: $scope.modPages[m].getAttribute("micon")
                 
				  });
                  // var getDesc = $scope.modulePages[m].desc.replace('[CDATA[', '').replace(']]', '');
            }
            }
             
			
			$scope.moduleDetails = $scope.modulePages;	
			$scope.moduleHeading = $scope.modules;	
            ////alert("page length :  "+JSON.stringify($scope.modulePages[$scope.modulePages.length-1]));
             $scope.totalItems = $scope.moduleDetails.length;
            $scope.currentPage = 2;
            $scope.maxSize = 20;
            $scope.itemsPerPage = 3;
            $scope.windowWidth = '';

             // Window resize event
            /* var w = angular.element($window);
             w.bind('resize', function () {

                 // Get window width
                 $scope.windowWidth = "innerWidth" in window ? window.innerWid n th : document.documentElement.offsetWidth;

                 // Change maxSize based on window width
                 if($scope.windowWidth > 1000) {
                     $scope.maxSize = 20;        
                 } else if($scope.windowWidth > 800) {
                     $scope.maxSize = 15;
                 } else if($scope.windowWidth > 600) {
                     $scope.maxSize = 8;
                 } else if($scope.windowWidth > 400) {
                     $scope.maxSize = 5;
                 } else {
                     $scope.maxSize = 2;
                 }
                 $scope.$apply();
             });*/
            
          //  //alert($scope.moduleDetails[0].desc);
            
			var arr = $window.trackingArr;
			for (var k = 0; k < arr.length; k++) {
				if(arr[k]==1)
				{
					$scope.moduleDetails[k].tracking = "completed";

				}
			}
            
			$scope.moduleDetails[0].activeModule = "completed";
			$scope.oContent = ocontentModules;
			$scope.tracking = arr;
			
			if($scope.eLabs == "true")
			{
				$scope.tracking[0] = 1;
				$scope.tracking[3] = 1;
				$scope.moduleDetails[0].tracking = "completed";
				$scope.moduleDetails[3].tracking = "completed";
				$window.getTrackArrayDetails($scope.tracking);
				//$rootScope.mylink="elabs";
				//$scope.url($rootScope.mylink);
			}
            
			$scope.activeModule = moduleTracking;			
			$scope.title = courses.content.course.titletxt;
			$scope.courseID = courses.content.course.courseid;			
			//$scope.moreInfoMenus = courses.content.course.moreInfoMenus;
			$scope.showQuizMenus = courses.content.course.showQuizMenus;
			$scope.mode = courses.content.course.lrsmode;
			if($scope.mode == "live")
			{
				$scope.lrsendpoint = courses.content.course.livelrsendpoint;
				$scope.lrsuname = courses.content.course.livelrsuname;
				$scope.lrspword = courses.content.course.livelrspword;
			}else
			{
				$scope.lrsendpoint = courses.content.course.testlrsendpoint;
				$scope.lrsuname = courses.content.course.testlrsuname;
				$scope.lrspword = courses.content.course.testlrspword;
			}
			
			$scope.newtocourse = $sce.trustAsHtml(""+courses.content.intro.text);
			$scope.heading = courses.content.intro.title;
			$scope.menuTitle = courses.content.course.menutitle;
			$scope.movie = {src:courses.content.intro.highres};                
			$scope.menuDesc = $sce.trustAsHtml(""+courses.content.course.menudesc);
			////alert("from script.js")
			$scope.nextdisable = "active";
			$window.courselaunched($scope.lrsendpoint,$scope.lrsuname,$scope.lrspword,$scope.courseID,$scope.title);
			$window.played($scope.moduleDetails, $rootScope.curModuleId);
			
        });	
			
			var ratingArr =["Unrated","Poor (:","Needs Improvement", "Okay...", "Looks good!","Excellent :)"];		
            dataService.dataObj.push({
                xmlpath:$scope.quizxml,
                assessAval:$scope.assessmentAvailable,
            });

			$scope.starRating = 0;
			$scope.starFeedback = "Unrated";
			$scope.hoverRating = 0;
			$scope.clicked = false;
			$scope.list = [];
			$scope.text = '';
			
			
			$scope.starClick = function (param) {
				
				 $scope.starFeedback = ratingArr[param];
				 $scope.rating = param;
				 $scope.clicked = true;

			};
            
        
			$scope.updateTracking = function(param)
			{
				
				var count = 0;
				$scope.moduleDetails = modules;			
				var arr = param;
				for (var k = 0; k < arr.length; k++) {
                    ////alert("updateTracking : "+$scope.moduleDetails[k].type);
					if(arr[k]==1)
					{
						$scope.moduleDetails[k].tracking = "completed";
						count ++;
					}
                    
                    
				}
				if($scope.moduleDetails[count-1].type == "quiz")
				{
					$scope.moduleDetails[count-1].isMenuDisabled = "active";
				}else{
					$scope.moduleDetails[count-1].isMenuDisabled = "disabled";
				}
				$scope.tracking = arr;
				
			};
			$scope.updateProgress = function(param)
			{
			
				$scope.percentage = param.toString()+"%";
				////alert($scope.percentage);
				//$("#progressbar.pct").css({'width': $scope.progress});
				//angular.element(document.getElementById('#progressbar.pct')).css({'width': $scope.progress});
			}
			$scope.starMouseHover = function (param) {
				
				if(!$scope.clicked){
					$scope.hoverRating = param;
				}
				
			};

			$scope.starMouseLeave = function (param) {
			
			   if(!$scope.clicked){
					$scope.hoverRating = param + '*';
				}
				
			};	
				
			

			
			$scope.openPage = function(template_path){
			
				$.fancybox({"href":template_path});
				
			}
			
			
			
			
			$scope.addToFav = function($event){	
			
				
				if($("#favStatus").hasClass("active")){
					
					
				}else{
					////alert("dsfdsfdsfdsfdsf");
					$window.favourited($scope.moduleDetails, $rootScope.curModuleId);
				}
				$("#favIcon").addClass('added');
				$("#favStatus").html("Added to Favourites");	
				$("#favStatus").addClass("active");
				$("#favIcon").children().attr('disabled','disabled');
				
			}
			
			$scope.reportBrokenLink = function($event){		
			
				if($("#reportStatus").hasClass('active')){	
				
				}else{
					////alert("dsfdsfdsfdsfdsf");
					$window.reported($scope.moduleDetails, $rootScope.curModuleId);
				}				
				$("#repIcon").addClass('added');				
				$("#reportStatus").html("Broken Link Reported");					
				$("#reportStatus").addClass('active');				
				$("#repIcon").find("*").prop("disabled", true);
				
			}
			
			$scope.sharedLink = function($event){		
			
				$scope.userEmail = $("#emailTxt").value;
				 if ($scope.userEmail) {		 
					
					$scope.userEmail = '';					
				}
				
				$window.shared($scope.moduleDetails, $rootScope.curModuleId, $scope.userEmail);
				$scope.goDmenu2();
				
			}			
		
		  $scope.tb = {};
		  var thisData = {   
			'email': $scope.tb.email,
			'comments': $scope.tb.comments
		  };
		
  
		$scope.showValue = function(){
			var validEmail = $window.validateEmail($scope.tb.email);
		
			if($scope.tb.email == "" ){
				$("#tbEmail").addClass('highlight');
				
			}else
			{
			
				if(validEmail){
					////alert("Email ::: "+validEmail)
					$("#submitbtn_02").hide();
					$("#shareAgain").show();							
					$("#tbEmail").show();
					//$("#resizable").hide();
					$("#tbEmail").prop("disabled", true);
				
					$("#tbEmail").removeClass('highlight');
					$window.shared($scope.moduleDetails, $rootScope.curModuleId, $scope.tb.email);				
					$scope.tb.email ="Your e-mail has been sent. Thanks for sharing :)";
					////alert("Title : "+$scope.moduleDetails[$rootScope.curModuleId-1].title);
							
				}
				else{
					////alert("Email not valid ::: "+$scope.tb.email)
					$("#tbEmail").addClass('highlight');
					$("#tbEmail").val("");
				}

			}
			
		}
		
		$scope.sendRatingAndComments = function(){
		
			////alert("sendRatingAndComments :: "+$scope.tb.comments+" : "+$scope.rating);		
			if(!$scope.rating || $scope.tb.comments == ""){
				////alert("Dont send the Statements");						
			}
			else{
				////alert("Sending the Statements");
				$("#submitbtn_01").hide();
				$("#newCmtbtn").show();		
				$("#tbComments").prop("disabled", true);
				////alert("sendRatingAndComments");		
				$window.commented($scope.moduleDetails, $rootScope.curModuleId, $scope.tb.comments);
				$window.rated($scope.moduleDetails, $rootScope.curModuleId, $scope.rating);
				$scope.tb.comments ="Thanks, Your Comments have now been sent to the Ericsson OSS BSS Education team :)";
				
			}			
		}
		  		 
		  $scope.resetComments = function($event){		
				
				$(".submitbtn").show();
				$("#newCmtbtn").hide();					
				$("#tbComments").show();
				$("#tbComments").prop("disabled", false);
				$scope.tb.comments = "";	
				//$("#favStatus").addClass('active');
				
				//$("#reportStatus").addClass('active');
			
		  }
		  $scope.resetShareEmail = function($event){		
				$(".submitbtn").show();
				$("#shareAgain").hide();			
				$("#tbEmail").show();
				$("#tbEmail").prop("disabled", false);
				//$("#resizable").show();				
				$scope.tb.email = "";
				//$("#favStatus").addClass('active');
				
				//$("#reportStatus").addClass('active');
				
		  }
			$scope.newComments = function($event){
				////alert("new comments");		
				//$window.commented($scope.moduleDetails, $rootScope.curModuleId, $scope.tb.comments);
				$scope.resetComments();		
				
			}	
			$scope.shareAgain = function($event){				
				
				$scope.resetShareEmail();			
				
			}	
			$scope.trustSrc = function(src) {
			
				return $sce.trustAsResourceUrl(src);
				
			};
		
			$scope.allValuesSame = function(arr) {

                for(var i = 1; i < arr.length-1; i++)
                {
                    if(arr[i] !== arr[0])
                        return false;
                }

                return true;
			}
			$rootScope.loadModuleId=function(idPassedFromNgClick){

				////alert("Load Module ID: "+angular.isObject(idPassedFromNgClick));
                
                
                if(angular.isObject(idPassedFromNgClick)){
                    currentModuleId = parseInt(idPassedFromNgClick.target.attributes.data.value)+1;
                }else{
                    
                    currentModuleId = parseInt(idPassedFromNgClick)+1;
                }
			
				//alert("Load Module ID: "+currentModuleId+" : "+$scope.tracking.length);
    if($scope.moduleDetails[currentModuleId -1].type != "link" && $scope.moduleDetails[currentModuleId -1].type != "pdf"){
				$rootScope.curModuleId = currentModuleId;
                 }
                if($scope.moduleDetails[currentModuleId -1].type == "link"){
                    //$rootScope.curModuleId = currentModuleId+2;
                    $scope.tracking[1] = 1;


                            $scope.moduleDetails[1].tracking = "completed";

                            $scope.activeModule[1] = 1;
                            $scope.moduleDetails[1].activeModule = "completed";
                    $window.open($scope.moduleDetails[1].oasset, "", "width=640, height=480");
                    
                   return false; 
                }
                else if($scope.moduleDetails[currentModuleId -1].type == "pdf"){
                   // $rootScope.curModuleId = currentModuleId+1;
                    $scope.tracking[2] = 1;


                            $scope.moduleDetails[2].tracking = "completed";

                            $scope.activeModule[2] = 1;
                            $scope.moduleDetails[2].activeModule = "completed";
                    $window.open($scope.moduleDetails[2].oasset, "", "width=640, height=480");
                    
                   return false; 
                }
				dataService.dataObj.curModId = $rootScope.curModuleId;
				 for (var i = 0; i < $scope.tracking.length; i++) {
					$scope.moduleDetails[i].activeModule = "active";	
                     
				}
                 if($scope.assessmentAvailable == "yes"){
                        if($scope.moduleDetails[currentModuleId -1].type != "quiz" ){
                            $scope.tracking[currentModuleId -1] = 1;


                            $scope.moduleDetails[currentModuleId -1].tracking = "completed";

                            $scope.activeModule[currentModuleId -1] = 1;
                            $scope.moduleDetails[currentModuleId -1].activeModule = "completed";
                            //$scope.progress = $window.getPercentage($scope.tracking);
                        }
                        else
                        {

                            $scope.tracking[$scope.moduleDetails.length -1] = dataService.dataObj.assesmentPass;

                            $scope.moduleDetails[$scope.moduleDetails.length -1].tracking = dataService.dataObj.tracking;
                            ////alert(" dataService : "+$scope.tracking+"  ::: "+dataService.dataObj.tracking);
                            $scope.activeModule[$scope.moduleDetails.length -1] = dataService.dataObj.assesmentPass;
                            $scope.moduleDetails[$scope.moduleDetails.length -1].activeModule = dataService.dataObj.tracking;


                        }
                 }else{
                     $scope.tracking[currentModuleId -1] = 1;
				
		
				$scope.moduleDetails[currentModuleId -1].tracking = "completed";
				
				$scope.activeModule[currentModuleId -1] = 1;
				$scope.moduleDetails[currentModuleId -1].activeModule = "completed";
                     
                 }
                var getArrValues = $scope.allValuesSame($scope.tracking);
                //alert("getArrValues : " +getArrValues);
                if($scope.assessmentAvailable == "yes"){
                if(getArrValues)
                {
                     ////alert("Tracking :: "+$scope.tracking);
                     $scope.moduleDetails[$scope.quizIndex].isMenuDisabled = "active";
                     $scope.nextDisabled = "";
                    if($scope.eLabs == "true"){
                    
				        $scope.nextDisableFun();
                    }
                    
                 }else{

                        $scope.moduleDetails[$scope.quizIndex].isMenuDisabled = "disabled";
                    
                        if($rootScope.curModuleId == ($scope.tracking.length-1) )
                        {
                            $scope.nextdisable = "nextdisabled";
                            // alert("Tracking nextDisabled:: "+$rootScope.curModuleId+" : "+($scope.tracking.length-1));
                        }else
                        {
                            $scope.nextdisable = "active";
                        }
                 }
                }
				$window.getTrackArrayDetails($scope.tracking);
				$window.played($scope.moduleDetails, $rootScope.curModuleId);	
				showDmenu = false;	
				showDmenu1 = false;	
				showDmenu2 = false;	
				showMask = false;
                
			} 
			$rootScope.assessmentComplete =  function(num, comp){

                $scope.tracking[$scope.moduleDetails.length -1] = num;
                $scope.moduleDetails[$scope.moduleDetails.length -1].tracking = comp;
               // alert(" dataService : "+num+"  ::: "+comp);
                $scope.activeModule[$scope.moduleDetails.length -1] = num;
                for (var i = 0; i < $scope.moduleDetails.length; i++) {
					$scope.moduleDetails[i].activeModule = "active";	
                     
				}
                $scope.moduleDetails[$scope.moduleDetails.length -1].activeModule = comp;
                $window.getTrackArrayDetails($scope.tracking);
                $window.played($scope.moduleDetails, $rootScope.curModuleId);	

            }
			$scope.nextDisableFun = function()			
			{			
				if($rootScope.curModuleId > ($scope.moduleDetails.length))
				{
					$scope.nextdisable = "nextdisabled";
				}else
				{
					$scope.nextdisable = "active";
				}
			}
			$rootScope.goBack = function() {
				
                var videoElements = angular.element(document.querySelector("#videoLoader"));
				
				videoElements[0].pause();
                dataService.dataObj.curModId = $rootScope.curModuleId;
				$scope.starRating = 0;	
				$scope.starFeedback = "Unrated";
				$scope.hoverRating = 0;
				$scope.resetShareEmail();			
				$scope.resetComments();			
				$("#favStatus").html("Add to Favourites");
				$("#reportStatus").html("Report Broken Link");
				$("#favStatus").removeClass('active');
				$("#favIcon").removeClass('added');
				$("#repIcon").removeClass('added');
				$("#reportStatus").removeClass('active');
				$rootScope.curModuleId = parseInt($rootScope.curModuleId)-1;
				 
				for (var j = 0; j < $scope.tracking.length; j++) {
					$scope.moduleDetails[j].activeModule = "active";					
				}		
				
               /* if(currentModuleId != $scope.moduleDetails.length){
                    $scope.tracking[currentModuleId -1] = 1;

                   alert("$scope tracking : "+$scope.tracking);

                    $scope.moduleDetails[currentModuleId -1].tracking = "completed";

                    $scope.activeModule[currentModuleId -1] = 1;
                    $scope.moduleDetails[currentModuleId -1].activeModule = "completed";
                    //$scope.progress = $window.getPercentage($scope.tracking);
                }
              else
                    {
                        
                        $scope.tracking[$scope.moduleDetails.length -1] = dataService.dataObj.assesmentPass;

                         //alert(" dataService : "+$scope.tracking+"  ::: "+dataService.dataObj.assesmentPass);


                        $scope.moduleDetails[$scope.moduleDetails.length -1].tracking = dataService.dataObj.tracking;

                        $scope.activeModule[$scope.moduleDetails.length -1] = dataService.dataObj.assesmentPass;
                        $scope.moduleDetails[$scope.moduleDetails.length -1].activeModule = dataService.dataObj.tracking;
                  
                  
                    }*/
				$scope.tracking[$rootScope.curModuleId -1] = 1;		
                var getArrValues2 = $scope.allValuesSame($scope.tracking);
                //alert("getArrValues2 : " +getArrValues2);
                if($scope.assessmentAvailable == "yes"){
                if(getArrValues2)
                {
                    // alert("Tracking2 :: "+$scope.tracking);
                     $scope.moduleDetails[$scope.quizIndex].isMenuDisabled = "active";
                    $scope.nextDisabled = "";
                    
                 }else{

                      $scope.moduleDetails[$scope.quizIndex].isMenuDisabled = "disabled";
                     $scope.nextDisableFun();
                     
                 }
                }
				//$scope.nextDisabled = "active";
				$scope.moduleDetails[$rootScope.curModuleId -1].tracking = "completed";						
				$scope.activeModule[$rootScope.curModuleId -1] = 1;
				$scope.moduleDetails[$rootScope.curModuleId -1].activeModule = "completed";
				$window.getTrackArrayDetails($scope.tracking);
				$window.played($scope.moduleDetails, $rootScope.curModuleId);
				$scope.nextDisableFun();
			}
			$rootScope.goNext = function($event) {
				
				dataService.dataObj.curModId = $rootScope.curModuleId;			
				//alert("$rootScope.curModuleId : "+$scope.moduleDetails[$rootScope.curModuleId].oasset+" : "+$rootScope.curModuleId);
                var videoElements = angular.element(document.querySelector("#videoLoader"));
				
				videoElements[0].pause();
				
                
				if($rootScope.curModuleId > ($scope.moduleDetails.length -1))
				{
                    if($scope.eLabs == "true"){
					$scope.mylink = "elabs";
                    }else{
                        $scope.mylink = "menu";
                        
                    }
					$rootScope.curModuleId = 0;
					//alert("goNext if");
				}
				else
				{
					$scope.mylink = "content";
					$scope.starRating = 0;				
					//$scope.starFeedback = "Unrated";
					$scope.hoverRating = 0;
					$scope.resetShareEmail();			
					$scope.resetComments();
					$("#favStatus").html("Add to Favourites");
					$("#reportStatus").html("Report Broken Link");
					$("#favStatus").removeClass('active');
					$("#favIcon").removeClass('added');
					$("#repIcon").removeClass('added');
					$("#reportStatus").removeClass('active');
					
					$rootScope.curModuleId = parseInt($rootScope.curModuleId)+1;
					for (var j = 0; j < $scope.tracking.length; j++) {
						$scope.moduleDetails[j].activeModule = "active";
					}
                    
                    if($scope.assessmentAvailable == "yes"){
                        
                         if($scope.moduleDetails[$rootScope.curModuleId -1].type != "quiz" ){
                            $scope.tracking[$rootScope.curModuleId -1] = 1;


                            $scope.moduleDetails[$rootScope.curModuleId -1].tracking = "completed";

                            $scope.activeModule[$rootScope.curModuleId -1] = 1;
                            $scope.moduleDetails[$rootScope.curModuleId -1].activeModule = "completed";
                            //$scope.progress = $window.getPercentage($scope.tracking);
                        }
                      else
                            {

                                $scope.tracking[$scope.moduleDetails.length -1] = dataService.dataObj.assesmentPass;

                                $scope.moduleDetails[$scope.moduleDetails.length -1].tracking = dataService.dataObj.tracking;
                                //alert(" dataService : "+$scope.tracking+"  ::: "+dataService.dataObj.tracking);
                                $scope.activeModule[$scope.moduleDetails.length -1] = dataService.dataObj.assesmentPass;
                                $scope.moduleDetails[$scope.moduleDetails.length -1].activeModule = "completed"; 


                            }
                 }else{
                     
                     $scope.tracking[$rootScope.curModuleId -1] = 1;
				
		
				     $scope.moduleDetails[$rootScope.curModuleId -1].tracking = "completed";
				
				     $scope.activeModule[$rootScope.curModuleId -1] = 1;
				     $scope.moduleDetails[$rootScope.curModuleId -1].activeModule = "completed";
                     
                 }
              
                   // alert("getArrValues1 : " +getArrValues1);
                    var getArrValues1 = $scope.allValuesSame($scope.tracking);
                    if($scope.assessmentAvailable == "yes"){
                        if(getArrValues1)
                        {
                            // alert("Tracking1 :: "+$scope.tracking);
                            $scope.moduleDetails[$scope.quizIndex].isMenuDisabled = "active";
                            $scope.nextDisabled = "";

                         }else{

                              $scope.moduleDetails[$scope.quizIndex].isMenuDisabled = "disabled";
                             if($rootScope.curModuleId == ($scope.tracking.length) ){

                                 $scope.nextDisabled = "disabled";

                             }else{

                                 $scope.nextDisabled = "active";

                             }

                         }
                    }
                    
					//$scope.progress = $window.getPercentage($scope.tracking);
                    
					$window.getTrackArrayDetails($scope.tracking);
					$window.played($scope.moduleDetails, $rootScope.curModuleId);
					
				}
                
               // alert("pdf : "+$scope.moduleDetails[4].tracking);
				if($scope.eLabs == "true"){
				    $scope.nextDisableFun();
                }
				    //alert("Active Module : "+$scope.moduleDetails[$rootScope.curModuleId -1].tracking)		
			}
		 
		
		
			$scope.goDmenu = function($event) {
			
			var videoElements = angular.element(document.querySelector("#videoLoader"));
				if(!showDmenu){
					showDmenu = true;
						
				videoElements[0].pause();
				}else{
				
					showDmenu = false;			
					//videoElements[0].play();
				}			
				$scope.goMask();
			}
		
			$scope.goDmenu1 = function($event) {
			
			var videoElements = angular.element(document.querySelector("#videoLoader"));
		
				if(!showDmenu1){					
						
					showDmenu1 = true;
					$scope.resetComments();
					$scope._rating = $scope.rating;
					$scope.hoverValue = 0;
					$scope.maxRatings = [];
					videoElements[0].pause();
				
				}else{
				
					showDmenu1 = false;			
					//videoElements[0].play();
				}			
				$scope.goMask1();
			}
			
			$scope.goDmenu2 = function($event) {
			var videoElements = angular.element(document.querySelector("#videoLoader"));
				if(!showDmenu2){
					showDmenu2 = true;
					$scope.resetShareEmail();
				
					$scope._rating = $scope.rating;
					$scope.maxRatings = [];
					$scope.hoverValue = 0;
					
					videoElements[0].pause();
				}else{
				
					showDmenu2 = false;			
					//videoElements[0].play();
				}			
				$scope.goMask2();
			}			
			$scope.goIntro = function($event) {
				
				if($scope.eLabs == "true"){			
					$scope.mylink = "elabs";
				}else{			
					$scope.mylink = "intro";
				}			
			
			}
        
			$scope.goMask = function($event) {
				
				if(!showMask){			
					showMask = true;
				}else{			
					showMask = false;
				}			
			
			}
			$scope.goMask1 = function($event) {
				
				if(!showMask1){			
					showMask1 = true;
				}else{			
					showMask1 = false;
				}			
			
			}
			$scope.goMask2 = function($event) {
				
				if(!showMask2){			
					showMask2 = true;
				}else{			
					showMask2 = false;
				}			
			
			}
			$scope.canShowMask = function() {
		
			   if(!showMask){      
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
			$scope.canShowCourseMenu = function() {
		
			   if($scope.eLabs == "true"){      
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
			$scope.canShowMask1 = function() {
		
			   if(!showMask1){      
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
			$scope.canShowMask2 = function() {
		
			   if(!showMask2){      
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
			$scope.canShowDmenu = function() {
				
			   if(!showDmenu){      
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
			$scope.canShowDmenu1 = function() {
		
			   if(!showDmenu1){      
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};	
		
			$scope.canShowDmenu2 = function() {
		
			   if(!showDmenu2){      
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};	
			
			$scope.canShowVideo = function() {
			   if($scope.moduleDetails[$rootScope.curModuleId-1].type == "video"){      
				return true;     
			   }		   
			   else
			   {
				return false;
			   }
			};
			$scope.canShowOcontent = function() {
				if($scope.moduleDetails[$rootScope.curModuleId-1].type == "text"){	
					
				return true;     
			   }		   
			   else
			   {
				return false;
			   }
			};
			$scope.canShowCustMenus = function() {
				
				if($scope.moduleDetails[$rootScope.curModuleId-1].type == "text"){	
					
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
			$scope.canShowBoosters = function($event) {
			 if($scope.moduleDetails[$rootScope.curModuleId-1].type == "iframe"){		
					return true;     
			   }		   
			   else
			   {
					return false;
			   }
			
			}
            
            $scope.canShowcmenu = function($event) {
			 if($scope.eLabs == "true")	{
					return false;     
			   }		   
			   else
			   {
					return true;
			   }
			
			}
			$scope.canShowbottomMenus = function() {
				
				if($scope.moduleDetails[$rootScope.curModuleId-1].type == "quiz"){	
					
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
        
           $scope.canShowQuiz = function($event) {
			 if($scope.moduleDetails[$rootScope.curModuleId-1].type == "quiz" && $scope.showQuizMenus  == "disable"){		
					return true;     
			   }		   
			   else
			   {
					return false;
			   }
			
			}
			$scope.canShowNext = function() {
			   if($rootScope.curModuleId > (modules.length -1)){    
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			  
			};
			$scope.canShowPrev = function() {
			   if($rootScope.curModuleId <= 1){    
				return false;     
			   }		   
			   else
			   {
				return true;
			   }
			};
			$scope.canShoweLabTemplate = function($event) {
			if($scope.eLabs == "true"){  
			 return true;     
			  }     
			  else
			  {
			 return false;
			  }
		   
		   }
				$scope.canShowL1Template = function($event) {
			if($scope.eLabs == "true"){  
			 return false;     
			  }     
			  else
			  {
			 return true;
			  }
		   
		   };
			$scope.canShowMenu = function() {
			   if($rootScope.curModuleId == 1){    
				return true;     
			   }		   
			   else
			   {
				return false;
			   }
			};
			
		
			
    });
	

scotchApp.directive('hoverBgImage',function(){
    return {
        link: function(scope, elm, attrs){
            elm.bind('mouseenter',function(){
                this.style.backgroundImage = 'url('+attrs.hoverBgImage+')';
            });
            elm.bind('mouseleave',function(){
                this.style.backgroundImage = '';
            })
        }
    };
});



	 scotchApp.controller('configController',function($scope,configFactory){  

		var configObj =[];
        
		configFactory.getTodos().success(function(data){				
		
			var configxml  = x2js.xml_str2json(data);				
			$scope.configObj = configxml.config.settings;				
			var numOfSettingsObj = $scope.configObj.length;				
			//alert("numOfSettingsObj : "+configxml.config.copywrite._show);
            $scope.copywriteText = "";
            //$scope.headerText =configxml.config.header.text;
            $scope.showCopyWrite = configxml.config.copywrite._show;
            
            if($scope.showCopyWrite == "true"){
                
                $scope.copywriteText =configxml.config.copywrite.text;
            }
            $scope.logoiconimage=configxml.config.cimages.logoiconimage;
			 $scope.headerbarimage=configxml.config.cimages.headerbarimage;
			  $scope.footerbarimage=configxml.config.cimages.footerbarimage;
            //$scope.menuicon=configxml.config.settings.menuicon
            
            
            $scope.scorm =configxml.config.settings.scorm;
            $scope.xAPI =configxml.config.settings.xAPI;
            
            $scope.bandwidth=configxml.config.buttons.bandwidth;
            $scope.dmmenuicon=configxml.config.buttons.dmmenuicon;
			$scope.menuicon=configxml.config.buttons.menuicon;
            $scope.menuiconro=configxml.config.buttons.menuiconro;
            $scope.backbtn=configxml.config.buttons.backbtn;
            $scope.backbtnro=configxml.config.buttons.backbtnro;
			
			$scope.progtn=configxml.config.buttons.progbtn;
            $scope.progtnro=configxml.config.buttons.progbtnro;
			
            $scope.nextbtn=configxml.config.buttons.nextbtn;
            $scope.nextbtnro=configxml.config.buttons.nextbtnro;
            $scope.continuebtn=configxml.config.buttons.continuebtn;
            $scope.continuebtnro=configxml.config.buttons.continuebtnro;
            $scope.introbtn=configxml.config.buttons.introbtn;
            $scope.introbtnro=configxml.config.buttons.introbtnro;
            $scope.menubtn=configxml.config.buttons.menubtn;
            $scope.menubtnro=configxml.config.buttons.menubtnro;
            $scope.menuicons=configxml.config.buttons.menuicons;
            $scope.menuiconsro=configxml.config.buttons.menuiconsro;
            $scope.notviewed=configxml.config.buttons.notviewed;
            $scope.showCompleted=configxml.config.buttons.completeicon;
            $scope.lastIcon=configxml.config.buttons.lastIcon;
            $scope.videoicon=configxml.config.buttons.videoicon;
            $scope.pdficon=configxml.config.buttons.pdficon;
            $scope.linkicon=configxml.config.buttons.linkicon;
            $scope.menutitlebg=configxml.config.buttons.menutitlebg;
             
           
           
        });			
	
    });

	scotchApp.controller('introController', function($scope) {
		$scope.message = 'Look! I am an intro page.';
		$scope.newTransformProp = "";
		$scope.mystyle = "";
		$scope.nextBtnTxt = "Next";
		$scope.cnt = 0;
		$scope.linkVar = "content";
		var introArray = [0,-640,-1280,-1920];
		
		// the activeLink provides a pointer to the currently displayed item
		var activeLink = 0;
		$scope.intro = [];
		// setup the event listeners
		for (var i = 0; i < introArray.length; i++) {
		   // var link = links[i];
			$scope.intro.push({id:i, active:"", pos:introArray[i]});
		    //link.addEventListener('click', setClickedItem, false);
		 	
		    // identify the item for the activeLink
		    //link.itemID = i;
		}
		 $scope.intro[0].active = "active";
		// set first item as active
		//links[activeLink].classList.add("active");
		
	
		
		$scope.setClickedItem = function(e)
		{
			//alert("Coming in: "+e);
		   	$scope.removeActiveLinks();
		 	$scope.intro[e].active = "active";
		    var clickedLink = e;
		    //activeLink = clickedLink.itemID;
		 	//alert(clickedLink);
			$scope.cnt = e;
		   $scope.changePosition(clickedLink);
			if(e == introArray.length-1)
			{
				$scope.nextBtnTxt = "Start";				
			}else
			{
				$scope.nextBtnTxt = "Next";
			}
			//$scope.mystyle = "translate3d(500, 0, 0)";
		}
		//$scope.setClickedItem($scope.cnt)
		$scope.removeActiveLinks = function() {
		    for (var i = 0; i < $scope.intro.length; i++) {
					$scope.intro[i].active = "";
		       // links[i].classList.remove("active");
		    }
		}
		 
		// Handle changing the slider position as well as ensure
		// the correct link is highlighted as being active
		$scope.changePosition = function(link) {
		    var position = $scope.intro[link].pos;
			//alert(position);
			var transforms = ["transform",
            "msTransform",
            "webkitTransform",
            "mozTransform",
            "oTransform"];
 		
			var transformProperty = $scope.getPropertyName(transforms);
		 	//$scope.newTransformProp = transformProperty;
			var wrapper = angular.element(document.querySelector("#wrapper"));
		    var translateValue = "translate(" + position + "px, 0px)";
			$scope.mystyle = translateValue;
		   // wrapper.style[transformProperty] = translateValue;
		 	
		   // link.classList.add("active");
		}
		
		$scope.moveNext = function()
		{
			$scope.cnt++;
			$scope.setClickedItem($scope.cnt)
			//alert($scope.cnt);
		}
		 
		// vendor prefix management
		$scope.getPropertyName = function(properties) {
		    for (var i = 0; i < properties.length; i++) {
				//alert(typeof angular.element(document.body.style[properties[i]]));
		        if (typeof angular.element(document.body.style[properties[i]]) != "undefined") {
		            return properties[i];
		        }
		    }
		    return null;
		}
	});

	scotchApp.controller('quizController',function($scope, $rootScope ,$sce,$window,dataService, $http){  
	
		$scope.message = 'Answer these 5 questions to check your knowledge.';
		$scope.hintmessage = '(Select one, and Submit)';

        window.quizScore = 0;
        $scope.questionObj =[];
        var resultObj =[];
		 $scope.quesArr = [];
		var choices = [];
		var pnum = [];
        var qcount = 1;
		var answeredAll = 0;
        $scope.feedback;
        $scope.comment;
        $scope.qscore;
        $scope.totalQues = 0;
        $scope.activeFeedback;
        $scope.results=[];
        $scope.radioValue  = "";
        $scope.change = "data";
        $scope.value = "";
        $scope.buttonText= "Submit";
        $scope.isDisabled = true;
		$scope.isBackEnabled = true;
        $scope.isEnabled = true;
        $scope.item = {};
        $scope.answerArr = [];		
        $scope.isSelected = false;
        $scope.quizComplete = false;
        //alert(" dataService.dataObj.assessAvail : "+ dataService.dataObj.assessAvail);
        $scope.percentage = 0;		
        if(dataService.dataObj.assessAvail == "yes"){
		$http.get(dataService.dataObj.xml).success(function(data) {		
			var quizxml  = x2js.xml_str2json(data);				
			$scope.quizObj = quizxml.questions.question;				
			//$scope.quesObj = quizxml.questions.question.questxt;
			var numOfquizObj = 	$scope.quizObj.length;		
			$scope.buttonStyle1="disabled";
			$scope.buttonStyle="disabled";
			$scope.buttonStyle3="disabled";
			$scope.buttonStyle2="";
           $scope.totalQues =  quizxml.questions.settings.ques;
           $scope.activeFeedback =  quizxml.questions.settings.activeFeedback;
            dataService.dataObj.assesmentPass = 0;
            for (var j = 1; j <= numOfquizObj; j++) {
                 $scope.quesArr[j-1] = j;
                
                $scope.questionObj.push({
                    id: $scope.quizObj[j-1]._id,
                   
                    ques: $sce.trustAsHtml(""+$scope.quizObj[j-1].questxt),
                    ans: $scope.quizObj[j-1].ans,
                    type: $scope.quizObj[j-1].type,
                    options: $scope.quizObj[j-1].choices,
                    option: $scope.quizObj[j-1].choices.choice,
                   
                    
                    
                });
           // alert("All ques : "+questionObj[25].id+" : "+questionObj[25].ques);
                //var clength = questionObj[j-1].children;// error on this line
              /*  for (var m = 0; m < clength; m++) {
						//alert("length : "+$scope.moduleObj[i].page.ocontent.ltext[k]);
						//ocontentModules[k] = $scope.moduleObj[i].page.ocontent.ltext[k].__text;
						choices.push({
                        text: $scope.questionObj[j-1].options[m],
                                             
                        });
					}*/
               
            }
          resultObj.push({
              
              feedback1: quizxml.questions.results.feedback1,
              feedback2: quizxml.questions.results.feedback2,
              feedback3: quizxml.questions.results.feedback3,
              comment1: quizxml.questions.results.comment1,
              comment2: quizxml.questions.results.comment2,
              comment3: quizxml.questions.results.comment3,
          
          });
            
           $scope.results = resultObj;
           $scope.quesChoices = choices;
           $scope.getQues = $scope.shuffleArray( $scope.quesArr);
           $scope.quesCnt = qcount;
          // $scope.radioValue  = $scope.questions[$scope.getQues[$scope.quesCnt-1]].options;
           $scope.numofQues=[];
         
           for (var k = 1; k <= $scope.totalQues; k++) {
               pnum[k-1] = 0;
				$scope.answerArr[k-1]="";
                 $scope.numofQues.push({ 
                     id : k,
                     val:$scope.getQues[k-1], 
                     activeQuiz: "active",
                 });
              
           }
		   //alert("answerArr: "+$scope.answerArr);
           $scope.numofQues[0].activeQuiz = "finished";
          
        });	
        }
        $scope.questions = $scope.questionObj;
        //alert("Feeedback : "+$scope.questions[0].id)
        
        $scope.shuffleArray = function(array) {
            var m = array.length, t, i;

            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            //alert("randon Arr :: "+array);
            return array;
         }
        
         $scope.quizSubmit = function($event) {
            $scope.isDisabled = true;
             $scope.isEnabled = false;
			 $scope.isBackEnabled = false;
            //alert($scope.value+" : "+$scope.questions[$scope.numofQues[$scope.quesCnt-1].val - 1].ans);
              $scope.buttonStyle="disabled";
              $scope.buttonStyle1="";
              //$scope.isOptionsDisabled="disabled";
			 for (var k = 1; k <= $scope.totalQues; k++) {
				//alert($scope.answerArr[k-1]+" : "+$scope.questions[$scope.numofQues[k-1].val - 1].ans);
				if( $scope.answerArr[k-1] == $scope.questions[$scope.numofQues[k-1].val - 1].ans){						
					window.quizScore++;
					$scope.qscore = window.quizScore;					
				 }            
             }
             
             
             $scope.qpercentage = $window.Math.floor((100 * $scope.qscore) / $scope.totalQues);  
             //alert("Percentage >>>>>> : "+$scope.qpercentage+" : "+$scope.qscore+" : "+$scope.totalQues);
			answeredAll = 0;		  
            for (var k = 1; k <= $scope.totalQues; k++) {
				if($scope.answerArr[k-1]!="")
				{
					answeredAll++;
				}              
			}
             if(answeredAll == $scope.totalQues){
                         
                    if($scope.qpercentage >= 80){

                        $scope.feedback = $scope.results[0].feedback1;
                        $scope.comment = $scope.results[0].comment1;
                        dataService.dataObj.assesmentPass = 1;
                        dataService.dataObj.tracking = "completed";

                        // $scope.tracking[dataService.dataObj.curModId] = 1;
                      $rootScope.assessmentComplete(dataService.dataObj.assesmentPass, dataService.dataObj.tracking );
                       //alert("Percentage >>>>>> : "+$scope.percentage+" : "+$scope.tracking);
                       // $scope.quizComplete = "notComplete";


                    }else {
                        //alert("Percentage Low >>>>>> : "+$scope.qpercentage);
                        $scope.feedback = $scope.results[0].feedback2;
                        $scope.comment = $scope.results[0].comment2;	 
                        dataService.dataObj.assesmentPass = 0;
                        dataService.dataObj.tracking = "active";
                    }

                }
			//alert($scope.comment);
              $scope.quizComplete = true;
          }
         
         
          
          $scope.mover = function () {
             //alert("mover : "+$scope.buttonStyle)
             if( $scope.buttonStyle != "disabled"){
               $scope.buttonStyle="mouseover";
             }
            
          };
        
          $scope.mleave = function () {
                // alert("mleave : "+$scope.buttonStyle)
                  if( $scope.buttonStyle != "disabled"){
                        $scope.buttonStyle="mouseleave";
                  }
          };
           $scope.mover1 = function () {
                if( $scope.buttonStyle1 != "disabled"){
                    $scope.buttonStyle1="mouseover";
                }
          };
        
             $scope.mleave1 = function () {
                 if( $scope.buttonStyle1 != "disabled"){
                    $scope.buttonStyle1="mouseleave";
                 }
          };
          $scope.mover2 = function () {
              
                    $scope.buttonStyle2="mouseover";
              
          };
        
             $scope.mleave2 = function () {
               
                    $scope.buttonStyle2="mouseleave";
             
          };
		  $scope.mover3 = function () {
                if( $scope.buttonStyle3 != "disabled"){
                    $scope.buttonStyle3="mouseover";
                }
          };
        
             $scope.mleave3 = function () {
                 if( $scope.buttonStyle3 != "disabled"){
                    $scope.buttonStyle3="mouseleave";
                 }
          };
         
          
          $scope.canShowResults = function() {
          
			 if($scope.quizComplete == true){
                 //alert("canShowResults >>");
                 $scope.canShowQResults();  
                
					return true;     
			   }		   
			   else
			   {
					return false;
			   }			
          }
          
          $scope.canShowRetry = function() {
          
			 if($scope.qpercentage < 80){
                
                	return true;     
			   }		   
			   else
			   {
					return false;
			   }			
          }
          
          $scope.canShowQResults = function() {   
             
			 if( $scope.quizComplete == false){	
                 //alert("canShowQResults");
					return true;     
			   }		   
			   else
			   {                   
                   //alert("canShowQResults");
					return false;
			   }		

          }

          $scope.getVal=function(value){
				$scope.answerArr[$scope.quesCnt-1]=value;
              // alert($scope.answerArr);
              //$scope.isSelected = false;
                $scope.value = value;
               // $scope.isSelected = true;  
				if($scope.quesCnt == $scope.totalQues)
				{
					$scope.isEnabled = true;
					$scope.buttonStyle1="disabled";
					$scope.isDisabled = false;
					$scope.buttonStyle="";
				}else{
					$scope.isEnabled = false;
					$scope.buttonStyle1="";
				}				
          }         
           $scope.retryQuiz = function() {
               //$scope.getQues = $scope.shuffleArray( $scope.quesArr);
                 answeredAll = 0;	
                  window.quizScore = 0;
                  $scope.qscore = 0;
                  $scope.quesCnt = 1;
				  $scope.value = "";
                 $scope.quizComplete = false;
                 // alert(" $scope.quesArr : "+ $scope.quesArr);
                  $scope.qpercentage = 0;
                  $scope.numofQues=[];
                  $scope.getQues = $scope.shuffleArray($scope.quesArr);
                  for (var k = 1; k <= $scope.totalQues; k++) {
					$scope.answerArr[k-1]="";
                     $scope.numofQues.push({ 
                         id : k,
                         val:$scope.getQues[k-1], 
                         activeQuiz: "active",
                     });
              
                }
                $scope.numofQues[0].activeQuiz = "finished";
                $scope.questions = $scope.questionObj;
                //alert(" $scope.quesArr : "+ $scope.getQues);
                  
                $scope.canShowResults();  
                $scope.isDisabled = true;
				$scope.isEnabled = true;              
				$scope.isBackEnabled = true; 
				$scope.buttonStyle="disabled";
                $scope.buttonStyle1="disabled";
			    $scope.buttonStyle3="disabled";
				qcount = 1;
                //$rootScope.assessmentComplete("completed", 1, $scope.getQues.length);
           }
          $scope.prevQues = function(array) {   
              
              qcount--;
              $scope.buttonText= "Submit";
			  answeredAll = 0;		  
            for (var k = 1; k <= $scope.totalQues; k++) {
				if($scope.answerArr[k-1]!="")
				{
					answeredAll++;
				}              
			}
			if(answeredAll==$scope.totalQues)
			  {
				$scope.isDisabled = false;
				$scope.buttonStyle="";
			  }else
			  {
				$scope.isDisabled = true;
				$scope.buttonStyle="disabled";
			  }
              $scope.isEnabled = false;              
			  $scope.isBackEnabled = false; 
              //$scope.value = "";
              
              $scope.buttonStyle1="";
			  $scope.buttonStyle3="";
              $scope.isOptionsDisabled="active";
              $scope.isSelected=false;
			  $scope.value = $scope.answerArr[qcount-1];
			  //alert($scope.value+"***"+$scope.answerArr[qcount-1]);
			  
			 
			 // var value = ('input[name="q1"]:checked').val();
			
			
            if($scope.quesCnt >= 1){

                 $scope.quesCnt = $scope.quesCnt-1;
                 if($scope.quesCnt > $scope.totalQues){
                     
                   // $scope.quizComplete = $scope.quesCnt;

                  }
                 for (var i = 0; i < $scope.numofQues.length; i++) {
                     
                    $scope.numofQues[i].activeQuiz = "active";					

                }
                $scope.numofQues[$scope.quesCnt-1].activeQuiz ="finished";  
             }
			  if($scope.quesCnt == 1)
			  {
					 $scope.buttonStyle3="disabled";
					 $scope.isBackEnabled = true; 
			  }
         

        } 
          $scope.nextQues = function(array) {   
              
              qcount++;
              $scope.buttonText= "Submit";
			answeredAll = 0;
            for (var k = 1; k <= $scope.totalQues; k++) {
				if($scope.answerArr[k-1]!="")
				{
					answeredAll++;
				}              
			}
			//alert(answeredAll+" &&& "+$scope.totalQues);
			if(answeredAll==$scope.totalQues)
			  {
				$scope.isDisabled = false;
				$scope.buttonStyle="";
			  }else
			  {
				$scope.isDisabled = true;
				$scope.buttonStyle="disabled";
			  }
                           
			  $scope.isBackEnabled = false; 
              $scope.value = "";
             
              
              $scope.buttonStyle3="";
              $scope.isOptionsDisabled="active";
              $scope.isSelected=false;
			 
            if($scope.answerArr[qcount-1] != "")
			{
				  $scope.value = $scope.answerArr[qcount-1];
				   //alert(qcount+"***"+$scope.totalQues);
				  if(qcount != $scope.totalQues)
				  {
				   $scope.isEnabled = false;
				   $scope.buttonStyle1="";
				   }else
				   {
				   $scope.isEnabled = true;
				   $scope.buttonStyle1="disabled";
				   }
			}else
			{
					$scope.isEnabled = true;
				   $scope.buttonStyle1="disabled";
			}
			
              if(qcount <= $scope.totalQues){

                 $scope.quesCnt = $scope.quesCnt+1;
                 for (var i = 0; i < $scope.numofQues.length; i++) {
                     
                    $scope.numofQues[i].activeQuiz = "active";					

                }
                $scope.numofQues[$scope.quesCnt-1].activeQuiz ="finished";
                  
                //$scope.qpercentage = $window.Math.floor((100 * $scope.qscore) / $scope.totalQues);  

               
                  
             }      

        }
	});