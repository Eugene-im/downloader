const fs = require('fs');

const http = require("http");
const https = require("https");

var arr=[];
var arri=[];
var i = 70;
var str = "http://static.bizon365.ru/userfiles/27487/presentation/SEO2020-3.pdf/";
var ext=".png";
var dst="./img";

function create(){
  for(var x = 0;x<71;x++){
    arr.push(str+x+ext);
    arri.push(x+ext);
  }
  console.log(arr);
};

create();

function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http
    .get(url, function(response) {
      response.pipe(file);
      file.on("finish", function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("close", function() {
      // console.log(ghj);
    })
    .on("error", function(err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
}

function cyclicDownload() {
    for(var w=0;w<arr.length;w++){
      download(arr[w], dst+'/'+arri[w]);
    }
}
cyclicDownload();