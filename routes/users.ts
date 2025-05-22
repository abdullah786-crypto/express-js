import UserDto from "../Classes/user.dto";
import {
  validate,
  validateOrReject
} from 'class-validator';

const express = require('express');
const db = require('../database/db');
let router = express.Router();
const userDto = new UserDto();
let tableQuery = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(300),
  password VARCHAR(150),
  address VARCHAR(500),
  city VARCHAR(150),
  phone VARCHAR(250)
  )`;

router.get('/', (req: any, res: any) => {
  let query = `SELECT * FROM users`;

  db.query(query, (err: any, result: any) => {
    if (err) {
      console.log('Error while fetching user', err.message);
      return res.status(500).json({ message: err.message });
    } else {
      res.status(200).json(result);
    }
  });

  // res.json(users);
});

router.post('/', (req: any, res: any) => {
  let insertQuery = `INSERT INTO users (name, email, password, address, city, phone) VALUES (?, ?, ?, ?, ?, ?)`;
  const { name, email, password, address, city, phone } = req.body;

  userDto.name = name;
  userDto.email = email;
  userDto.password = password;
  userDto.address = address;
  userDto.city = city;
  userDto.phone = phone;

  validate(userDto).then((error: any) => {
    if (error.length > 0) {
      console.log('errors are', error)
      const messages = error.map((err: any) => ({
        property: err.property,
        error: Object.values(err.constraints || {})
      }))
      res.status(400).json({ message: 'Validation failed', errors: messages })
    } else {
      db.query(tableQuery, (err: any) => {
        if (err) {
          res.status(500).json({ message: 'Table creation failed' });
        }
      });
      let fields = [name, email, password, address, city, phone];

      db.query(insertQuery, fields, (err: any, result: any) => {
        if (err) {
          console.log('Error is', err);
          return res.status(500).json({ message: 'Insert data failed' });
        } else {
          res.status(200).json({
            message: 'User added successfull',
            data: { id: result.insertId, ...req.body }
          });
        }
      });
      // res.status(200).json({message: 'Validation successful', data: {...req.body}})
    }
  })



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

router.get('/userId=:id', (req: any, res: any) => {
  let userId = Number(req.params.id);

  let query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err: any, result: any) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else if (!userId) {
      return res.status(400).json({ message: 'User id is requires' });
    } else if (result.length === 0) {
      return res.status(404).json({ message: 'No user found' });
    } else {
      res.status(200).json(result[0]);
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

router.delete('/userId=:id', (req: any, res: any) => {
  let userId = Number(req.params.id);
  let allUserQuery = 'SELECT * FROM users';
  let query = 'DELETE FROM users WHERE id = ?';
  db.query(allUserQuery, (err: any, result1: any) => {
    console.log('all usr 1', result1);

    let index = result1.findIndex((idx: any) => idx.id === userId);

    if (index === -1) {
      return res.status(404).json({ message: 'No user found' });
    } else {
      db.query(query, [userId], (error: any, result2: any) => {
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

router.put('/userId=:id', (req: any, res: any) => {
  const allUsersQuery = 'SELECT * FROM users';
  const updateQuery =
    'UPDATE users SET name = ?, email = ?, password = ?, address = ?, city = ?, phone = ? WHERE id = ? ';
  const currentUserId = Number(req.params.id);

  const { name, email, password, address, city, phone } = req.body;
  userDto.name = name;
  userDto.email = email;
  userDto.password = password;
  userDto.address = address;
  userDto.city = city;
  userDto.phone = phone;

  validate(userDto).then((errors: any) => {
    if (errors.length > 0) {
      const messages = errors.map((err: any) => ({
        property: err.property,
        error : Object.values(err.constraints || {})
      }))
      res.status(400).json({
        message: 'Validation failed',
        errors: messages
      })
      // console.log('errors messages', messages)
    } else {
      if (!currentUserId || currentUserId === undefined || currentUserId === null) {
        return res.status(405).json({ message: 'Please enter user id' });
      } else {
        db.query(allUsersQuery, (err: any, result1: any[]) => {
          if (result1) {
            let index = result1.findIndex((x: any) => x.id === currentUserId)
            if (index === -1) {
              res.json({ message: 'No any user found' })
            } else {
              db.query(
                updateQuery,
                [name, email, password, address, city, phone, currentUserId],
                (err: any, result: any) => {
                  if (err) {
                    return res.status(500).json({ message: err.message });
                  } else {
                    return res.status(200).json({ message: 'User updated successfully', data: {...req.body} });
                  }
                },
              );
            }
          }
        })
      }
    }
  })


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
