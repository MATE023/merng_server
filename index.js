const { PubSub } = require('graphql-subscriptions');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphQl/TypeDefs');
const resolvers = require('./graphQl/resolvers');
//const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ( { req }) => ({ req, pubsub })
});

mongoose.connect('mongodb+srv://user1:IriO2w2TCbAcY3sI@cluster0.wfmom.mongodb.net/mong?retryWrites=true&w=majority', { useNewUrlParser: true})
.then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
})
.then((res) => {
        console.log(`Server running at ${res.url}`)
})
.catch(err => {
    console.error(err);
});