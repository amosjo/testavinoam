function SearchCtrl($scope, $http, commServiceFactory) {
    console.log("SearchCtrl");
    $scope.main.selectedTab = 9;

    $scope.devicesFound = [];
    $scope.search_segment = "10.10.100.";
    $scope.isSearching = false;
    $scope.isDBin = false;
    $scope.isDecoderSelectedVisible = false;
    $scope.isEncoderSelectedVisible = false;

var olddecip = null;

var decindex = null;


$scope.aftersave = [];

var d=0;



 $scope.isNameExist = false;

 $scope.isADDRExist = false;

// var encdef="דוחס";

// var decdef="פורס";

var defroom="";


 $scope.rooms = [];


  $scope.defineDecoder={};

  $scope.defineEncoder={};

 $scope.selectedDecoder = {};


$scope.defineDecoder.monaddr = "192.168.16.11";

$scope.defineDecoder.monport = "8080";

$scope.defineDecoder.montime = "7";



$scope.defineEncoder.monaddr = "192.168.16.11";

$scope.defineEncoder.monport = "8080";

$scope.defineEncoder.montime = "7";




/////////////////////////////////////////////////////////// START ADD DEVICES TO DB NEW ///////////////////////////////////


 $scope.addDevicesToDbnew = function(){


 console.log($scope.devicesFound.length);



 console.log('starting loop to import all items');


 console.log($scope.devicesFound.length);


for(var i=0;i<$scope.devicesFound.length;i++)
{



if($scope.devicesFound[i].type=='decoder'){




 $scope.getdecodernew($scope.devicesFound[i].name,$scope.devicesFound[i].ip,$scope.devicesFound[i].type,$scope.devicesFound[i].model,$scope.devicesFound[i].version);



////////////////  end of if decoder  ///////////////////////////


}



if($scope.devicesFound[i].type=='encoder'){


console.log($scope.devicesFound[i].name +' is encoder ' );


 $scope.getencodernew($scope.devicesFound[i].name,$scope.devicesFound[i].ip,$scope.devicesFound[i].type,$scope.devicesFound[i].model,$scope.devicesFound[i].version);



}




}



$scope.devicesFound.splice(0, $scope.devicesFound.length);


// $scope.populate();





                
//// end of for loop 


////  here we load a screen which tell the user which items didnt pass the validation check and also we recommend him to change names in the encoders/decoders screens 




}








///////////////////////////////////////////////////////////END ADD DEVICES TO DB NEW ///////////////////////////////////




///////////////////////////////////////////////////////////START OF GET DECODERS TO DB ///////////////////////////////////



 $scope.getdecodernew = function(name,ip,type,model,version){



console.log('decoder to get is '+name+ip+type+model+version );


var deitem = {

      "de_name": name,
      "de_room": defroom,  
    //  "de_id": $scope.defineDecoder.id,  
    // "de_mac": $scope.defineDecoder.mac,   
      "de_ip": ip,
      "de_type": type,
      "de_model": model

    }




    $http.post("/decoders/valid_ip",deitem)
            .then(function (response) {
                console.log(response.data);
                if(response.data == "ip already exist"){                             
                  //  $scope.isADDRExist = true;
    $http.post("/decoders/valid_name",deitem)
            .then(function (response) {
                if(response.data == "name already exist"){
                 //  $scope.isNameExist = true;
                } 
              });




$scope.devicesFound.push({
"ip":ip,
"name":name,
"type":type,
"model":model,
"version":version
});



            
    }else{
    $http.post("/decoders/valid_name",deitem)
            .then(function (response) {
                console.log('name status');
           //     console.log('instat is '+instat);
                console.log(response.data);
                if(response.data == "name already exist"){




$scope.devicesFound.push({
"ip":ip,
"name":name,
"type":type,
"model":model,
"version":version
});




                //   $scope.isNameExist = true;             
                } else{

console.log('ok to save');









   
 $http.post("/decoders/add",deitem).then(function (response) {
                console.log(response.data);
             //   console.log('sata is');
             //   console.log(sata);



  // $http.post("/decoders/send_decoder",sata).then(function (response) {
             //   console.log(response.data);
            //  });



// $scope.devicesFound.splice(num, 1);



});


}

}); 


}

}); 









}




///////////////////////////////////////////////////////////END OF GET DECODERS TO DB   ///////////////////////////////////















///////////////////////////////////////////////////////////START OF GET ENCODERS TO DB ///////////////////////////////////



 $scope.getencodernew = function(name,ip,type,model,version){


var multiv = "xxx";

var portv = "yyy";


$scope.unitEncoder ={};




console.log('encoder to get is '+name+ip+type+model+version );


var enitem = {

      "en_name": name,
      "en_room": defroom,  
    //  "en_id": $scope.defineEncoder.id,  
    // "en_mac": $scope.defineEncoder.mac,   
      "en_ip": ip,
      "en_multi": multiv,
      "en_port": portv,
      "en_type": type,
      "en_model": model

    }







    $http.post("/encoders/valid_ip",enitem)
            .then(function (response) {
                console.log(response.data);
                if(response.data == "ip already exist"){
                  //  $scope.isADDRExist = true;
    $http.post("/encoders/valid_name",enitem)
            .then(function (response) {
                if(response.data == "name already exist"){
                 //  $scope.isNameExist = true;
                } 
              });


$scope.devicesFound.push({
"ip":ip,
"name":name,
"type":type,
"model":model,
"version":version
});



    }else{
    $http.post("/encoders/valid_name",enitem)
            .then(function (response) {
                console.log('name status');
           //     console.log('instat is '+instat);
                console.log(response.data);
                if(response.data == "name already exist"){


$scope.devicesFound.push({
"ip":ip,
"name":name,
"type":type,
"model":model,
"version":version
});




                //   $scope.isNameExist = true;
                } else{

console.log('ok to save');



          
          // $scope.defineEncoder.multi_ip=response.data.media_dest_ip;
          // $scope.defineEncoder.multi_port=response.data.media_dest_port;
      


var enitemnew = {

      "en_name": name,
      "en_room": defroom,  
    //  "en_id": $scope.defineEncoder.id,  
    // "en_mac": $scope.defineEncoder.mac,   
      "en_ip": ip,
      "en_multi": response.data.media_dest_ip,
      "en_port": response.data.media_dest_port,
      "en_type": type,
      "en_model": model

    }


$http.post("/encoders/add",enitemnew).then(function (response) {
                console.log(response.data);
             //   console.log('sata is');
             //   console.log(sata);




});




   
 


}

}); 


}

}); 









}




///////////////////////////////////////////////////////////END OF GET ENCODERS TO DB   ///////////////////////////////////

















// POPULATE THE ROOM LIST FOR THE ADDING FORM 



 commServiceFactory.getJson("rooms/roomlist")
  .success(function(data){
      $scope.rooms = data;
  })
  .error(function(error){
    $scope.rooms = [];
  });



    

    $scope.startSearch = function(){
    $scope.isDBin = true;
        console.log("startSearch");
        $scope.isSearching = true;
        var data =  {"segment": $scope.search_segment}

        var test = false;
        if(test){
            $scope.devicesFound = [{"device_ip":"10.10.100.9","type":"decoder","model":"IPD1000","name":"IPD1000-341B2280126D","version":"v1.1.0.D70"},{"device_ip":"10.10.100.10","type":"decoder","model":"IPD1000","name":"IPD1000-341B22801A65","version":"v1.1.0.D70"},{"device_ip":"10.10.100.1","type":"encoder","model":"IPS3000","name":"IPS3000-asx","version":"v1.1.0.D70"},{"device_ip":"10.10.100.2","type":"encoder","model":"IPS3000","name":"IPS3000-341B22FAAA09","version":"v1.1.0.D70"}]
            $scope.isSearching = false;
            return;
        }

         $http.post("/devices/scan-new", data)
            .then(function (response) {
                console.log(response.data);
                $scope.devicesFound = response.data;
                $scope.isSearching = false;
            });
    }










 $scope.startSearchall = function(){
        $scope.isDBin = false;
        console.log("startSearch");
        $scope.isSearching = true;
        var data =  {"segment": $scope.search_segment}

        var test = false;
        if(test){
            $scope.devicesFound = [{"device_ip":"10.10.100.9","type":"decoder","model":"IPD1000","name":"IPD1000-341B2280126D","version":"v1.1.0.D70"},{"device_ip":"10.10.100.10","type":"decoder","model":"IPD1000","name":"IPD1000-341B22801A65","version":"v1.1.0.D70"},{"device_ip":"10.10.100.1","type":"encoder","model":"IPS3000","name":"IPS3000-asx","version":"v1.1.0.D70"},{"device_ip":"10.10.100.2","type":"encoder","model":"IPS3000","name":"IPS3000-341B22FAAA09","version":"v1.1.0.D70"}]
            $scope.isSearching = false;
            return;
        }

         $http.post("/devices/scan-all", data)
            .then(function (response) {
                console.log(response.data);
                $scope.devicesFound = response.data;
                $scope.isSearching = false;
            });
    }









$scope.cancelDecoder = function(){
    
    $scope.defineDecoder={};
    $scope.isDecoderSelectedVisible = false;

$scope.defineDecoder.monaddr = "192.168.16.11";

$scope.defineDecoder.monport = "8080";

$scope.defineDecoder.montime = "7";



$scope.defineEncoder.monaddr = "192.168.16.11";

$scope.defineEncoder.monport = "8080";

$scope.defineEncoder.montime = "7";

 $scope.isNameExist = false;

  $scope.isADDRExist = false;

 $scope.selectedDecoder = {};


    
  }



$scope.cancelEncoder = function(){
    
    $scope.defineEncoder={};
    $scope.isEncoderSelectedVisible = false;

$scope.defineDecoder.monaddr = "192.168.16.11";

$scope.defineDecoder.monport = "8080";

$scope.defineDecoder.montime = "7";



$scope.defineEncoder.monaddr = "192.168.16.11";

$scope.defineEncoder.monport = "8080";

$scope.defineEncoder.montime = "7";

 $scope.isNameExist = false;

  $scope.isADDRExist = false;

 $scope.selectedEncoder = {};


    
  }






    // Add all the Devices to the DB
    $scope.addDevicesToDb = function(){

 if($scope.isDBin==true){
        console.log("addDevicesToDb");
        var decoders = [];
        var encoders = [];
        for(var i=0;i<$scope.devicesFound.length;i++)
        {
            var device = $scope.devicesFound[i];
            if (device["type"] == "decoder")
            {
                decoders.push(device);
            } else if (device["type"] == "encoder")
            {
                encoders.push(device);
            }            
        }

        if( decoders.length > 0){
             var decodersData = {"decoders": angular.toJson(decoders)};
              // Add all Decoders        
            console.log(decodersData);
            sendDevices("decoder", decodersData);
        }
    
        if( encoders.length > 0){
            var encodersData = {"encoders": angular.toJson(encoders)};
            // Add all Encoders
            console.log(encodersData);
            sendDevices("encoder", encodersData);
        }
        

       
      }  

if($scope.isDBin==false){


 console.log('search all is here we cant insert db ' );

}
        

    }




//// FUNCTION TO OPEN DECODER/ENCODER FORM 


    $scope.addDeviceToDbnew = function(device,index){

  decindex=index;

 if(device.type=="decoder"){

  olddecip=device.ip;
  $scope.defineDecoder.ip=device.ip;
  $scope.defineDecoder.name=device.name;
 $scope.defineDecoder.room_id=$scope.rooms;
 $scope.defineDecoder.type=device.type;
 $scope.defineDecoder.model=device.model;
 $scope.isDecoderSelectedVisible = true;


//   console.log($scope.defineDecoder.ip);

  var data = {"ip":$scope.defineDecoder.ip};


$http.post("/decoders/getDecoderProperties", data)
        .then(function (response) {
          console.log("response.data");
           console.log(response.data);
           $scope.selectedDecoder = response.data;
            
          });


 }



 if(device.type=="encoder"){
 

 


olddecip=device.ip;
  $scope.defineEncoder.ip=device.ip;
 $scope.defineEncoder.name=device.name;
  $scope.defineEncoder.room_id=$scope.rooms;
 $scope.defineEncoder.type=device.type;
 $scope.defineEncoder.model=device.model;
 $scope.isEncoderSelectedVisible = true;

var data = {"ip":$scope.defineEncoder.ip};


$http.post("/encoders/getEncoderProperties", data)
        .then(function (response) {
          console.log("response.data");
           console.log(response.data);
           $scope.selectedEncoder = response.data;
           $scope.defineEncoder.multi_ip=response.data.media_dest_ip;
           $scope.defineEncoder.multi_port=response.data.media_dest_port;
            
          });


 }




}


//// FUNCTION TO SAVE DECODER


 $scope.saveDecoder = function(){



var yata = {

      "de_name": $scope.defineDecoder.name,
      "de_room": $scope.defineDecoder.room_id,  
    //  "de_id": $scope.defineDecoder.id,  
    // "de_mac": $scope.defineDecoder.mac,   
      "de_ip": $scope.defineDecoder.ip,
      "de_type": $scope.defineDecoder.type,
      "de_model": $scope.defineDecoder.model

    }


var urldec=$scope.defineDecoder.monaddr+":"+$scope.defineDecoder.monport+"/get-alarm";


var sata = {
      "old_ip": $scope.selectedDecoder.device_ip,
      "device_ip": $scope.defineDecoder.ip,
      "ip_mode": $scope.selectedDecoder.ip_mode,
      "net_mask":  $scope.selectedDecoder.net_mask,
      "low_delay":  $scope.selectedDecoder.low_delay,
      "fvo":  $scope.selectedDecoder.fvo,
      "color_space":  $scope.selectedDecoder.color_space,
      "stream_ip":  $scope.selectedDecoder.stream_ip,
      "stream_port":  $scope.selectedDecoder.stream_port,
      "status_timer":  $scope.defineDecoder.montime,
      "name":  $scope.defineDecoder.name,
      "master_status_url":  urldec,
      "slave_status_url":  $scope.selectedDecoder.slave_status_url,
      "master_live_url":  $scope.selectedDecoder.master_live_url,
      "slave_live_url":  $scope.selectedDecoder.slave_live_url,
      "time_stamp":  $scope.selectedDecoder.time_stamp
    }




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
           //     console.log('instat is '+instat);
                console.log(response.data);
                if(response.data == "name already exist"){
                   $scope.isNameExist = true;
                } else{

console.log('ok to save');
   
 $http.post("/decoders/add",yata).then(function (response) {
                console.log(response.data);
                console.log('sata is');
                console.log(sata);



   $http.post("/decoders/send_decoder",sata).then(function (response) {
                console.log(response.data);
              });


 if($scope.selectedDecoder.device_ip == $scope.defineDecoder.ip){

console.log('ip is same');


}else{


var hata = {
      "ip":  $scope.selectedDecoder.device_ip
    }


 $http.post("/decoders/reboot", hata)
            .then(function (response) {
                console.log(response.data);
              });

           
}



      $scope.isDecoderSelectedVisible = false;
      $scope.defineDecoder={};

$scope.defineDecoder.monaddr = "192.168.16.11";

$scope.defineDecoder.monport = "8080";

$scope.defineDecoder.montime = "7";



$scope.defineEncoder.monaddr = "192.168.16.11";

$scope.defineEncoder.monport = "8080";

$scope.defineEncoder.montime = "7";


 $scope.isNameExist = false;

  $scope.isADDRExist = false;

 $scope.selectedDecoder = {};

$scope.devicesFound.splice(decindex, 1);




});


}

}); 


}

}); 



}















//// FUNCTION TO SAVE ENCODER


 $scope.saveEncoder = function(){


//// PREPERING AN OBJECT TO SEND TO VALIDATION FANCTIONS



 console.log('save is ' +$scope.defineEncoder.multi_ip+ '   ' +$scope.defineEncoder.multi_port);



var yata = {

      "en_name": $scope.defineEncoder.name,
      "en_room": $scope.defineEncoder.room_id,  
    //  "en_id": $scope.defineEncoder.id,  
    // "en_mac": $scope.defineEncoder.mac,   
      "en_ip": $scope.defineEncoder.ip,
      "en_multi": $scope.defineEncoder.multi_ip,
      "en_port": $scope.defineEncoder.multi_port,
      "en_type": $scope.defineEncoder.type,
      "en_model": $scope.defineEncoder.model

    }


var urlenc=$scope.defineEncoder.monaddr+":"+$scope.defineEncoder.monport+"/get-alarm";


//// PREPERING AN OBJECT TO LOAD BACK INTO THE ENCODER




var  fvos = "AUTO";

 var sata = {
              "old_ip": $scope.selectedEncoder.device_ip,
              "device_ip": $scope.defineEncoder.ip,
              "gateway_ip": $scope.selectedEncoder.gateway_ip,
              "hdcp_enable": $scope.selectedEncoder.hdcp_enable,
              "ip_mode": $scope.selectedEncoder.ip_mode,
              "mac": $scope.selectedEncoder.mac,
              "name": $scope.defineEncoder.name,
              "net_mask": $scope.selectedEncoder.net_mask,
              "aac_enc_bitrate": $scope.selectedEncoder.aac_enc_bitrate,
              "audio_enc_type": $scope.selectedEncoder.audio_enc_type,
              "fps": $scope.selectedEncoder.fps,             
              "gop": $scope.selectedEncoder.gop,               
              "line_Out_1": $scope.selectedEncoder.line_Out_1,               
              "max_QP": $scope.selectedEncoder.max_QP,             
              "min_QP": $scope.selectedEncoder.min_QP,              
              "profile": $scope.selectedEncoder.profile, 
              "program_number": $scope.selectedEncoder.program_number,
              "rate_Control": $scope.selectedEncoder.rate_Control,
              "slave_live_url": $scope.selectedEncoder.slave_live_url,
              "slave_status_url": $scope.selectedEncoder.slave_status_url,
              "status_timer": $scope.defineEncoder.montime,           
              "transport_Type": $scope.selectedEncoder.transport_Type, 
              "vbr_max_bitrate": $scope.selectedEncoder.vbr_max_bitrate, 
              "cbr_avg_bitrate": $scope.selectedEncoder.cbr_avg_bitrate,
              "version": $scope.selectedEncoder.version,
              "time_stamp": $scope.selectedEncoder.time_stamp,
              "stream_mode": $scope.selectedEncoder.stream_mode,
              "master_live_url": $scope.selectedEncoder.master_live_url,
              "master_status_url": urlenc,
              "media_dest_ip": $scope.defineEncoder.multi_ip,
              "media_dest_port": $scope.defineEncoder.multi_port,
              "media_transport": $scope.selectedEncoder.media_transport,
              "fvo": fvos
    }




    $http.post("/encoders/valid_ip",yata)
            .then(function (response) {
                console.log(response.data);
                if(response.data == "ip already exist"){
                    $scope.isADDRExist = true;
    $http.post("/encoders/valid_name",yata)
            .then(function (response) {
                if(response.data == "name already exist"){
                   $scope.isNameExist = true;
                } 
              });


    }else{
    $http.post("/encoders/valid_name",yata)
            .then(function (response) {
                console.log('name status');
           //     console.log('instat is '+instat);
                console.log(response.data);
                if(response.data == "name already exist"){
                   $scope.isNameExist = true;
                } else{

console.log('ok to save');


   
 $http.post("/encoders/add",yata).then(function (response) {
                console.log(response.data);
                console.log('sata is');
                console.log(sata);



   $http.post("/encoders/send_encoder",sata).then(function (response) {
                console.log(response.data);
              });


 if($scope.selectedEncoder.device_ip == $scope.defineEncoder.ip){

console.log('ip is same');


}else{


var hata = {
      "ip":  $scope.selectedEncoder.device_ip
    }


 $http.post("/encoders/reboot", hata)
            .then(function (response) {
                console.log(response.data);
              });

           
}



      $scope.isEncoderSelectedVisible = false;
      $scope.defineEncoder={};

$scope.defineDecoder.monaddr = "192.168.16.11";

$scope.defineDecoder.monport = "8080";

$scope.defineDecoder.montime = "7";



$scope.defineEncoder.monaddr = "192.168.16.11";

$scope.defineEncoder.monport = "8080";

$scope.defineEncoder.montime = "7";


 $scope.isNameExist = false;

  $scope.isADDRExist = false;

 $scope.selectedEncoder = {};

$scope.devicesFound.splice(decindex, 1);




});


}

}); 


}

}); 



}


































////////////////////////////




 $scope.addDeviceToDb = function(){
  
 if($scope.isDBin==true){
        console.log("addDeviceToDb");
        console.log(device);
        var deviceData = [];
        deviceData.push(device);

        if (device["type"] == "decoder")
        {
        $http.post("/devices/add-decoders", deviceData)
        .then(function (response) {
            console.log(response.data);               
        });


       $scope.devicesFound.splice(index, 1);

        } else if (device["type"] == "encoder")
        {  

          
      //  $http.post("/encoders/getEncoderProperties", data)
    //    .then(function (response) {
      //     console.log("response.data");
        //   console.log(response.data);
       //    $scope.selectedEncoder.properties = response.data;            
      //    }

      $scope.devicesFound.splice(index, 1);

           $http.post("/devices/add-encoders", deviceData)
        .then(function (response) {
            console.log(response.data);               
        });
        }
    }


}


if($scope.isDBin==false){


 console.log('search all is here we cant insert db ' );

}



}












     $scope.sendDevices = function(type, data ) {
        console.log("sendDevices");
        var url = "/devices/add-decoders";
        
        if(type == "encoder") {
            url = "/devices/add-encoders";
        }
        
        $http.post(url, data)
        .then(function (response) {
            console.log(response.data);               
        });



}
