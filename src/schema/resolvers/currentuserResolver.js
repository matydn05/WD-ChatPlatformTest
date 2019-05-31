
const resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      if (!context.user) {
        return null
      } else {
        return context.user
      }
    }
  }
}

export default resolvers
