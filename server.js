const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());

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
    res.json(database.users[0]);
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

app.get('/profile/:id', (req, res) => {
  const {
    id
  } = req.params;
  database.users.forEach(user => {
    if (user.id === id) {
      return res.json(user);
    }
  })
  return res.status(404).json("No such user");
})

app.put('/image', (req, res) => {
  const {
    id
  } = req.body;
  database.users.forEach(user => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
  })
  return res.status(400).json('not found')
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