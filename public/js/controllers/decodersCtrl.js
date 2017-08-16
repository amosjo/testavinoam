function DecodersCtrl($scope, $http, commServiceFactory, $location ) {
  $scope.main.selectedTab = 3;

  $scope.isPropertiesDialogVisible = false;

  $scope.isNameExist = false;

  $scope.isADDRExist = false;

  $scope.isAlignVisible = false;

  $scope.room_det = null;


  var oldip = null;

  $scope.delallsure ={};

  var future = "for future declare";




var upip=null;

var upname=null;


var testip=null;


  $scope.rooms = [];

 $scope.allDecoders = [];




// DEFINE A NEW DECODER TEMPLATE

 

  $scope.defineDecoder={};


$scope.defineDecoder.monaddr = future;

$scope.defineDecoder.monport = future;

$scope.defineDecoder.montime = future;


$scope.alignDecoders={};


$scope.alignDecoders.monaddr = "";

$scope.alignDecoders.monport = "";

$scope.alignDecoders.montime = "";




// CHOICES FOR SELECTING THE RESOLUTION 

  $scope.fvos = ["AUTO", "1080p_60", "1080p_50","1080p_30","1080p_25","1080p_24","720p_60","720p_50","576p_50","480p_60","1080p_50","1080p_50","1080p_50"];


  $scope.decoders = [];
  $scope.selectedDecoderId = 0;
  $scope.selectedDecoder = null;

  commServiceFactory.getJson("decoders/decoderslist")
  .success(function(data){
      $scope.decoders = data;
  })
  .error(function(error){
    $scope.decoders = [];
  });


$scope.encodersToDecoders = function(){
     $location.path('/decodersConfig');
  }



// CANCEL DELETE 


   $scope.canceldelete = function(x){
    $scope.isSureDialogVisible = false;
  }



// POPULATE THE ROOM LIST FOR THE ADDING FORM 



 commServiceFactory.getJson("rooms/roomlist")
  .success(function(data){
      $scope.rooms = data;
  })
  .error(function(error){
    $scope.rooms = [];
  });



$scope.cancelDecoder = function(){
    $scope.decoders[$scope.selectedDecoderIndex] = $scope.copyOfSelectedDecoder;
    $scope.defineDecoder={};
    $scope.isDecoderSelectedVisible = false;
    $scope.isNameExist = false;
    $scope.isADDRExist = false;
$scope.defineDecoder.monaddr = future;

$scope.defineDecoder.monport = future;

$scope.defineDecoder.montime = future;

  }



// OPTIONS FOR TYPE 

$scope.decoderTypes = [{id: "decoder", translate:"decoder"}, 
                        {id: "streamer", translate:"streamer"},
                        {id: "computer", translate:"pc"} 
];



// OPTIONS FOR MODEL


$scope.decoderModels = [{id: "dohes", translate:"IPD1000"}, 
                        {id: "streamer1", translate:"MXQ"},
                        {id: "camera1", translate:"provision"}  
                       ];





// ADD DECODER FUNCTION 


$scope.addDecoder = function(){


    console.log('adding');

    $scope.openDecoderDialog({});

}



// OPEN THE DIALOG  


$scope.openDecoderDialog = function(monitor, index){
    
     $scope.isDecoderSelectedVisible = true;
    
  }





 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



// VALIDATE FOR SAVE DECODER FUNCTION


$scope.saveDecoder = function(){


 console.log('start saving');


  $scope.isNameExist = false;

  $scope.isADDRExist = false;


var instat = "none";


var yata = {

      "de_name": $scope.defineDecoder.name,
      "de_room": $scope.defineDecoder.room_id,  
    //  "de_id": $scope.defineDecoder.id,  
    // "de_mac": $scope.defineDecoder.mac,   
      "de_ip": $scope.defineDecoder.ip,
      "de_type": $scope.defineDecoder.type,
      "de_model": $scope.defineDecoder.model

    }


                console.log(yata);

    $http.post("/decoders/valid_ip",yata)
            .then(function (response) {
                console.log(response.data);
                if(response.data == "ip already exist"){
                    $scope.isADDRExist = true;
    $http.post("/decoders/valid_name",yata)
            .then(function (response) {
                if(response.data == "name already exist"){
                   $scope.isNameExist = true;
                } 
              });


    }else{
    $http.post("/decoders/valid_name",yata)
            .then(function (response) {
                console.log('name status');
                console.log('instat is '+instat);
                console.log(response.data);
                if(response.data == "name already exist"){
                   $scope.isNameExist = true;
                } else{

console.log('ok to save');
   
 $http.post("/decoders/add",yata).then(function (response) {
                console.log(response.data);
              });

      $scope.isDecoderSelectedVisible = false;
      $scope.decoders.push($scope.defineDecoder);
      $scope.defineDecoder={};

}


});


}

}); 



}





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////








  $scope.openProperties = function(index){
    $scope.isPropertiesDialogVisible = true;
    $scope.room_det = $scope.decoders[index].room_id;
    $scope.selectedDecoderId = index;
    $scope.selectedDecoder = angular.copy($scope.decoders[index]);

    getDeviceProperties();

  }

  var getDeviceProperties = function(){
    var msg = "loading...";

    $scope.selectedDecoder.properties = 
    {
      "device_ip": msg,
      "ip_mode": msg,
      "net_mask": msg,
      "low_delay": msg,
      "fvo":msg,
      "color_space": msg,
      "stream_ip": msg,
      "stream_port": msg,
      "status_timer": msg,
      "name": msg,
      "master_status_url":msg,
      "slave_status_url": msg,
      "master_live_url": msg,
      "slave_live_url": msg,
      "time_stamp": msg
    }
    
       var data = {"ip":$scope.selectedDecoder.ip};

    $http.post("/decoders/getDecoderProperties", data)
        .then(function (response) {
          console.log("response.data");
           console.log(response.data);
           $scope.selectedDecoder.properties = response.data;

upip=$scope.selectedDecoder.properties.device_ip;
upname=$scope.selectedDecoder.properties.name;



console.log('name is '+upname);
console.log('ip is '+upip);
            
          },function (response) {
            var msg = "Error loading data";

            $scope.selectedDecoder.properties = {
              "device_ip": msg,
              "ip_mode": msg,
              "net_mask": msg,
              "low_delay": msg,
              "fvo":msg,
              "color_space": msg,
              "stream_ip": msg,
              "stream_port": msg,
              "status_timer": msg,
              "name": msg,
              "master_status_url":msg,
              "slave_status_url": msg,
              "master_live_url": msg,
              "slave_live_url": msg,
              "time_stamp": msg
            }
    
          });
  }



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////




// SAVE DECODER FUNCTION




  $scope.propertiesDialogDialogOk = function(){
    $scope.decoders[$scope.selectedDecoderId] = $scope.selectedDecoder;



// HAVE TO SAVE THE OLD IP IN ORDER TO CONNECT TO THE DECODER BEFORE CHANGE HIM TO THE NEW IP 


 oldip = $scope.selectedDecoder.ip;


// THE VALIDATION MIGHT BE CHANGE , KEEP IT FOR THE MEAN TIME 



    var kata = {
      "de_id": $scope.selectedDecoder.decoder_id,
      "de_name": $scope.selectedDecoder.properties.name,
      "de_ip":  $scope.selectedDecoder.properties.device_ip,
     // "mac":  $scope.selectedDecoder.mac,
      // "encoder_id":  $scope.selectedDecoder.encoder_id,
      "de_room":  $scope.selectedDecoder.room_id
    }


console.log('kata is ' +kata.de_room);




if((upip != $scope.selectedDecoder.properties.device_ip)&&(upname != $scope.selectedDecoder.properties.name)){
               console.log('check ip and name');
                 $http.post("/decoders/valid_ip",kata)
            .then(function (response) {
                console.log('response from ip valid is ');
                console.log(response.data);
                if(response.data == "ip already exist"){
                  

            $http.post("/decoders/valid_name",kata)
            .then(function (response) {
                console.log('response from name valid is ');
                console.log(response.data);
                if(response.data == "name already exist"){
                   
                    console.log('***ip and name exist');

      $scope.isADDRExist = true;

    $scope.isNameExist = true;

                     }


              }); 


           console.log('***ip  exist');

       $scope.isADDRExist = true;


              }else{


                 $http.post("/decoders/valid_name",kata)
            .then(function (response) {
                console.log('response from name valid is ');
                console.log(response.data);
                if(response.data == "name already exist"){
                   
                  console.log('***name  exist');

             $scope.isNameExist = true;


                     } else{



// put here set


console.log('set changes after both name and ip changed');


$scope.sender();



 var rdata = {
      "ip":  $scope.selectedDecoder.ip
    }

    console.log(rdata);

    $http.post("/decoders/reboot", rdata)
            .then(function (response) {
                console.log(response.data);
              });





    var delchname = {
       "del_name": upname
    }


   console.log('delete name is '+upname);



      $http.post("/decoders/remove",delchname).then(function (response) {
                console.log(response.data);
              });



$http.post("/decoders/add",kata).then(function (response) {
                console.log(response.data);
              });



}  



});



}


}); 


}else{


if(upip != $scope.selectedDecoder.properties.device_ip){

console.log('only ip changed');


 $http.post("/decoders/valid_ip",kata)
            .then(function (response) {
                console.log('response from ip valid is ');
                console.log(response.data);
                if(response.data == "ip already exist"){

console.log('ip existtttt');

 $scope.isADDRExist = true;


}else{



$scope.sender();


 var rdata = {
      "ip":  $scope.selectedDecoder.ip
    }

    console.log(rdata);

    $http.post("/decoders/reboot", rdata)
            .then(function (response) {
                console.log(response.data);
              });


    var delchname = {
       "del_name": upname
    }


   console.log('delete name is '+upname);



      $http.post("/decoders/remove",delchname).then(function (response) {
                console.log(response.data);
              });



$http.post("/decoders/add",kata).then(function (response) {
                console.log(response.data);
              });






}



}); 



}else{




if(upname != $scope.selectedDecoder.properties.name){


console.log('only name changed');


$http.post("/decoders/valid_name",kata)
            .then(function (response) {
                console.log('response from name valid is ');
                console.log(response.data);
                if(response.data == "name already exist"){

console.log('name existtttt');


 $scope.isNameExist = true;


}else{





$scope.sender();


    var delchname = {
       "del_name": upname
    }


   console.log('delete name is '+upname);



      $http.post("/decoders/remove",delchname).then(function (response) {
                console.log(response.data);
              });



$http.post("/decoders/add",kata).then(function (response) {
                console.log(response.data);
              });








}





}); 







}else{



console.log('set without changes');


if( $scope.room_det!= $scope.selectedDecoder.room_id){

    console.log('room changes');

    var delchname = {
        "del_name": upname
    }

    $http.post("/decoders/remove",delchname).then(function (response) {
        console.log(response.data);
    });



    $http.post("/decoders/add",kata).then(function (response) {
        console.log(response.data);
    });





}


$scope.sender();




}



}







}



  }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////


  $scope.sender = function(){



console.log(oldip);



 var sata = {
      "old_ip": oldip,
      "device_ip": $scope.selectedDecoder.properties.device_ip,
      "ip_mode": $scope.selectedDecoder.properties.ip_mode,
      "net_mask":  $scope.selectedDecoder.properties.net_mask,
      "low_delay":  $scope.selectedDecoder.properties.low_delay,
      "fvo":  $scope.selectedDecoder.properties.fvo,
      "color_space":  $scope.selectedDecoder.properties.color_space,
      "stream_ip":  $scope.selectedDecoder.properties.stream_ip,
      "stream_port":  $scope.selectedDecoder.properties.stream_port,
      "status_timer":  $scope.selectedDecoder.properties.status_timer,
      "name":  $scope.selectedDecoder.properties.name,
      "master_status_url":  $scope.selectedDecoder.properties.master_status_url,
      "slave_status_url":  $scope.selectedDecoder.properties.slave_status_url,
      "master_live_url":  $scope.selectedDecoder.properties.master_live_url,
      "slave_live_url":  $scope.selectedDecoder.properties.slave_live_url,
      "time_stamp":  $scope.selectedDecoder.properties.time_stamp
    }

            
  console.log('send sata is');

  console.log(sata);



                

   // SEND IT TO A NEW FUNCTION IN THE DECODER ROUTER 



    $http.post("/decoders/send_decoder",sata).then(function (response) {
                console.log(response.data);
              });


 $scope.isPropertiesDialogVisible = false;



$scope.selectedDecoder.name=$scope.selectedDecoder.properties.name;

$scope.decoders.push($scope.selectedDecoder);


$scope.decoders.splice($scope.selectedDecoderId, 1);


  $scope.isADDRExist = false;

    $scope.isNameExist = false;





}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



//FUNCTION TO DELETE THE DECODER FROM THE DB AND FROM THE UI ALSO 


  $scope.propertiesDialogDialogdelete = function(index){
   

   console.log($scope.selectedDecoderId);


   $scope.selectedDecoderIndex=index;

   $scope.isSureDialogVisible = false;

     var del = "delete now";


     $scope.defineDecoder={};

   
   



    var kata = {
       "del_name": $scope.selectedDecoder.name
    }


   console.log(kata);


  console.log(del);



      $http.post("/decoders/remove",kata).then(function (response) {
                console.log(response.data);
              });



  $scope.isADDRExist = false;

    $scope.isNameExist = false;




$scope.decoders.splice($scope.selectedDecoderId, 1);

 

 }






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////




// FUNCTION TO LOAD THE DELETE SURE DIALOG BOX 


   $scope.delsure = function(){
    $scope.isPropertiesDialogVisible = false;
    $scope.isSureDialogVisible = true;
  }













//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



// FUNCTION TO DELETE ALL DECODERS FROM DB


  $scope.deleteALL = function(index){


   $scope.isUSERExist = false;


   $scope.isDeleteall = true;
   
 

 }






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



// FUNCTION TO DELETE ALL DECODERS FROM DB


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
      $http.post("/decoders/remove-all",kata).then(function (response) {
                console.log(response.data);
              });
  $scope.delallsure={};
  $scope.decoders = [];
  $scope.isDeleteall = false;
}

});
 

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  begin here /////////////////////////////////////////////////



// FUNCTION TO DELETE ALL DECODERS FROM DB


  $scope.canceldelall = function(){

   
   $scope.isDeleteall = false;
 

 }




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////// AMOS  ends here /////////////////////////////////////////////////





$scope.align = function(){
     $scope.isAlignVisible = true;
  }


$scope.cancelAlign = function(){

$scope.alignDecoders.monaddr = "";

$scope.alignDecoders.monport = "";

$scope.alignDecoders.montime = "";

$scope.isAlignVisible = false;

}



$scope.operDecoders = function(){


var urler = $scope.alignDecoders.monaddr+':'+$scope.alignDecoders.monport+'/get-alarm';


console.log(urler);








for(var i=0;i<$scope.decoders.length;i++){



console.log($scope.decoders[i].ip);




       var data = {"ip":$scope.decoders[i].ip};

    $http.post("/decoders/getDecoderProperties", data)
        .then(function (response) {
          console.log("response.data");
           console.log(response.data);
// $scope.allDecoders[i]=response.data;


var sata = {
      "old_ip": response.data.device_ip,
      "device_ip": response.data.device_ip,
      "ip_mode": response.data.ip_mode,
      "net_mask":  response.data.net_mask,
      "low_delay":  response.data.low_delay,
      "fvo":  response.data.fvo,
      "color_space":  response.data.color_space,
      "stream_ip":  response.data.stream_ip,
      "stream_port":  response.data.stream_port,
      "status_timer":  $scope.alignDecoders.montime,
      "name":  response.data.name,
      "master_status_url":  urler,
      "slave_status_url":  response.data.slave_status_url,
      "master_live_url":  response.data.master_live_url,
      "slave_live_url":  response.data.slave_live_url,
      "time_stamp":  response.data.time_stamp
    }

            
  console.log('send sata is');

  console.log(sata);



                

   // SEND IT TO A NEW FUNCTION IN THE DECODER ROUTER 



    $http.post("/decoders/send_decoder",sata).then(function (response) {
                console.log(response.data);
              });





});





}






$scope.alignDecoders.monaddr = "";

$scope.alignDecoders.monport = "";

$scope.alignDecoders.montime = "";

$scope.isAlignVisible = false;

}



    $scope.fieldTypeChanged = function(){

        console.log('cons is '+$scope.selectedDecoder.room_id);


    }





  $scope.propertiesDialogDialogReboot = function(){

    $scope.decoders[$scope.selectedDecoderId] = $scope.selectedDecoder;



  $scope.isADDRExist = false;

    $scope.isNameExist = false;


   $scope.isPropertiesDialogVisible = false;

    var data = {
      "ip":  $scope.selectedDecoder.ip
    }

    console.log(data);

    $http.post("/decoders/reboot", data)
            .then(function (response) {
                console.log(response.data);
              });
  }

  $scope.propertiesDialogDialogCancel = function(){
    $scope.isPropertiesDialogVisible = false;

$scope.isADDRExist = false;

    $scope.isNameExist = false;

  }


  $scope.currentDecoderIndex = 0;
}
