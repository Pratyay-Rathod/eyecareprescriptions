const User = require("../Model/User");
const Staff = require("../Model/Staff");
const jwt = require("jsonwebtoken");

const handleError = (error) => {

  let err = { username: "", password: "" };

  if (error.code === 11000) {
    err.email = "Email Id is already exist Please try with another";
    return err
  }

  if (error.message === "Incorrect Email") {
    err.email = "This Email is not Registered Please Sign Up";
  }

  if (error.message === "Incorrect Password") {
    err.password = "Incorrect Password Please Try Again";
  }

  if (error.message.includes("User validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      err[properties.path] = properties.message;
    })
  }

  return err
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "user is secret", {
    expiresIn: maxAge
  });
}

module.exports.admin_signup_post = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  console.log("email-",email)
  try {
    const token = createToken();
    const result = await User.create({ username, email, password, token });
    res.status(201).json({ token:token,admin: result._id });
  }
  catch (error) {
    console.log(error)
    const errors = handleError(error);
    res.status(404).json({ errors });
  }
}

module.exports.admin_login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    res.status(200).json({ token:user.token,admin: user._id });
  }
  catch (error) {
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
}

module.exports.staff_signup_post = async (req, res) => {
  const { username, password, contactNumber } = req.body;

  try {
    const token = createToken();
    const result = await Staff.create({ username, password, contactNumber, token });
    res.status(201).json({ message: "Staff Created Successfully", token: token });
  }
  catch (error) {
    console.log(error)
    const errors = handleError(error);
    res.status(404).json({ errors });
  }
}

module.exports.staff_login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Staff.login(username, password);
    res.status(200).json({ token:user.token, user: user._id });
  }
  catch (error) {
    console.log(error)
    const errors = handleError(error);
    res.status(400).json({ errors });
  }
}

module.exports.staff_authentication = async (req, res) => {
    const token = req.params.token;
    try {
      // Find the user in the database based on the token
      const user = await Staff.findOne({ token: token }); // No changes here, using the token variable directly
      
      if (!user) {
        return res.status(401).json({ isAuthenticated:false,error: 'Invalid token.' });
      }

      // Token is valid, user is authenticated
      return res.status(200).json({ isAuthenticated: true});

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }

} 

module.exports.admin_authentication = async (req, res) => {
  const token = req.params.token;
  try {
    // Find the user in the database based on the token
    const user = await User.findOne({ token: token }); // No changes here, using the token variable directly
    
    if (!user) {
      return res.status(401).json({ isAuthenticated:false,error: 'Invalid token.' });
    }

    // Token is valid, user is authenticated
    return res.status(200).json({ isAuthenticated: true});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }

} 