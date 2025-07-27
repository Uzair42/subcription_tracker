import {aj} from '../config/arcjet.js';


const archjetMiddleware = async (req , res , next ) => {


    try {

         const decision = await aj.protect(req, { requested: 2 }); // Deduct 5 tokens from the bucket
         console.log("Arcjet decision", decision);

                if (decision.isDenied()) {
                        if (decision.reason.isRateLimit()) {
                        res.writeHead(429, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Too Many Requests" }));
                        } 
                        
                        else if (decision.reason.isBot()) {
                        res.writeHead(403, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "No bots allowed" }));
                        } 
                        
                        else {
                        res.writeHead(403, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Forbidden" }));
                        }

                        return res.status(403).json({ message: 'Access denied by Arcjet' });
                    }       

               next();
        
    } catch (error) {

        console.log('Error in Arcjet Middleware:', error);

        next(error); // Pass the error to the next middleware
        
    }



}  


export default archjetMiddleware;