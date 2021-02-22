const { Test, Ranking } = require("../../models");

module.exports = async (req, res) => {
  const { title } = req.body;

  const ranking = await Ranking.findOne({
    where: { title: title },
    order: [["time", "ASC"]],
  });

  // console.log("========", title);

  if (!title) {
    res.status(400).json({ message: "problem failed" });
  }

  // const random = title[Math.floor(Math.random() * title.length)];

  const problem = await Test.findAll({
    where: { title: title },
    attributes: ["id", "title", "problem"],
  });

  if (problem) {
    // res.status(200).json({ message: "problem ok", data: problem });
    res
      .status(200)
      .json({ message: "problem ok", data: problem, winner: ranking });
  } else {
    res.status(401).json({ message: "problem no" });
  }
};
