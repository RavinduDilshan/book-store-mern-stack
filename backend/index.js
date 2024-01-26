import express from 'express';
import {PORT,MONGODBURL} from './config.js';

const app = express();

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(323).send('this is mern stack tut');

});

app.listen(PORT,()=>{
    console.log(`app is listining to port: ${PORT}`);
});

