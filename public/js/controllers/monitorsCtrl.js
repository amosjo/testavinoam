function MonitorsCtrl($scope, $http, commServiceFactory) {
  $scope.main.selectedTab = 4;

  $scope.isSelectDecoderVisible = false;
  $scope.isMonitorSelectedVisible = false;
  $scope.selectedMonitor = {};
  $scope.selectedMonitorIndex;
  $scope.monitors = [];
  $scope.decoders = [];
  $scope.rooms = [];
  $scope.isNameExist = false;
  $scope.isUSERExist = false;
  $scope.isDeleteall = false;
  $scope.isOccupyll = false;
  $scope.delallsure ={};
  $scope.occ={};

var mond="monitor";

  $scope.monitorTypes = [{id: "monitor", translate:"מוניטור"}, 
                        {id: "speaker", translate:"ספיקר"}, 
                        {id: "matrix", translate:"מטריצה"}, 
                        {id: "projector", translate:"פרוז'קטור"}];

  commServiceFactory.getJson("monitors/monitorlist")
  .success(function(data){
      $scope.monitors = data;
  $scope.monitors.splice(0, 1);
  })
  .error(function(error){
    $scope.monitors = [];
  });

  commServiceFactory.getJson("decoders/decoderslist")
  .success(function(data){
      $scope.decoders = data;
  })
  .error(function(error){
    $scope.decoders = [];
  });

    commServiceFactory.getJson("rooms/roomlist")
  .success(function(data){
      $scope.rooms = data;
  })

  .error(function(error){
    $scope.rooms = [];
  });

  $scope.currentMonitorIndex = 0;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// OCCUPY  begin here /////////////////////////////////////////////////



// FUNCTION TO UP OCCUPY FORM


  $scope.addRooms = function(){

  $scope.isOccupyll = true;
   
 

 }



// FUNCTION TO CANCEL OCCUPY FORM


  $scope.canceloccall = function(){

  $scope.isOccupyll = false;
   
 

 }



// FUNCTION TO  OCCUPY ROOMS


  $scope.occall = function(){


 console.log($scope.occ.num);

 console.log($scope.rooms);



var iata = {
       "user_name": $scope.occ.num
    }



for(var y=0;y<$scope.rooms.length;y++){


for(var x=0;x<$scope.occ.num;x++){



console.log($scope.rooms[y].name+x);

// $scope.selectedMonitor.name=$scope.rooms[y].name+x;

// $scope.selectedMonitor.monitor_id=$scope.rooms[y].id;

$scope.selectedMonitor.type=mond;

$scope.selectedMonitor.decoder_id="";

var monin={

"name": $scope.rooms[y].name+x,
"type": mond,
"decoder_id": ""

}



$http.post("/monitors/monitorlist", {monitor:monin}).
        then(res => {if (res.status == 200) {
           console.log('back is good');
          $scope.monitors.push(res.data);
}});


}


}


$scope.isOccupyll = false;

$scope.occ.num=null;
    

}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// OCCUPY  ends here /////////////////////////////////////////////////












//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



// FUNCTION TO DELETE ALL MONITORS FROM DB


  $scope.deleteALL = function(index){


   $scope.isUSERExist = false;


   $scope.isDeleteall = true;
   
 

 }






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



// FUNCTION TO DELETE ALL MONITORS FROM DB


  $scope.delall = function(){


var jata = {
       "user_name": $scope.delallsure.name,
       "password": $scope.delallsure.password
    }


  $http.post("/login/user",jata).then(function (response) {
                console.log('answer db is');
                console.log(response.data);
if(response.data.status=="fail"){

console.log('login fail');

$scope.delallsure={};

$scope.isUSERExist = true;
    
}else{
 var del = "delete now";   
     console.log(del);
    var kata = {
       "del_name": "ok"
    }
   console.log(kata);
      $http.post("/monitors/remove-all",kata).then(function (response) {
                console.log(response.data);
              });
      $http.post("/monitors/remove-all",kata).then(function (response) {
                console.log(response.data);
              });
  $scope.delallsure={};
  $scope.monitors = [];
  $scope.isDeleteall = false;
}

});
 

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



// FUNCTION TO DELETE ALL MONITORS FROM DB


  $scope.canceldelall = function(){

   
   $scope.isDeleteall = false;
 

 }




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////








  $scope.openMonitorDialog = function(monitor, index){
    
     $scope.isMonitorSelectedVisible = true;
     $scope.selectedMonitor = monitor;
     console.log("selectedMonitor", monitor);
     $scope.copyOfSelectedMonitor = Object.assign({}, monitor);
     $scope.selectedMonitorIndex = index;
  }

  $scope.cancelMonitor = function(){
    $scope.isNameExist = false;
    $scope.monitors[$scope.selectedMonitorIndex] = $scope.copyOfSelectedMonitor;
    $scope.isMonitorSelectedVisible = false;
  }

  $scope.saveMonitor = function(){

    // monitor id is defined means updating. 
    if ($scope.selectedMonitor.monitor_id){
        $http.put("/monitors/monitorlist/" + $scope.selectedMonitor.monitor_id, {updatedMonitor: $scope.selectedMonitor}
                  ).then(data => {
                    console.log("update");
                    $scope.isMonitorSelectedVisible = false;
                  });
    }else{




 console.log('name of new monitor is ' +$scope.selectedMonitor.name);



var newmon = {

      "mon_name": $scope.selectedMonitor.name

    }


   console.log('name of newmon is ' +newmon);





////////////////start of validation ////////////////////





$http.post("/monitors/valid_name",newmon)
            .then(function (response) {
                console.log('name status');
                console.log(response.data);

if(response.data=="name not exist"){

     console.log('ok to save monitor');

      $http.post("/monitors/monitorlist", {monitor:$scope.selectedMonitor}).
        then(res => {if (res.status == 200) {
           console.log('back is good');
          $scope.monitors.push(res.data);
}else{
console.log('bad answer');}});
          $scope.isMonitorSelectedVisible = false;

}else{


$scope.isMonitorSelectedVisible = true;

   $scope.isNameExist = true;


   console.log('we can not enter the new monitor');



}


});






////////////////end of validation ////////////////////




}





    
    $scope.dialog = {
      "title": $scope.main.lang.menu.users,
      "isVisible": false,
      "buttonText": $scope.main.lang.close,
      "content": $scope.main.lang.users.data_was_saved
    }

    $scope.dialog.content = $scope.main.lang.users.password_error;
    $scope.dialog.isVisible = true;

// $scope.isMonitorSelectedVisible = false;





}














  $scope.dialogClose = function (){
    $scope.dialog.isVisible = false;
  }

  $scope.deleteMonitor = function(){
    $scope.isNameExist = false;
    $scope.selectedMonitor = $scope.copyOfSelectedMonitor;

    $http.delete("/monitors/monitorlist/" + $scope.selectedMonitor.monitor_id).
      then(res => {
                if (res.status == 200) {
                  $scope.monitors.splice($scope.selectedMonitorIndex, 1);
                }
              });

    $scope.isMonitorSelectedVisible = false;
  }

  $scope.addMonitor = function(){

    $scope.openMonitorDialog({});
  }

  $scope.selectDecoder = function(){

    $scope.isSelectDecoderVisible = true;
  }

  $scope.selectDecoderDialogOk = function(){
    $scope.isSelectDecoderVisible = false;
  }

  $scope.decoderSelected = function(encoderIndex){
    console.log("encoderIndex:" + encoderIndex);
    $scope.selectedMonitor.decoder = $scope.decoders[encoderIndex];
    console.log("decoder  is :" + $scope.selectedMonitor.decoder);
    console.log("decoder name is :" + $scope.selectedMonitor.decoder.name);
    $scope.isSelectDecoderVisible = false;

    // CONNECT DECODER
    // var monitor_id = $scope.monitors[$scope.currentMonitorIndex].monitor_id;
    // var decoder_id = $scope.decoders[encoderIndex].decoder_id;
    // $http.post("/monitors/set_decoder",{"monitor_id": monitor_id, "decoder_id": decoder_id})
    //         .then(function (response) {
    //             console.log(response.data);
    //           });


    // commServiceFactory.getJson("monitors/monitor/1?mon_id=" + $scope.monitors[$scope.currentMonitorIndex].id + "&cmd=on")
    // .success(function(data){
    //     console.log(data);
    // });

  }

  $scope.decoderDisconnect = function(){
    $scope.monitors[$scope.currentMonitorIndex].decoder = undefined;
    $scope.isSelectDecoderVisible = false;

    // DISCONNECT DECODER
    var monitor_id = $scope.monitors[$scope.currentMonitorIndex].monitor_id;
    $http.post("/monitors/set_decoder",{"monitor_id": monitor_id, "decoder_id": ""})
            .then(function (response) {
                console.log(response.data);                
              });

    commServiceFactory.getJson("monitors/monitor/1?mon_id=" + $scope.monitors[$scope.currentMonitorIndex].id + "&cmd=off")
    .success(function(data){
        console.log(data);
    });
  }
}
