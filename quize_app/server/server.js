import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';


/** import connection file */
import connect from './database/conn.js';

const app = express()


/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();


/** appliation port */
const port = process.env.PORT || 8080;

//connect();
/** routes */
app.use('/api', router) /** apis */


app.get('/', (req, res) => {
    try {
        res.json("Get Request")
    } catch (error) {
        res.json(error)
    }
})

// app.listen(port,() => {
//         console.log(`server  connected to http://localhost:${port}`);
//     })

    

/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})


// import express from 'express';
// import morgan from 'morgan';

// const app = express()

// app.use(morgan('tiny'));

//  app.get('/', (req, res) => {
//         try {
//             res.json("Get Request")
//         } catch (error) {
//             res.json(error)
//         }
//     })

// app.listen(8000,() => {
//     console.log('server  connected to http://localhost:8080');
// })