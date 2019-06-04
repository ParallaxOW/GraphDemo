const graphqlTools = require("graphql-tools");
const find = require("lodash/find");
const filter = require("lodash/filter");


//these will be used in another example.
const fetch = require("node-fetch");
const https = require("https");

//bring in type defs
const book = require("./domain/book");
const author = require("./domain/author");

const linkTypeDefs = `
    extend type Book{
        #The Author of the book
        author: Author!,
    }

    extend type Author{
        #List of books by this author
        books: [Book],
    }
`;
const BASE_URL = "http://localhost:7073/api"

const objectResolvers = {
    Query:{
        Books: () => fetch(`${BASE_URL}/books`).then(res => res.json()),
        BooksByTitle: (_, { title }) => fetch(`${BASE_URL}/books/${title}`).then(res => res.json()),
        Authors: () => fetch(`${BASE_URL}/authors`).then(res => res.json()),
        AuthorsByLastName: (_, { lastname }) => filter(data.authors, { lastname }),
    },
    Author: {
        books: author => fetch(`${BASE_URL}/bookbyauthor/${author.id}`).then(res => res.json()),
    },
    Book: {
        author: book => fetch(`${BASE_URL}/authorbyid/${book.authorId}`).then(res => res.json()),
    },
};

const bookSchema = graphqlTools.makeExecutableSchema({typeDefs: book.typeDef });
const authorSchema = graphqlTools.makeExecutableSchema({typeDefs: author.typeDef });

const schema = graphqlTools.mergeSchemas({schemas: [bookSchema, authorSchema, linkTypeDefs]});
module.exports = graphqlTools.mergeSchemas({
    schemas: [schema],
    resolvers: [objectResolvers]
});

