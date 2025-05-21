const express = require('express');
const db = require('../database/db');
let router = express.Router();

// let users = [];
// let userId = 1;

router.get('/', (req, res) => {
  let query = `SELECT * FROM users`;

  db.query(query, (err, result) => {
    if (err) {
      console.log('Error while fetching user', err.message);
      return res.status(500).json({ message: err.message });
    } else {
      res.status(200).json(result);
    }
  });

  // res.json(users);
});

router.post('/', (req, res) => {
  const { name, email, password, address, city, phone } = req.body;

  let tableQuery = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(300),
  password VARCHAR(150),
  address VARCHAR(500),
  city VARCHAR(150),
  phone VARCHAR(250)
  )`;

  db.query(tableQuery, (err) => {
    if (err) {
      res.status(500).json({ message: 'Table creation failed' });
    }
  });

  let insertQuery = `INSERT INTO users (name, email, password, address, city, phone) VALUES (?, ?, ?, ?, ?, ?)`;
  let fields = [name, email, password, address, city, phone];

  db.query(insertQuery, fields, (err, result) => {
    if (err) {
      console.log('Error is', err);
      return res.status(500).json({ message: 'Insert data failed' });
    } else {
      res.status(200).json({
        id: result.insertId,
        name: name,
        email: email,
        password: password,
        address: address,
        city: city,
        phone: phone,
      });
    }
  });

  // let user = {
  //   id: userId++,
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   address: req.body.address,
  //   city: req.body.city,
  //   phone: req.body.phone,
  // };
  // users.push(user);
  // console.log('Users are', users);

  // res.status(200).send(user);
});

router.get('/:id', (req, res) => {
  let userId = Number(req.params.id);

  let query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else if (!userId) {
      return res.status(400).json({ message: 'User id is requires' });
    } else if (result.length === 0) {
      return res.status(404).json({ message: 'No user found' });
    } else if (typeof userId === String) {
      return res.status(400).json({ message: 'Invalid user id' });
    } else {
      const filteredUser = result.find((usr) => usr.id === userId);
      res.status(200).json(filteredUser);
    }
  });
  // const filteredUser = users.find((usr) => usr.id === userId);
  // console.log('filtered user is', filteredUser);

  // if (filteredUser) {
  //   res.status(200).json(filteredUser);
  // } else {
  //   res.status(404).send({ message: 'Invalid user id. User is not found' });
  // }
});

router.delete('/:id', (req, res) => {
  let userId = Number(req.params.id);
  let allUserQuery = 'SELECT * FROM users';
  let query = 'DELETE FROM users WHERE id = ?';
  let allUsers;
  db.query(allUserQuery, (err, result1) => {
    console.log('all usr 1', result1);

    let index = result1.findIndex((idx) => idx.id === userId);

    if (index === -1) {
      return res.status(404).json({ message: 'No user found' });
    } else {
      db.query(query, [userId], (error, result2) => {
        console.log('users value is', result2);
        if (userId) {
          return res.status(200).json({ message: 'User deleted successfully' });
        } else if (!userId) {
          return res.status(404).json({ message: 'Invalid user id' });
        } else if (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    }
    // allUsers = result;
    // console.log('all usr 1', allUsers)
  });

  // let index = users.findIndex((usr) => usr.id === userId);

  // if (index !== -1) {
  //   users.splice(index, 1);
  //   res.status(200).send({ message: 'User deleted successfully' });
  // } else {
  //   res.status(404).send({
  //     message:
  //       'Sorry delete user request is not valid. Because no any user found ',
  //   });
  // }
});

router.put('/:id', (req, res) => {
  let currentUserId = Number(req.params.id);

  const { name, email, password, address, city, phone } = req.body;

  let updateQuery =
    'UPDATE users SET name = ?, email = ?, password = ?, address = ?, city = ?, phone = ? WHERE id = ? ';

  db.query(
    updateQuery,
    [name, email, password, address, city, phone, currentUserId],
    (err, result) => {
      if (!name || !email || !password || !address || !city || !phone) {
        return res.status(400).json({ message: 'Please input all fields' });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      } else if (!currentUserId) {
        return res.status(404).json({ message: 'Invalid user id' });
      } else {
        return res.status(200).json({ message: 'User updated successfully' });
      }
    },
  );

  // users = users.filter((usr) => usr.id !== currentUser);

  // console.log('filteredUsers are', users);

  // let updatedUser = {
  //   id: currentUser,
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   address: req.body.address,
  //   city: req.body.city,
  //   phone: req.body.phone,
  // };
  // if (updatedUser !== null) {
  //   users.unshift(updatedUser);
  //   console.log('now updated users is', users);
  //   res.status(200).send(updatedUser);
  // } else {
  //   res.status(400).json({ error: 'Invalid input provided' });
  // }
});

module.exports = router;

// postgress sql
