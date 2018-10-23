const graphqlTools = require("graphql-tools");
const find = require("lodash/find");
const filter = require("lodash/filter");

//these will be used in another example.
//const fetch = require("node-fetch");
//const https = require("https");

//bring in type defs
const book = require("./domain/book");
const author = require("./domain/author");

//bring in static data.
const data = require("./data");


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

const objectResolvers = {
    Query:{
        Books: () => data.books,
        BooksByTitle: (_, { title }) => find(data.books, { title }),
        Authors: () => data.authors,
        AuthorsByLastName: (_, { lastname }) => filter(data.authors, { lastname }),
        AuthorByLastFirst: (_, { lastname, firstName }) => filter(data.authors, {lastname, firstname }),
    },
    Author: {
        books: author => filter(data.authors, { authorId : author.id}),
    },
    Book: {
        author: book => find(data.authors, { id: book.authorId }),
    },
};

const bookSchema = graphqlTools.makeExecutableSchema({typeDefs: book.typeDef });
const authorSchema = graphqlTools.makeExecutableSchema({typeDefs: author.typeDef });

const schema = graphqlTools.mergeSchemas({schemas: [bookSchema, authorSchema, linkTypeDefs]});
module.exports = graphqlTools.mergeSchemas({
    schemas: [schema],
    resolvers: [objectResolvers]
});

