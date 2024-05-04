import express from 'express';
import mongoose from 'mongoose';
import router from './routes/userRouter.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
app.use("/user",router);

mongoose.connect("mongodb+srv://pulisairakesh2157:IYFqOxDqoFVabQjy@cluster0.jfzhzmg.mongodb.net/authenticate?retryWrites=true&w=majority&appName=Cluster0")
.then((result) => {
    app.listen(3000, () => console.log('http://localhost:3000/user'));
})
.catch((err) => {
    console.log(err);
});