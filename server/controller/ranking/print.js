const { Ranking } = require("../../models");

module.exports = async (req, res) => {
  const { filterTitle } = req.body;

  const filterRanking = await Ranking.findAll({
    where: { title: filterTitle },
    order: [["time", "ASC"]],
  });

  if (!filterTitle) {
    res.status(401).json({ message: "print no" });
  } else {
    res.status(200).json({ message: "print ok", data: filterRanking });
  }
};
