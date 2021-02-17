const { Ranking } = require("../../models");

module.exports = async (req, res) => {
  const { title } = req.body;

  const filterRanking = await Ranking.findAll({
    where: { title: title },

    order: [["time", "ASC"]],
  });

  res.status(400).json({ data: filterRanking });
};
