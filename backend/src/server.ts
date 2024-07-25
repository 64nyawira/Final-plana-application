import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import bodyParser from 'body-parser';
import eventRouter from './Router/event.router';
import authRouter from './Router/user.router';
import adminRouter from './Router/admin.router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '10mb'}));

// app.post('/user/login', (req, res) => {
//   // const { email, password } = req.body;
//   console.log('Request Body:', req.body); 
  
//   res.json({ message: 'Login request received' });
// });

app.use("/event",eventRouter)
app.use("/user",authRouter)
app.use('/admin',adminRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
