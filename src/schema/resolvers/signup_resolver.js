
import models from '../../models'
import createToken from '../../auth'

const resolvers = {
  Mutation: {
    async signup (parent, { data }, context) {
      const { username, password, lastName, firstName } = data
      if (!username || !password) return { authError: 'No password or username' }
      const count = await models.user.count({ where: { username: username } })
      if (count > 0) {
        return { authError: 'The username already exists' }
      } else {
        const user = await models.user.create({ username, password, lastName, firstName })
        return {
          user: user,
          jwt: createToken(getNonSensibleInformation(user))

        }
      }
    }
  }
}

function getNonSensibleInformation (user) {
  return {
    username: user.username,
    firstName: user.firstName
  }
}

export default resolvers
