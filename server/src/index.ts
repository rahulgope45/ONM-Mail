import express, { type Request, type Response } from 'express';

const PORT = 3000;
const app = express();

app.get('/',(req:Request,res:Response)=>{
    res.send('ONM START')
});

app.listen(PORT,()=>{
    console.log(`Server running at port: ${PORT}`)
})