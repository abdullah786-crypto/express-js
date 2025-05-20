const express = require("express");
let router = express.Router();

let users = [];
let userId = 1;

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  let user = {
    id: userId++,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  };
  users.push(user);
  console.log('Users are', users);
  
  res.status(200).send(user);
});

router.get('/:id', (req, res) => {
  let userId = Number(req.params.id);

  const filteredUser = users.find(usr => usr.id === userId);

  if (filteredUser) {

    res.status(200).json(filteredUser)
  } else {
    res.status(404).send({message: 'Invalid user id. User is not found'})
  }

})

router.delete('/:id', (req, res) => {

    let userId = Number(req.params.id);

    let index = users.findIndex(usr => usr.id === userId )

    if (index !== -1) {
        users.splice(index, 1)
        res.status(200).send({message: 'User deleted successfully'})
    } else {
        res.status(404).send({message: 'Sorry delete user request is not valid '})
    }
})

module.exports = router


// postgress sql