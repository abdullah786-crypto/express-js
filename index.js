const express = require("express");
const app = express();
const port = 3000;

// its a middileware for read the json data
app.use(express.json());

// Main default route of the application
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// // for getting the users route of the application
// app.get('/users', function(req, res) {
//     res.send('Hello this is the users page');
// })

// // this is dynamic routing of the application
// app.get('/profile/:name', function(req, res) {
//     res.send(`The user name is: ${req.params.name}` )
// })

// app.get('/profile', function(req, res) {
//     res.send('Hello this is the profile page');
// })

// // this is the sending the request to the server (Json Data sending)
// app.post('/submit', function(req, res) {
//     const data = req.body;
//     res.send(`POST received with data: ${JSON.stringify(data)}`);
// })

// // this is the sending the request to the server (Json Data sending)
// app.post('/api/user', function(req, res) {
//     console.log('response which is recieved is ', req.body);
//     res.json({
//         maessage: 'Users data is recieved successfully',
//         data: `Data is: {name: ${req.body.name}, email: ${req.body.email}}`
//     })
// })

// // This route is working successfully
// app.get('/api/user', function (req, res) {
//     const data = res.body;
//     res.json({
//         message: 'User data fetched successfully',
//         data:  `Data is: ${JSON.stringify(data)}`
//     })
// })

// app.delete('api/user', function(req, res) {
//     res.json({
//         message: `Delete by user id is successfully works with its id : ${req.params.id}`,
//         data:  `Data is: ${req.body}`
//     })
// })

let users = [];
let userId = 1;

app.post("/api/users", function (req, res) {
  console.log("Users id is: ", req.params.id);
  let user = {
    id: userId++,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(user);
  res.status(200).send(user);
});

app.get('/api/users', function(req, res) {
    console.log('All users data is ', users);
    res.json(users)
})

app.get("/api/users/:id", function (req, res) {
  let userId = Number(req.params.id)

  const user = users.find((user) => user.id === userId);

  if (user) {
    res.status(200).send(user);
  } else {
    res.send(404).send({ message: "User is not found here" });
  }
});

// app.delete('/api/users/:id', function(req, res){
//     let userId = Number(req.params.id)
//     let desiredUser = users.find((usr) => usr.id === userId)
//     let user = users.filter(usr => usr.id !== userId)
//     users = [...user]
//     if (desiredUser) {
//         res.json(user)
//     } else {
//         res.status(404).send({message: 'Delete request cannot be successfull because no users found'})
//     }

// })

// delete method optimized version code

app.delete('/api/users/:id', function(req, res){
    let userId = req.params.id;
    let index = users.findIndex(usr => usr.id === userId);

    if (index !==-1) {
        let user = users.filter(usr => usr.id !== userId)
        res.status(200).send(user)
    } else {
        res.status(404).send({
            message: 'Sorry delete request cannot be successfull because no any user found here...!!'
        })
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// https://gitimmersion.com/lab_01.html