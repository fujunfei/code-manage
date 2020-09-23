'use strict'

let fs = require('fs');
fs.readFile('295355.jpg', function (err, data){
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        console.log(data.length + ' bytes');
    }
})