const User = require('../modules/user');
module.exports.authenticationForSeller = async (req, res, next)=>{
  console.log(req.headers.authorization);
  const currentUser = await User.findOne({'services.resume.loginTokens':{$elemMatch:{'hashedToken':req.headers.authorization}}});
  if (currentUser === null){
    res.status(401).send('you need login as admin');
    return;
  }
  next();
}