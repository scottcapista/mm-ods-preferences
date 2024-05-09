// This function is the endpoint's request handler.
exports = function(arg) {
    const serviceName = "mongodb-atlas";
    const dbName = "domain";
    const collName = "party";
    const party = context.services.get(serviceName).db(dbName).collection(collName);
    
    // Data can be extracted from the request as follows:
    const {identifierType} = arg.query;
    const {identifier} = arg.query;
    
    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const query = {"identifier":  identifier, "identifierType":identifierType};

    // Headers, e.g. {"Content-Type": ["application/json"]}
    //const contentTypes = headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    //const reqBody = body;

    console.log("arg: ", JSON.stringify(arg));
    console.log("query: ", JSON.stringify(query));
    //console.log("Content-Type:", JSON.stringify(contentTypes));
    //console.log("Request body:", reqBody);

    // You can use 'context' to interact with other application features.
    // Accessing a value:
    // var x = context.values.get("value_name");

    // Querying a mongodb service:
    const doc = party.findOne(query);

    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return  doc;
};
