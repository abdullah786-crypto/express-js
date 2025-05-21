// const express = require("express");
import express from "express"; // ✅

const app = express();
const port = 3000;

let userRoutes = require('./routes/users')

// its a middileware for read the json data
app.use(express.json());
app.use("/api/users", userRoutes);


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

// const testMiddleWare = (req, res, next) => {
//   console.log("Middleware 1 execute");
//   next();
// };
// const testMiddleWare2 = (req, res, next) => {
//   console.log("Middleware 2 executed");
//   next();
// };

// const checkUsersId =
//   ("/api/users/:id",
//   (req, res, next) => {
//     if (req.params.id !== null) {
//       console.log("user id is ", userId);
//       console.log("id found here and middleware successfully calls here");
//       next();
//     }
//     res.end();
//   });

// const checkTheUserLoggedIn = (req, res, next) => {
//   const isLogin = false;
//   console.log("Original url is: ", req.originalUrl);
//   if (isLogin) {
//     console.log("Original url is: ", req.originalUrl);
//     next();
//   } else {
//     res
//       .status(404)
//       .send({ message: "Your are not logged in kindly login first" });
//   }
// };

// app.use([testMiddleWare, testMiddleWare2, checkUsersId, checkTheUserLoggedIn]);

// app.get("/api/dashboard", (req, res) => {
//   res.send("This is Dashboard page loaded here...!!");
// });

// let users = [];
// let userId = 1;

// app.post("/api/users", function (req, res) {
//   let user = {
//     id: userId++,
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   users.push(user);
//   res.status(200).send(user);
// });

// app.get("/api/users", function (req, res) {
//   console.log("All users data is ", users);
//   res.json(users);
// });

// app.get("/api/users/:id", function (req, res) {
//   let userId = Number(req.params.id);
//   const user = users.find((user) => user.id === userId);
//   if (user) {
//     res.status(200).send(user);
//   } else {
//     res.send(404).send({ message: "User is not found here" });
//   }
// });

// // app.delete('/api/users/:id', function(req, res){
// //     let userId = Number(req.params.id)
// //     let desiredUser = users.find((usr) => usr.id === userId)
// //     let user = users.filter(usr => usr.id !== userId)
// //     users = [...user]
// //     if (desiredUser) {
// //         res.json(user)
// //     } else {
// //         res.status(404).send({message: 'Delete request cannot be successfull because no users found'})
// //     }
// // })
// // delete method optimized version code

// app.delete("/api/users/:id", function (req, res) {
//   let userId = Number(req.params.id);
//   let index = users.findIndex((usr) => usr.id === userId);
//   console.log("index is", index);
//   if (index !== -1) {
//     console.log("users are", users);
//     users.splice(index, 1);
//     // let user = users.filter((usr) => usr.id !== userId);
//     res.status(200).send(users);
//   } else {
//     res.status(404).send({
//       message:
//         "Sorry delete request cannot be successfull because no any user found here...!!",
//     });
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// https://gitimmersion.com/lab_01.html
