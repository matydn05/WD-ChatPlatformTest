
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

const createToken = (user) => {
  const createToken = jwt.sign(
    user,
    secret,
    {
      expiresIn: '10d'
    }
  )
  return createToken
}

export default createToken
