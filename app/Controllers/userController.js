const bcrypt = require('bcrypt'),
        db = require('../Models'),
        jwt = require('jsonwebtoken');

const User = db.Users;

const signup = async(req, res) => {
    try {
        const {username, email, password}= req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
        };
        const user = await User.create(data)
        if(user){
            let token = jwt.sign(
              {id: user.id}, 
              process.env.secretKey, 
              {expiresIn: '24h'}
            );
            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            return res.status(201).send(user);
        }else{
            return res.status(409).send("Details are not correct");
        }
    }catch(error){
        console.log(error);
    }
}

const login = async (req, res) => {
 try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }
    
    const user = await User.findOne({
      where: {
      email: email
      }  
    });

    if (!user || !user.password) {
      return res.status(401).send("Authentication failed");
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
        let token = jwt.sign(
          {id: user.id},
          process.env.secretKey,
          {expiresIn: '24h'}
        );
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        return res.status(201).send(user);
    } else {
      return res.status(401).send("Authentication failed");
    }
 } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred");
 }
};

module.exports = {
 signup,
 login,
};