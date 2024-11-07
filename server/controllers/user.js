const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secure key ong';

const create = async (req, res) => {
  const { username, password, birthDate, email, steamId } = req.body;
  const user = await User.findOne({ username: username });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    let newUser = User.create({username: username, password: hash, steamId: steamId, birthDate: birthDate, email: email});

    const accessToken = jwt.sign({ _id: newUser._id, username: newUser.username }, SECRET_KEY);
    res.status(201).json({message: "Welcome", token: accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id, username: user.username}, SECRET_KEY);
    res.status(200).json({message: "Welcome back", token: accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const profile = async (req, res) => {
  try {
    const { _id, email, username, steamId } = req.user;
    const user = { _id, email, username, steamId };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'User not found' });
  }
};

const logout = (req, res) => {

};

module.exports = { create, login, profile, logout };
