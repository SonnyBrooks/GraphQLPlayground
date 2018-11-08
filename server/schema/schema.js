const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

//dummy data
var books = [
    { name: 'War Of The Worlds', genre: 'Non-Fiction', id: '1', authorId: '1' },
    { name: 'Harry Potter 1', genre: 'Fantasy', id: '2', authorId: '3' },
    { name: 'Steve Jobs', genre: 'Biography', id: '3', authorId: '2' },
    { name: 'Harry Potter 2', genre: 'Fantasy', id: '2', authorId: '3' },
    { name: 'Harry Potter 3', genre: 'Fantasy', id: '2', authorId: '3' }
];

var authors = [
    { name: 'H. G. Wells', age: 120, id: '1' },
    { name: 'Walter Isaacson', age: 66, id: '2' },
    { name: 'J.K. Rowling', age: 53, id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        },
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});