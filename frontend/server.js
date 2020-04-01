const express = require('express');
// const favicon = require('express-favicon');
const path = require('path');


const PORT = process.env.PORT || 3000;
const app = express();

// app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));


// Ping route for testing
app.get('/ping', function (req, res) {
 return res.send('Server is running.');
});


// This route search the React application
app.get('/*', function (req, res) {
  console.log('path:' + path.join(__dirname, 'build', 'index.html'))
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


console.log('App is listening on port:', PORT);
app.listen(PORT);

