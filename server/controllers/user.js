const User = require('../models/user');


const create = async (req, res) => {
  const { steamId } = req.body;
  const user = await User.findOne({ steamId: steamId});
  if (user) {
    return res.status(409).send({e:  "409", message: "already exist bruh"});
  }
  try {
    await User.create({...req.body});
    res.status(201).send({ message: "User created yo"} );
  } catch (e) {
    res.status(400).send({ e, message: 'somethings wronggfgfgf' });
  }
};


const profile = async (req, res) => {
  try {
    const { steamId } = req.body;
    const user = await User.findOne({ steamId: steamId});
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send({ e, message: 'User not found' });
  }
};

const getAll = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(400).send({ e, message: 'somethings wronggfgfgf' });
  }
};



module.exports = { create, profile, getAll };
