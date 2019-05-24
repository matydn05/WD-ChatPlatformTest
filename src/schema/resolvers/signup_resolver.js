
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
        const newuser = await models.user.create({ username, password: password, lastName: lastName, firstName: firstName })
        const user = { username: newuser.username }
        const token = createToken(user)
        return {
          user: newuser,
          jwt: token
        }
      }
    }
  }
}

export default resolvers
