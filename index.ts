import express from "express";
import 'reflect-metadata';
import userRoutes from './routes/users';
import productRoutes from './routes/products'; 

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use('/api/products', productRoutes)

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`);
});

// https://gitimmersion.com/lab_01.html
