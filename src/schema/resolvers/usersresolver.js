import models from '../../models'

const resolvers = {
  Query: {
    users: () => models.user.findAll(),
    user: (parent, { id }) => models.user.findOne({ where: { id } })
  }
}
export default resolvers
