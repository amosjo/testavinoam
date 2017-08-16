function LoginCtrl($scope, $location, $http ){
  $scope.ipaddr = "ros";
  $scope.isDialogVisible = true;
  $scope.lang = $scope.main.lang;
  $scope.isLoginFailed = false;
  $scope.main.currentUser.isLogin = false;
  $scope.main.currentUser.ipaddr = false;
  $scope.login_info =  {
    "user_name": "",
    "password": ""
  }

// a function to get the local ip of each user workstation - its not helpfull any more i block it out from the header html file 


function getIPs(callback){
                var ip_dups = {};
                //compatibility for firefox and chrome
                var RTCPeerConnection = window.RTCPeerConnection
                    || window.mozRTCPeerConnection
                    || window.webkitRTCPeerConnection;
                var useWebKit = !!window.webkitRTCPeerConnection;
                //bypass naive webrtc blocking using an iframe
                if(!RTCPeerConnection){
                    //NOTE: you need to have an iframe in the page right above the script tag
                    //
                    //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
                    //<script>...getIPs called in here...
                    //
                    var win = iframe.contentWindow;
                    RTCPeerConnection = win.RTCPeerConnection
                        || win.mozRTCPeerConnection
                        || win.webkitRTCPeerConnection;
                    useWebKit = !!win.webkitRTCPeerConnection;
                }
                //minimal requirements for data connection
                var mediaConstraints = {
                    optional: [{RtpDataChannels: true}]
                };
                var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
                //construct a new RTCPeerConnection
                var pc = new RTCPeerConnection(servers, mediaConstraints);
                function handleCandidate(candidate){
                    //match just the IP address
                    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
                    var ip_addr = ip_regex.exec(candidate)[1];
                    //remove duplicates
                    if(ip_dups[ip_addr] === undefined)
                        callback(ip_addr);
                    ip_dups[ip_addr] = true;
                }
                //listen for candidate events
                pc.onicecandidate = function(ice){
                    //skip non-candidate events
                    if(ice.candidate)
                        handleCandidate(ice.candidate.candidate);
                };
                //create a bogus data channel
                pc.createDataChannel("");
                //create an offer sdp
                pc.createOffer(function(result){
                    //trigger the stun server request
                    pc.setLocalDescription(result, function(){}, function(){});
                }, function(){});
                //wait for a while to let everything done
                setTimeout(function(){
                    //read candidate info from local description
                    var lines = pc.localDescription.sdp.split('\n');
                    lines.forEach(function(line){
                        if(line.indexOf('a=candidate:') === 0)
                            handleCandidate(line);
                    });
                }, 1000);
            }
            //insert IP addresses into the page
            getIPs(function(ip){

                             
              
console.log(ip);


$scope.main.currentUser.ipaddr=ip;

console.log($scope.main.currentUser.ipaddr);



});






  $scope.login = function(){

    console.log($scope.login_info);
    $http.post("/login/user", $scope.login_info)
            .then(function (response) {
                console.log(response.data);

                if(response.data.status == "fail"){
                    $scope.main.currentUser.isLogin = false;
                    $scope.login_info.user_name = "";
                    $scope.login_info.password = "";
                    $scope.isLoginFailed = true;
                } else {
                    $scope.isDialogVisible = false;
                    $scope.main.currentUser.isLogin = true;
                    $scope.main.currentUser.name = response.data.fullname;
                    $scope.main.currentUser.type = response.data.type;




                    if(response.data.type == "admin"){
                      $location.path('/tab/main');
                    } else {
                      $location.path('/tab/complexes');
                    }
                }
            });
  }
}
