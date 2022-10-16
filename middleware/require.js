
import jwt from "jsonwebtoken"


  
class middile {
  

    static requireSignin = (req, res, next) => {

        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
          } else {
            return res.status(400).json({ message: "Authorization required" });
          }
          next();
          //jwt.decode()
        
      };



    static admin = (req, res, next) => {
      console.log("ajhfkbg")
      console.log(req.user.role,"27")
      if (req.user.role !== "admin") {
        console.log("not admin")
          return res.status(400).send({ message: "Admin access denied" });
        }
        console.log("admin")
        next();
      };

    // static admin = (req, res, next) => {
    //   console.log("ajhfkbg")
    //   console.log(req.user,"27")
    //   // if (req.user.role !== "admin") {
    //   //   console.log("not admin")
    //   //     return res.status(400).send({ message: "Admin access denied" });
    //   //   }
    //     console.log("admin")
    //      next();
    //   };


    static seller = (req, res, next) => {
        console.log(req.user.role)
            if (req.user.role !== "seller") {
              
              return res.status(400).json({ message: "User access denied" });
            }
            console.log("seller")
            next();
          };
      
  static staff = (req, res, next) => {
    console.log(req.user.role)
        if (req.user.role !== "staff") {
          
          return res.status(400).json({ message: "User access denied" });
        }
        console.log("staff")
        next();
      };
}
export default middile ;

