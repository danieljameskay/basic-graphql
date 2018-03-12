const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        userId: { 
            type: GraphQLString
        },
        id: { 
            type: GraphQLString,
        },
        title: { 
            type: GraphQLString 
        },
        body: { 
            type: GraphQLString 
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: {
                id: { 
                    type: GraphQLString
                },
            },
            resolve(parentValue, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                    .then(response => response.data);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parentValue, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts`)
                    .then(response => response.data);
            }
        }
    }
});

// Representation of the capabilities of a GraphQL Server.
// We supply the operations that are available, and these are exposed to the server,
module.exports = new GraphQLSchema({
    query: RootQuery
});