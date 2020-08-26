const sessionizeUser = user => {
    return { userId: user.Userid, email: user.email };
  }

  module.exports=sessionizeUser;