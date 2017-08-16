var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




router.post('/add', function(req, res, next) {

    var contact = new Object();



    contact.first = req.body.first;
    contact.last = req.body.last;

    console.log("ssd");
    console.log(contact);

    fs.readFile('public/datas.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        var parsed = JSON.parse(data);

        var arr = [];

        for(var x in parsed){
            arr.push(parsed[x]);
        }

        console.log(arr);
        arr.push(contact);
        console.log(arr);

         fs.writeFile('public/datas.json',JSON.stringify(arr),function(err){
         if(err) throw err;
          })


    });





    res.send(contact);



});





router.post('/filter', function(req, res, next) {

    var contact = new Object();



    contact.first = req.body.first;
    contact.last = req.body.last;

    console.log("ssd");
    console.log(contact);

    fs.readFile('public/datas.json', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        var parsed = JSON.parse(data);

        var arr = [];

        var fill = null;


        console.log("start");

        for(var x in parsed){
          //  console.log(parsed[x].first);
            var zee = parsed[x].first;
            var mee = contact.first;
          //  console.log(contact.first);
          if(zee == mee){

              console.log("ok");

              fill=zee;

          }

        }



        var data = {

            "first": fill,
            "last": "ook"

        }



        console.log(arr);

        res.send(data);

    });







});







module.exports = router;
