module.exports = { typeDef: 
    `
        type Book
        {
            #Title of the book
            title: String!,
            #Genre the book belongs to
            id: String!
            #Id of the Author
            authorId: String!,
        }

        type Query
        {
            #Return all books
            Books: [Book],
            #Return Books by author's Last Name
            BooksByTitle(title:String!): [Book],
        }

        type Mutation
        {
            newbook(title: String!, authorId: String!): Book!
        }
    `
};