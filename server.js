const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const database = {
  users: [{
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bannaas',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email === database.users[0].email && password === database.users[0].password) {
    res.json('sucess');
  } else {
    res.status(400).json('Error loggin in');
  }
})

app.post('/register', (req, res) => {
  const {
    email,
    name,
    password
  } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
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