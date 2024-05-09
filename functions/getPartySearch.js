// This function is the endpoint's request handler.
exports = function (arg) {
  const serviceName = "mongodb-atlas";
  const dbName = "domain";
  const collName = "party";
  const party = context.services
    .get(serviceName)
    .db(dbName)
    .collection(collName);
  console.log("arg: ", JSON.stringify(arg));
  
  // Data can be extracted from the request as follows:
  const { first_name, last_name, dob } = arg.query;

  // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
  const search = {
    '$search': {
      'index': 'default', 
      'compound': {
        'should': [
          {
            'text': {
              'query': 'Lauryn', 
              'path': 'first_name', 
              'fuzzy': {
                'maxEdits': 2, 
                'prefixLength': 2
              }
            }
          }, {
            'text': {
              'query': 'Mcmil', 
              'path': 'last_name', 
              'fuzzy': {
                'maxEdits': 2, 
                'prefixLength': 2
              }
            }
          }, {
            'near': {
              'path': 'dob', 
              'origin': new Date('Fri, 01 Feb 1985 00:00:00 GMT'), 
              'pivot': 2629800000
            }
          }
        ]
      }
    }
  };
  
  const addFields = {
    '$addFields': {
      'score': {
        '$meta': 'searchScore'
      }, 
      'scoreDetails': {
        '$meta': 'searchScoreDetails'
      }
    }
  }
  
  const limit = {
    '$limit': 10
  }

  const agg = [search, addFields, limit];
  console.log("agg: ", JSON.stringify(agg));

  // Headers, e.g. {"Content-Type": ["application/json"]}
  //const contentTypes = headers["Content-Type"];

  // Raw request body (if the client sent one).
  // This is a binary object that can be accessed as a string using .text()
  //const reqBody = body;

  //console.log("Content-Type:", JSON.stringify(contentTypes));
  //console.log("Request body:", reqBody);

  // You can use 'context' to interact with other application features.
  // Accessing a value:
  // var x = context.values.get("value_name");

  // Querying a mongodb service:
  const doc = party.aggregate(agg);

  // Calling a function:
  // const result = context.functions.execute("function_name", arg1, arg2);

  // The return value of the function is sent as the response back to the client
  // when the "Respond with Result" setting is set.
  return doc;
};
