
import models from '../../models'
import createToken from '../../auth'

const resolvers = {
  Mutation: {
    async signin (parent, { data }, context) {
      const { username, password } = data
      if (!username || !password) return { authError: 'No password or username' }

      const user = await models.user.findOne({ where: { username: username } })
      if (!user) { return { authError: 'The username does not exist' } }
      if (!(await user.passwordMatches(password))) {
        return {
          authError: 'Wrong password'
        }
      } else {
        return {
          user: user,
          jwt: createToken(await models.user.getNonSensibleInformation(user))
        }
      }
    }
  }
}

export default resolvers
