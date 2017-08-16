angular.module('main').controller('DecodersConfigCtrl', DecodersConfigCtrl);

function DecodersConfigCtrl($scope, $http, commServiceFactory) {

  $scope.isSelectEncoderVisible = false;

  $scope.lists = {};
  $scope.status = {"encoders":[],"decoders":[]};


  commServiceFactory.getJson("decoders/decoderslist").success(function(data){
//    $scope.decoders = data;
    $scope.lists.decoders = data;

    commServiceFactory.getJson("encoders/encoderslistold").success(function(data){
      $scope.lists.encoders = data;

      $scope.lists.decoders.forEach(decoder => {

        var savedDecoder = Object.assign({}, decoder);
      //  decoder.encoders = [Object.assign({},$scope.lists.encoders.find(encoder => (encoder.encoder_id == decoder.encoder_id)))];
         decoder.encoders = [Object.assign({},$scope.lists.encoders.find(encoder => (encoder.name == decoder.encoder_id)))];
        // For known the decoder id in drag.
        if (!decoder.encoders[0]){
          decoder.encoders[0] = {decoder_id:"-1"}
        }else{
          decoder.encoders[0].decoder = savedDecoder;
        }
      });
    })})
  .error(function(error){
  //$scope.decoders = [];
  });
  


$scope.dragControlListeners = {
    dragEnd: function (event) {
      console.log("dfdfdfdfdfdf");
    },
  allowDuplicates: true
};

$scope.dragControlCloneListeners = {
  dragEnd: function (event) {

    if (event.dest.sortableScope !== event.source.sortableScope){
      
      // No More then two element. Remove the old
        var indexToRemove = event.dest.index==0?1:0;
        var indexOfNewEncoder = event.dest.index==0?0:1;

        // set the decoder id that contains the encoder in the new one.
        var decoder = event.dest.sortableScope.modelValue[indexToRemove].decoder;

        event.dest.sortableScope.modelValue[indexOfNewEncoder].decoder = decoder;
        // console.log("remove", event.dest.sortableScope.modelValue[indexToRemove]);
        // console.log("new",  event.dest.sortableScope.modelValue[indexOfNewEncoder]);
        event.dest.sortableScope.removeItem(indexToRemove);
        
        $scope.updateEncoderOfDecoder(decoder, event.dest.sortableScope.modelValue[0]);
      }
    },
    clone: true 
};


  $scope.replaceEncoder = (decoder, encoder) => {
      decoder.encoders.pop();
      decoder.encoders.push(encoder);
      decoder.encoder_id = encoder.encoder_id;
      return true;
  }

  $scope.updateEncoderOfDecoder = (decoder, encoder) => {
    //var updatedDecoder = Object.assign({}, decoder);
    
       var data = {
         // "decoder_id": decoder.decoder_id,
            "decoder_id": decoder.name,
       //   "encoder_id": encoder.encoder_id,
          "encoder_id": encoder.name,
          "decoder_ip": decoder.ip,
          "multi": encoder.multi,
          "multi_port": encoder.multi_port,
          "isSync" : true
        }

    console.log('data is '+data);

        $http.post("/complexes/set_encoder",data)
                .then(function (response) {
                    console.log(response.data);

                  });
    // delete updatedDecoder.encoders;

    // $http.put("/decoders/decoderslist/" + updatedDecoder.encoder_id, {updatedDecoder:updatedDecoder}).
    //   then(response => {});

  }
  // $scope.getEcoderById = (encoderId) => {
  //   console.log(encoderId, $scope.lists.encoders);
  //   return $scope.lists.encoders.find(encoder => (encoder.encoder_id == encoderId));
  // }
    
}
