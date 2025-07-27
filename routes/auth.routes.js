    import { Router  } from "express";
    import {signIn,signOut,signUp} from '../controllers/auth.controller.js';
import { authorizeMiddleware } from "../middleware/authorize.middleware.js";

    const authRouter=Router();

    authRouter.post('/sign-up',signUp)


    authRouter.post('/sign-in',signIn)


    authRouter.get('/sign-out',authorizeMiddleware,signOut)

    export { authRouter}