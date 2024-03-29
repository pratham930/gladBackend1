

// import jwt from 'jsonwebtoken';
// import registration from '../models/Schema.js';

// var authenticate = async (req, res, next) => {
//   let token
//   const { authorization } = req.headers
//   if (authorization && authorization.startsWith('Bearer')) {
//     try {
//       // Get Token from header
//       token = authorization.split(' ')[1]

//       // Verify Token
//       const { userID } = jwt.verify(token, process.env.SECRET_KEY)
// console.log("user")
//       // Get User from Token
//       req.user = await registration.findById(userID)

//       next()
//     } catch (error) {
//       console.log(error)
//       res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
//     }
//   }
//   if (!token) {
//     res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
//   }
// }

// export default authenticate;





import jwt from 'jsonwebtoken';
import Registration2 from '../Schema/Registration2.js';

var authenticate = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      // console.log(process.env.SECRET_KEY)
      // console.log(token)
      const { userID } = jwt.verify(token, process.env.SECRET_KEY)
      // console.log(userID)
      // Get User from Token
      req.user = await Registration2.findById(userID)
      // console.log(req.user)
      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

export default authenticate;




// import jwt from 'jsonwebtoken'
// import Registration2 from '../Schema/Registration2'

// var authenticate = async (req, res, next) => {
//   let token
//   const { authorization } = req.headers
//   if (authorization && authorization.startsWith('Bearer')) {
//     try {
//       // Get Token from header
//       token = authorization.split(' ')[1]

//       // Verify Token
//       const { userID } = jwt.verify(token, process.env.SECRET_KEY)
// console.log("user")
//       // Get User from Token
//       req.user = await Registration2.findById(userID)

//       next()
//     } catch (error) {
//       console.log(error)
//       res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
//     }
//   }
//   if (!token) {
//     res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
//   }
// }

// export default authenticate;