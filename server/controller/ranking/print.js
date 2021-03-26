const { Ranking } = require("../../models");

module.exports = async (req, res) => {
  const { title, name } = req.body;

  const filterRanking = await Ranking.findAll({
    where: { title: title },
    order: [["time", "ASC"]],
  });

  const filterMyRanking = await Ranking.findAll({
    where: { title: title, name: name },
  });

  if (!title) {
    res.status(401).json({ message: "print no" });
  } else {
    res.status(200).json({
      message: "print ok",
      data: filterRanking,
      myRank: filterMyRanking,
    });
  }
};
