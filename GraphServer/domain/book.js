module.exports = { typeDef: 
    `
        type Book
        {
            #Title of the book
            title: String!,
            #Genre the book belongs to
            id: Int!
            #Id of the Author
            authorId: Int!,
        }

        type Query
        {
            #Return all books
            Books: [Book],
            #Return Books by author's Last Name
            BooksByTitle(title:String!): [Book],
        }
    `
};