const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = async (req, res) => {
  const { nickname, password } = req.body;

  if (!nickname || !password) {
    return res.status(400).json({ message: "failed" });
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  const duplicateCheck = await Users.findOne({
    where: { nickname: nickname },
  });

  // console.log("=====", duplicateCheck);

  if (duplicateCheck) {
    res.status(201).json({ message: "already registered user" });
  } else {
    const signup = await Users.findOrCreate({
      where: { nickname },
      defaults: { nickname, password: hash },
    });
    res.status(201).json({ message: "signup" });
  }

  // const signup = await Users.findOrCreate({
  //   where: { nickname },
  //   defaults: { nickname, password: hash },
  // });

  // const [users] = signup;

  // console.log("=====", users);

  // if (users.nickname === nickname) {
  //   res.status(401).json({ message: "already registered user" });
  // } else {
  //   res.status(201).json({ message: "signup" });
  // }
};
