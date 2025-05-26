import UserDto from "../dataTransformingObject/user.dto";
import {
  validate,
} from 'class-validator';
import AppDataSource from "../datasource/datasource";
import { User } from "../entities/user.simpleEntity";

const express = require('express');

// const db = require('../datasource/datasource');
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

router.get('/', async (req: any, res: any) => {

  let userRepo = await AppDataSource.getRepository(User).find()
  res.status(200).json({message: 'Users get successfully', users: userRepo})
  // // let query = `SELECT * FROM users`;


  // db.query(query, (err: any, result: any) => {
  //   if (err) {
  //     console.log('Error while fetching user', err.message);
  //     return res.status(500).json({ message: err.message });
  //   } else {
  //     res.status(200).json(result);
  //   }
  // });
});

router.post('/', async (req: any, res: any) => {
  // let insertQuery = `INSERT INTO users (name, email, password, address, city, phone) VALUES (?, ?, ?, ?, ?, ?)`;
  // const { name, email, password, address, city, phone } = req.body;

  // userDto.name = name;
  // userDto.email = email;
  // userDto.password = password;
  // userDto.address = address;
  // userDto.city = city;
  // userDto.phone = phone;

  // validate(userDto).then((error: any) => {
  //   if (error.length > 0) {
  //     console.log('errors are', error)
  //     const messages = error.map((err: any) => ({
  //       property: err.property,
  //       error: Object.values(err.constraints || {})
  //     }))
  //     res.status(400).json({ message: 'Validation failed', errors: messages })
  //   } else {

      const userRepo =  AppDataSource.getRepository(User);
      const user = userRepo.create(req.body)
      const result = await userRepo.save(user)

      res.json({message: 'User added successfully', response: result})
      // db.query(tableQuery, (err: any) => {
      //   if (err) {
      //     res.status(500).json({ message: 'Table creation failed' });
      //   }
      // });
      // let fields = [name, email, password, address, city, phone];

      // db.query(insertQuery, fields, (err: any, result: any) => {
      //   if (err) {
      //     console.log('Error is', err);
      //     return res.status(500).json({ message: 'Insert data failed' });
      //   } else {
      //     res.status(200).json({
      //       message: 'User added successfull',
      //       data: { id: result.insertId, ...req.body }
      //     });
      //   }
      // });
    
  })
// });

router.get('/userId=:id', async (req: any, res: any) => {
  let userId = Number(req.params.id)
  let currentUsers = await AppDataSource.getRepository(User).findOneBy({id: userId})

  if (currentUsers) {
    res.status(200).json({...currentUsers})
  }
  // let userId = Number(req.params.id);

  // let query = 'SELECT * FROM users WHERE id = ?';

  // db.query(query, [userId], (err: any, result: any) => {
  //   if (err) {
  //     return res.status(500).json({ message: err.message });
  //   } else if (!userId) {
  //     return res.status(400).json({ message: 'User id is requires' });
  //   } else if (result.length === 0) {
  //     return res.status(404).json({ message: 'No user found' });
  //   } else {
  //     res.status(200).json(result[0]);
  //   }
  // });
});

// router.delete('/userId=:id', (req: any, res: any) => {
//   let userId = Number(req.params.id);
//   let allUserQuery = 'SELECT * FROM users';
//   let query = 'DELETE FROM users WHERE id = ?';
//   db.query(allUserQuery, (err: any, result1: any) => {
//     console.log('all usr 1', result1);

//     let index = result1.findIndex((idx: any) => idx.id === userId);

//     if (index === -1) {
//       return res.status(404).json({ message: 'No user found' });
//     } else {
//       db.query(query, [userId], (error: any, result2: any) => {
//         console.log('users value is', result2);
//         if (userId) {
//           return res.status(200).json({ message: 'User deleted successfully' });
//         } else if (!userId) {
//           return res.status(404).json({ message: 'Invalid user id' });
//         } else if (error) {
//           return res.status(500).json({ message: error.message });
//         }
//       });
//     }
//   });
// });

router.put('/userId=:id', async (req: any, res: any) => {

  let id = Number(req.params.id)

  let getUserById = await AppDataSource.getRepository(User).findOneBy({id: id})
  console.log('User by id is',getUserById);
  let userRepo = await AppDataSource.getRepository(User).update({id: id}, {...req.body})

if (userRepo) {
  res.status(200).json({message: 'User record updated successfully', data: req.body})
}
  // const allUsersQuery = 'SELECT * FROM users';
  // const updateQuery =
  //   'UPDATE users SET name = ?, email = ?, password = ?, address = ?, city = ?, phone = ? WHERE id = ? ';
  // const currentUserId = Number(req.params.id);

  // const { name, email, password, address, city, phone } = req.body;
  // userDto.name = name;
  // userDto.email = email;
  // userDto.password = password;
  // userDto.address = address;
  // userDto.city = city;
  // userDto.phone = phone;

  // validate(userDto).then((errors: any) => {
  //   if (errors.length > 0) {
  //     const messages = errors.map((err: any) => ({
  //       property: err.property,
  //       error : Object.values(err.constraints || {})
  //     }))
  //     res.status(400).json({
  //       message: 'Validation failed',
  //       errors: messages
  //     })
  //   } else {
  //     if (!currentUserId || currentUserId === undefined || currentUserId === null) {
  //       return res.status(405).json({ message: 'Please enter user id' });
  //     } else {
  //       db.query(allUsersQuery, (err: any, result1: any) => {
  //         if (result1) {
  //           let index = result1.findIndex((x: any) => x.id === currentUserId)
  //           if (index === -1) {
  //             res.json({ message: 'No any user found' })
  //           } else {
  //             db.query(
  //               updateQuery,
  //               [name, email, password, address, city, phone, currentUserId],
  //               (err: any, result: any) => {
  //                 if (err) {
  //                   return res.status(500).json({ message: err.message });
  //                 } else {
  //                   return res.status(200).json({ message: 'User updated successfully', data: {...req.body} });
  //                 }
  //               },
  //             );
  //           }
  //         }
  //       })
  //     }
  //   }
  // })
});

export default router;

// postgress sql
