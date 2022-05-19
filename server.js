require('dotenv/config');
require('express-async-errors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./Resolvers');
const typeDefs = require('./TypeDefs');
const { connection } = require('./Database/utilis');
const { verifyUser } = require('./Helper/Context');
const error = require('./Middlewares/error');
const cors = require('cors');


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        await verifyUser(req)
        return {
            email: req.email,
            loggedInUserId: req.loggedInUserId
        }
    },
    formatError: (err) => {
        console.log(err.GraphQLError);
        return err;
    }
});

async function startServer() {
    const app = express();
    app.use(express.json());
    app.use(cors());
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.use('/', (req, res) => {
        res.send({
            message: "Hwllo World"
        })
    })
    const port = process.env.PORT || 3001
    connection();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Graphql Endpoint is running on ${apolloServer.graphqlPath}`);
    })
}
startServer();

