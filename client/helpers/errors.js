// Create this on client-side only
Errors = new Mongo.Collection(null);

throwError = function(message) {
    Errors.insert({message})
};
