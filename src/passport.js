import passport from 'passport'
import passportJWT from 'passport-jwt'
import models from './models'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKeyProvider = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await models.user.findOne({ where: { id: jwtPayload.sub } })
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (err) {
    console.log(err)
    done(err)
  }
})

passport.use(strategy)
