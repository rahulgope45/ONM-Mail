import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import authRoutes from './routes/auth.router.js';
const PORT = 3000;
const app = express();
app.get('/', (req, res) => {
    res.send('ONM START');
});
app.use(express.json());
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});
//# sourceMappingURL=index.js.map