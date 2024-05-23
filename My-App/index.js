/*--------------------------------------
 Author: Yusuf Abdulsttar
--------------------------------------*/
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const redis = require('redis');

//init app
const PORT = 3000;
const my_app = express();

//Connect to monogDB
const DB_user = 'root';
const DB_pass = 'example';
const DB_port = 27017;
const DB_host = 'mongo';
const URI = `mongodb://${DB_user}:${DB_pass}@${DB_host}:${DB_port}`;

mongoose.connect(URI).then(() => console.log('connected to db...')).catch((err) => console.log('failed',err));

// connect to redis 
const redis_host = 'redis';
const redis_port = 6379;
const client = redis.createClient({ url: `redis://${redis_host}:${redis_port}` });

client.on('connect', () => console.log('connected to Redis '));
client.on('error', err => console.log('Redis Client Error', err));

client.connect();


my_app.use(express.static(path.join(__dirname, 'public'))); 

my_app.get('/set', (req, res) => {
	client.set('hi','Hello from redis'); //set to redis
    res.send('<h1> Hello Yusuf </h1>');
  });

my_app.get('/data', async (req, res) => {
	const string = await client.get('hi'); //get from redis
    res.send(`<h1> Hello Yusuf </h1> <h2> ${string}</h2>`);
  });

  my_app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})

