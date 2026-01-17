import express, { type Request, type Response } from 'express';

const app = express();  

const PORT = 3000;

app.get('/',(req:Request,res:Response)=>{
    res.send("Server is running") 

})


app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
});
