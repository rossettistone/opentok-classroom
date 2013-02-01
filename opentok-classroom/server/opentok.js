// var https = require('https')
// var querystring = require('querystring')
// var crypto = require('crypto')

Meteor.methods({
  getNewVideoSession: function () {
    newSessionId = OpenTok.create_session();
    return newSessionId;
  }
})


// tokbox constants:
var TOKEN_SENTINEL = "T1==";
var API_HOST = "api.opentok.com";
var SESSION_API_ENDPOINT = "/hl/session/create";

var RoleConstants = {
    SUBSCRIBER: "subscriber",
    PUBLISHER: "publisher",
    MODERATOR: "moderator"
};

// JS constants
var JSObject = "object";
var JSFunction = "function";
var JSString = "string";
var JSNumber = "number";

// OpenTokSession constructor (only used internally)
var OpenTokSession = function(sessionId){
  this.sessionId = sessionId;
};

// OpenTokSDK constructor
var OpenTokSDK = function(partnerId, partnerSecret){
  this.partnerId = partnerId;
  this.partnerSecret = partnerSecret;
  this.api_url = API_HOST;
};

OpenTokSDK.prototype.generate_token = function(ops){
  ops = ops || {};

  // At some point in this packages existence, three different forms of Session ID were used
  // Fallback to default (last session created using this OpenTokSDK instance)
  var sessionId = ops.session_id || ops.sessionId || ops.session || this.sessionId;

  var createTime = OpenTokSDK.prototype._getUTCDate()
    , sig
    , tokenString
    , tokenParams
    , tokenBuffer
    , dataString
    , dataParams = {
        session_id: sessionId,
        create_time: createTime,
        nonce: Math.floor(Math.random()*999999),
        role: RoleConstants.PUBLISHER // will be overriden below if passed in
      };

  // pass through any other tokbox parameters:
  for(var op in ops){
    if(ops.hasOwnProperty(op)){
      dataParams[op] = ops[op]
    }
  }

  dataString = querystring.stringify(dataParams)
  sig = this._signString(dataString, this.partnerSecret)
  tokenParams = ["partner_id=",this.partnerId,"&sig=",sig,":",dataString].join("")
  tokenBuffer = new Buffer(tokenParams,"utf8");
  return TOKEN_SENTINEL + tokenBuffer.toString('base64');
}


OpenTokSDK.prototype.generateToken = function(ops){
  return this.generate_token(ops);
}

OpenTokSDK.prototype.create_session = function(ipPassthru, properties, callback){
  var sessionId
    , params = {
        partner_id: this.partnerId,
      };

  // No user specified parameter
  if( typeof(ipPassthru) == JSFunction ){
    callback = ipPassthru;
  }
  // location is passed in only
  if( typeof(ipPassthru) == JSString && typeof(properties) == JSFunction ){
    callback = properties;
  }
  // property is passed in only
  if( typeof(ipPassthru) == JSObject && typeof(properties) == JSFunction ){
    callback = properties;
    properties = ipPassthru;
  }
  // property and location passed in, do nothing

  for(var p in properties){
    params[p] = properties[p]
  }

  var self = this;
  sessionId = this._doRequest(params, function(chunks){
    var start = chunks.match('<session_id>')
      , end = chunks.match('</session_id>')
      , sessionId;

    if(start && end){
      self.sessionId = chunks.substr(start.index + 12, (end.index - start.index - 12))
    }
    callback(self.sessionId)
  });
}

OpenTokSDK.prototype.createSession = function(ipPassthru, properties, callback){
  this.create_session(ipPassthru, properties, callback);
}

OpenTokSDK.prototype._signString = function(string, secret){
  var hmac = crypto.createHmac('sha1',secret)
  hmac.update(string)
  return hmac.digest(encoding='hex')
}

OpenTokSDK.prototype._doRequest = function(params, callback){
  var dataString = querystring.stringify(params);

  options = {
    host: this.api_url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': dataString.length,
      'X-TB-PARTNER-AUTH': this.partnerId + ":" + this.partnerSecret
    }
  }

  req = Meteor.https.request("POST", SESSION_API_ENDPOINT, options, function(res){
    var chunks = '';

    res.setEncoding('utf8')

    res.on('data', function(chunk){
      chunks += chunk
    })

    res.on('end', function(){
      callback(chunks);
    })
  })
  req.write(dataString)
  req.end()

}

OpenTokSDK.prototype._getUTCDate = function(){
  var D= new Date();
  return Date.UTC(D.getUTCFullYear(), D.getUTCMonth(), D.getUTCDate(), D.getUTCHours(),
    D.getUTCMinutes(), D.getUTCSeconds()).toString().substr(0,10)
}
