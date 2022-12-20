const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password, confirmPassword } = req.body;
  
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const findUser = await User.findOne({ email });
  console.log(findUser)

  if (findUser) {
    res.status(400);
    throw new Error("User already exists");
    // res.json("User already exists")
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords not matched");
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.send("Registered Successfully");
    res.status(201);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400)
    throw new Error("Please fill all the details")
  }

  const user = await User.findOne({ email })
  if(user && (await bcrypt.compare(password, user.password))) {
    res.send("Logged In Successfully")
    res.status(200)
    res.json({
      name: user.name,
      email: user.email
    });
  }
  else {
    res.status(401)
    throw new Error("Invalid Credentials")
  }
  
})

const generateToken = (id) => {
  jwt.sign(id, process.env.SECRET_KEY);
}

module.exports = { registerUser, loginUser };
