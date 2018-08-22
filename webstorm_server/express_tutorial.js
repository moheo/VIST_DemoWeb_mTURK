var express = require('express');

var app = express();

app.get('/', function(req, res){
res.send('Hello homepage');
});

app.get('/login', function(req,res){
res.send('Login');
});

app.get('/form_received', function(req, res){
    res.send('form_received ')
});

app.listen(4170, function(){

console.log('Connected 4170 prot!');


// receive the form . // doesnt work here
app.post('/', function(req,res){
    var title = req.body.title;
    var desc = req.body.description;
    res.send(title+','+description);
})



});


//express_tutorial at localhost:4170 port
//node server at 3000 port submitted the form without externalHIT.js script which requires AMT info

//and the result is as follows
//form(method = 'post', action = 'http://localhost:4170')

//web output: cannot POST /
//console output: 
/*
Refused to load the font '<URL>' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'font-src' was not explicitly set, so 'default-src' is used as a fallback.
localhost/:1 
Refused to load the font 'data:font/woff;base64,d09GRgABAAAAAGVUABEAAAAAxuQAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABHREVGAAABgAAAAC4AAAA0ArgC7UdQT1MAAAGwAAAQ6AAALgxKsqRTR1NVQgAAEpgAAAH3AAAELqI5y+RPUy8yAAAUkAAAAE8AAABgaGyBu2NtYXAAABTgAAABlAAAAkQkRATXY3Z0IAAAFnQAAABeAAAAugDsQf1mcGdtAAAW1AAABZcAAAvNb3/BHGdhc3AAABxsAAAACAAAAAgAAAAQZ2x5ZgAAHHQAAEApAAB3CtbiupxoZWFkAABcoAAAADYAAAA2BkubWWhoZWEAAFzYAAAAIAAAACQHFARfaG10eAAAXPgAAAI6AAAEEk4TN4Nsb2NhAABfNAAAAhIAAAISiLhpam1heHAAAGFIAAAAIAAAACACigzgbmFtZQAAYWgAAACUAAABHhQGLdJwb3N0AABh/AAAAq4AAASRk5y6n3ByZ...QxUajCCFt4p9HP4fzdSWs2XhWl5HvJazrIrFUyB0l5dpqcW10lV2wukjMLuAvyMHNiYpgPsrCVXZDKrkpll6UWkh7kABVAFVCDe7UFmxagDegA+hLHRPbqtMo7ZHCpKdT6tPGXybzo0+RXBLoPZt1tELcXxCmAAyZwYTJvdDFZKnDER44X2451rDqCyunIsRWvLSx6wnWqwPj/uX5/KuEy6DL0z6A/Fn79VihxMFJsrlAFy4DpZOcvNlMeNp+BRDLj0r+XFdRxdSNSNxiI/AL3ojKdAAB4AWPw3sFwIihiIyNjX+QGxp0cDBwMyQUbGdictkUwWDAwsDJogTgOPN4c9iz6bMos4iysHFChUDZXJnMWTSZZJrAQt9M+YQYBBh4GTgY2kEZOoJiA0z4GBxiEiDEzuGxUYewIjNjg0BGxkTnFZaMaiLeLo4GBkcWhIzkkAqQkEggceHw5HFkM2VRZJFlYebR2MP5v3cDSu5GJwWUDW9xG1hQXAFAmKZU=' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'font-src' was not explicitly set, so 'default-src' is used as a fallback.
(similarly repeated error 22 msgs)

Failed to load resource: the server responded with a status of 404 (Not Found)
*/