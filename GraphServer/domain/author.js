module.exports = { typeDef: 
    `
        type Author
        {
            #Title of the book
            id: Int!,
            #Author's LastName
            lastname: String!,
            #Author's FirstName,
            firstname: String!,
        }

        type Query
        {
            #Return all Authors
            Authors: [Author],
            #Return Books by author's Last Name
            AuthorsByLastName(lastName:String!): [Author],
            #Return Authors by Last name, FirstName
            AuthorByLastFirst(lastName: String!, firstName: String!): [Author],
        }
    `
};