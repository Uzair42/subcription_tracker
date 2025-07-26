import express, { urlencoded } from 'express';
import {connectToDatabase} from './db/mongoosdb.js'; // Import the database connection function
import {PORT} from './config/env.js'; // Import your env loader 
import cookieParser from 'cookie-parser';
//import the Routes form Folder / files 

import { authRouter } from './routes/auth.routes.js';
import {userRouter} from './routes/user.routes.js'
import {subscriptionRouter} from './routes/subscription.routes.js'
import errorMiddleware from './middleware/error.middleware.js';
import archjetMiddleware from './middleware/archjetMiddleware.js'; 




const app = express();


//app wala routes for static display
app.get('/', (req, res) => {
  res.send({ message: 'Its Subcription Tracker API Home Page',
    status: 'success',
    data: {
      name: 'Subscription Tracker API',
      version: '1.0.0',
      description: 'An API to track your subscriptions and manage them effectively.'
    }
   });
})


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))
app.use(archjetMiddleware); // Use Arcjet middleware for rate limiting and bot protection



// Use All the Routes that we have created 
// and also pre-fix the routes to end-point

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter);
app.use('/api/v1/subscription',subscriptionRouter);


app.use(errorMiddleware)




app.listen(PORT, ()=> {

  console.log(`Server is running on http://localhost:${PORT}`);

  
 
  connectToDatabase(); // Call the function to connect to the database
 
 
  console.log(`Connected to MongoDB in ${process.env.NODE_ENV} mode`);
});

