import models from '../../models'

const resolvers = {
  Query: {
    users: () => models.user.findAll(),
    user: (parent, { id }) => models.user.findOne({ where: { id } })
  },
  Mutation: {
    createuser: (parent, args) => models.user.create(args, { fields: ['username', 'firstName', 'lastName', 'password'] })
  }
}
export default resolvers
