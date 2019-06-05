import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import models from './models'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await models.user.findOne({ where: { id: jwtPayload.sub } })
    if (user) {
      return done(null, user)
    } else {
      return done(null, null)
    }
  } catch (err) {
    console.log(err)
    done(err)
  }
}))

passport.initialize()

export default (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      next(err)
    } else {
      req.user = user || null
      next()
    }
  })(req, res, next)
}
