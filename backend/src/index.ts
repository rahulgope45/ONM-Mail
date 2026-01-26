import dotnev from 'dotenv';
dotnev.config();
import express, { type Request, type Response } from 'express';

const app = express();  

const PORT = 3000;

app.get('/',(req:Request,res:Response)=>{
    res.send("Server is running") 

})
console.log(process.env.DATABASE_URL)

app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
});
