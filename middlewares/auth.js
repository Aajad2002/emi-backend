const jwt =require("jsonwebtoken")


const auth=(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        if(token){

            var decoded = jwt.verify(token, 'emi');
            if(decoded){
                next()
            }else{
                res.status(200).send({"msg":"Please Login first"})
                
            }
        }else{
            res.status(200).send({"msg":"Please Login first"})

        }
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
}
module.exports={auth}