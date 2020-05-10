const apiKEY = "2abbf7c3-245b-404f-9473-ade729ed4653";

function validateToken( req, res, next ){

let bearerAuth = req.headers.authorization;
if(bearerAuth){
    if(bearerAuth !== `Bearer ${apiKEY}`){
        res.statusMessage = "the bearer token is invalid.";
        return res.status( 401 ).end();
    }
    return next();
}

let headerAuth = req.header('bookmark-api-key');
if( headerAuth ){
    if(headerAuth !== apiKEY){
        res.statusMessage = "the header token is invalid.";
        return res.status( 401 ).end();
    }
    return next();
}

let queryAuth = req.query.apiKey;
if(queryAuth){
    if(queryAuth !== apiKEY){
        res.statusMessage = "the query parameter token is invalid.";
        return res.status( 401 ).end();
    }
    return next();
}

res.statusMessage = "your token is unathorized.";
return res.status(401).end();
}

module.exports = validateToken;