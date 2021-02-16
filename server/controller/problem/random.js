const { Test } = require("../../models");

module.exports = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "problem failed" });
  }

  const problem = await Test.findAll({
    where: { title },
    attributes: ["id", "problem"],
  });

  if (problem) {
    res.status(200).json({ message: "problem ok", data: problem });
  } else {
    res.status(401).json({ message: "problem no" });
  }
};
