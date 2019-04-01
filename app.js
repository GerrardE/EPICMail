import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';

// Introduce the express middleware
const app = express();

dotenv.config();

// Enable CORS
app.use(cors());

// Use path directory joiner
app.use(express.static(path.join(__dirname, 'views')));

// Introduce the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// declare your port
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
})
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
