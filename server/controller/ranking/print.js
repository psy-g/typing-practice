const { Ranking } = require("../../models");

module.exports = async (req, res) => {
  const filterRanking = await Ranking.findAll(
    // {
    //   attributes: ["name", "time", "average"],
    // },
    {
      order: [["time", "ASC"]],
    }
  );

  res.status(400).json({ data: filterRanking });
};
