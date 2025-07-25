// create subscription -> middleware for validation -> middleware for error handling -> controllers

const errorMiddleware= (err,req,res,next)=>
{
    try{

        let error ={...err};

        error.message=err.message || 'Internal Server Error';
       
        console.error(err)

        // Mongoes bad id error
        if(err.name === 'CastError')
        {
            const message = "Resource Not Found"
            error=new Error(message)
            error.statusCode=404

        }

        // Mongooes Duplicate Key error
        if(err.code === 11000)
            {
                const message = "Duplicate Entry Found"
                error=new Error(message)
                error.statusCode=400
            }
        // Mongooes Validation error
      
        if (err.name== 'validationError')
        {
            const message = Object.values(err.errors).map(val => val.message)
            error=new Error(message.join(','))
            error.statusCode=400
        }

        res.status(error.statusCode || 500).json({"success": false, 'message': error.message|| " server error"})   
                     

        

    }
    catch(error)
    {
        next(error);
    }
};

//export 
export default errorMiddleware;  //exporting the middleware function  //exporting the middleware function  //export