const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send("This is working");
})

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000")
})

/*
Api Config
/ --> res=this is working
/signin --> POST (because we are entering password so it should be post request) = sucess/fail
/ register --> POST=user
/profile/:userId --> GET=user
/image --> PUT=user
*/