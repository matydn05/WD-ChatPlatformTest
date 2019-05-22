
import models from '../../models'
import createToken from '../../auth'

const resolvers = {
  Mutation: {
    signup (parent, { data }, context) {
      const { username, password, lastName, firstName } = data
      if (!username || !password) return { error: 'No password or username' }
      const user = models.user.findOrCreate({
        where: { username: username },
        defaults: { password: password, lastName: lastName, firstName: firstName }
      })
      const jwt = createToken
      return {
        user,
        jwt,
        error: 'No'
      }
    }
  }
}

/*
const resolvers = {
  Mutation: {
    signup (parent, { data }, context) {
      const { username, password, lastName, firstName } = data
      return {
        user: models.user.findOrCreate({
          where: { username: username },
          defaults: { password: password, lastName: lastName, firstName: firstName }
        }),
        jwt: createToken,
        error: ''
      }
    }

  }
}
*/

export default resolvers
