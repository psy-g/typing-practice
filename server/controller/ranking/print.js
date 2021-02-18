const { Ranking } = require("../../models");

module.exports = async (req, res) => {
  const { title } = req.body;

  const filterRanking = await Ranking.findAll({
    where: { title: title },
    order: [["time", "ASC"]],
  });

  if (!title) {
    res.status(401).json({ message: "print no" });
  } else {
    res.status(200).json({ message: "print ok", data: filterRanking });
  }
};
