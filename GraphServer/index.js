const server = require("apollo-server-azure-functions");

const schema = require("./schema");

module.exports = function run(context, req){
    if(req.method === "POST")
    {
        server.graphqlAzureFunctions({
            endpointURL: "/api/GraphServer",
            schema: schema
        })(context, req);
    }else if (req.method === "GET")
    {
        server.graphiqlAzureFunctions({
            endpointURL: "/api/GraphServer",
            schema: schema
        })(context, req);
    }
};