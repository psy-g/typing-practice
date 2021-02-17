const { Ranking } = require("../../models");

module.exports = async (req, res) => {
  //   const { name, time, average, rank } = req.body;
  const { id, name, time, average, title } = req.body;

  // 유저 아이디 있으면 업데이트
  // 없으면 추가

  if (id) {
    const ranking = await Ranking.update(
      {
        name: name,
        time: time,
        average: average,
        title: title,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(400).json({ message: "update ok" });
  } else {
    if (!time) {
      res.status(400).json({ message: "rank failed" });
    }

    const ranking = await Ranking.findOrCreate({
      where: { name },
      defaults: { name, time, average, title },
    });

    if (time) {
      res.status(200).json({ message: "register ok" });
    } else {
      res.status(401).json({ message: "register no" });
    }
  }
};
