angular.module('tace', [])
  .controller('taceController', function($scope,$interval,$timeout) {
  
   var centerX = window.innerWidth / 2;
   var centerY = window.innerHeight / 2;

  $scope.calculateTrans =  function(diameter, angle) {
            var x = (diameter / 2 * Math.cos(0.017 * angle)) + "px";
            var y = (diameter / 2 * Math.sin(0.017 * angle)) + "px";
            return  {
              x:x,
              y:y
            };
        },
  $scope.circles = [{
            size: 200,
            loops:1,
            innercircles: [{
                angle: 40,
                opac:1,
                val:"c",
                x:0 ,
                y:0
             },{
                angle: 140,
                val:"t",opac:1,
                x:0 ,
                y:0
             },{
                angle: 273,
                val:"e",opac:1,
                x:0 ,
                y:0
             }]
        },{
            size: 400,
            loops:1,
            innercircles: [{
                angle: 40,
                val:"c",opac:1,
                x:0 ,
                y:0
             },{
                angle: 140,
                x:0 ,
                 val:"t",opac:1,
                y:0
             },{
                angle: 273,
                 val:"e",opac:1,
                x:0 ,
                y:0
             }]
        },{
            size: 600,
            loops:1,
            innercircles: [{
                angle: 40,opac:1,
                val:"c",
                x:0 ,
                y:0
             },{
                angle: 140,
                 val:"t",opac:1,
                x:0 ,
                y:0
             },{
                angle: 273,
                 val:"e",opac:1,
                x:0 ,
                y:0
             }]
        }];
    $scope.msg={
        c:"You won Coffee today",
        t:"You won Tea today",
        e:"You won espress today",
        n:"Sorry !!,better luck next time",
        text:""
    };
    $scope.disable= false;
    $scope.afterDraw = function(){
         var initialVal = 0;
         var success = true;
         $scope.circles.forEach(function(val,indx){
               for(var i in val.innercircles){
                   if(val.innercircles[i].angle == 273){
                       if(indx == 0){
                          initialVal = val.innercircles[i].val; 
                       }
                       else if(success){
                           success = initialVal == val.innercircles[i].val;
                       }
                   }else{
                       val.innercircles[i].opac = 0.2;
                   }
               }
         });
             $scope.msg.text = $scope.msg[success?initialVal:"n"];
             $scope.disable= false;
    };
    $scope.drawCircles = function(){
                      $scope.msg.text =""; 
                      $scope.disable= true;
                      var randomLoops = [
                         Math.floor(Math.random() * (20 - 17 + 1) + 17),
                         Math.floor(Math.random() * (20 - 17 + 1) + 17),
                         Math.floor(Math.random() * (20 - 17 + 1) + 17)
                      ];
                      randomLoops.sort(function(a,b){return a - b});
                      var promises=[null,null,null];
                      var timer = 100; 
                      var timeout = (randomLoops[2] * timer) + 100;
                      $timeout(function(){
                         $scope.afterDraw();
                      },timeout);
                      $scope.circles.forEach(function(val,indx){
                            (function(localindx,loops){
                                promises[localindx] = $interval(function() {
                                     loops--; 
                                    if (loops < 0)
                                            $interval.cancel(promises[localindx]);
                                    else{
                                       val.innercircles.forEach(function(ival,iindx){
                                            ival.angle = ival.angle == 40 ? 140 : ival.angle == 140 ? 273 : 40;
                                            var trans = $scope.calculateTrans(val.size,ival.angle);
                                            ival.opac =1;
                                            ival.x = trans.x;
                                            ival.y = trans.y;
                                        });
                                    }
                                    },timer);
                            })(indx,randomLoops[indx]);
                      });
               
                      
    };
});