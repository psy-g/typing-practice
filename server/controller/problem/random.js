const { Test } = require("../../models");

module.exports = async (req, res) => {
  const { title } = req.body;

  console.log("서버", title);

  if (!title) {
    res.status(400).json({ message: "problem failed" });
  }

  const random = title[Math.floor(Math.random() * title.length)];

  const problem = await Test.findAll({
    where: { title: random },
    attributes: ["id", "title", "problem"],
  });

  if (problem) {
    res.status(200).json({ message: "problem ok", data: problem });
  } else {
    res.status(401).json({ message: "problem no" });
  }
};
