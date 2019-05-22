
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export const createToken = async (user) => {
  const createToken = jwt.sign(
    user,
    secret,
    {
      expiresIn: '10d'
    }
  )
  return createToken
}
