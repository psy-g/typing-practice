const { Ranking, Users } = require("../../models");

module.exports = async (req, res) => {
  const {
    id,
    recordTime,
    recordresultSpeed,
    count,
    filterTitle,
    recordArray,
  } = req.body;
  // const { id, time, average, title } = req.body;

  console.log("=========", req.body);

  // 유저 아이디 있으면 업데이트
  // 없으면 추가
  const user = await Users.findOne({
    where: { id: id },
  });

  const ranking = await Ranking.findOne({
    where: { userId: id, title: filterTitle },
  });

  // console.log("ranking", ranking);

  if (!ranking) {
    await Ranking.findOrCreate({
      where: { name: user.nickname, title: filterTitle },
      defaults: {
        name: user.nickname,
        time: recordTime,
        average: Math.round(recordresultSpeed / count),
        title: filterTitle,
        userId: id,
        one: recordArray[0],
        two: recordArray[1],
        three: recordArray[2],
        four: recordArray[3],
        five: recordArray[4],
        six: recordArray[5],
        seven: recordArray[6],
      },
    });

    if (recordTime) {
      const filterRanking = await Ranking.findAll({
        where: { title: filterTitle },
        order: [["time", "ASC"]],
      });

      if (!filterTitle) {
        res.status(401).json({ message: "print no" });
      } else {
        res.status(200).json({ message: "print ok", data: filterRanking });
      }
    } else {
      res.status(401).json({ message: "register no" });
    }
  } else if (ranking) {
    if (ranking.time > recordTime) {
      await Ranking.update(
        {
          name: user.nickname,
          time: recordTime,
          average: Math.round(recordresultSpeed / count),
          title: filterTitle,
          one: recordArray[0],
          two: recordArray[1],
          three: recordArray[2],
          four: recordArray[3],
          five: recordArray[4],
          six: recordArray[5],
          seven: recordArray[6],
        },
        {
          where: {
            userid: id,
            title: filterTitle,
          },
        }
      );
      const filterRanking = await Ranking.findAll({
        where: { title: filterTitle },
        order: [["time", "ASC"]],
      });
      res.status(200).json({ message: "print ok", data: filterRanking });
    } else {
      const filterRanking = await Ranking.findAll({
        where: { title: filterTitle },
        order: [["time", "ASC"]],
      });
      if (!filterTitle) {
        res.status(401).json({ message: "print no" });
      } else {
        res.status(200).json({ message: "print ok", data: filterRanking });
      }
    }
  } else {
    if (!recordTime) {
      res.status(400).json({ message: "rank failed" });
    }
  }

  // } else if (ranking) {
  //   // console.log("======================");
  //   await Ranking.update(
  //     {
  //       name: user.nickname,
  //       time: recordTime,
  //       average: Math.round(recordresultSpeed / count),
  //       title: filterTitle,
  //     },
  //     {
  //       where: {
  //         userid: id,
  //         title: filterTitle,
  //       },
  //     }
  //   );
  //   const filterRanking = await Ranking.findAll({
  //     where: { title: filterTitle },
  //     order: [["time", "ASC"]],
  //   });

  //   if (!filterTitle) {
  //     res.status(401).json({ message: "print no" });
  //   } else {
  //     res.status(200).json({ message: "print ok", data: filterRanking });
  //   }
  //   // res.status(200).json({ message: "update ok" });
  // } else {
  //   if (!recordTime) {
  //     res.status(400).json({ message: "rank failed" });
  //   }
  // }
};

// module.exports = async (req, res) => {
//   const { id, recordTime, recordresultSpeed, count, filterTitle } = req.body;
//   // const { id, time, average, title } = req.body;

//   // 유저 아이디 있으면 업데이트
//   // 없으면 추가
//   const user = await Users.findOne({
//     where: { id: id },
//   });

//   const ranking = await Ranking.findOne({
//     where: { userId: id },
//   });

//   if (!ranking) {
//     await Ranking.findOrCreate({
//       where: { name: user.nickname },
//       defaults: {
//         name: user.nickname,
//         time: recordTime,
//         average: recordresultSpeed / count,
//         title: filterTitle,
//         userId: id,
//       },
//     });

//     if (time) {
//       res.status(200).json({ message: "register ok" });
//     } else {
//       res.status(401).json({ message: "register no" });
//     }
//   } else if (ranking) {
//     // const ranking = await Ranking.update(
//     await Ranking.update(
//       {
//         name: user.nickname,
//         time: recordTime,
//         average: recordresultSpeed / count,
//         title: filterTitle,
//       },
//       {
//         where: {
//           userid: id,
//         },
//       }
//     );
//     res.status(200).json({ message: "update ok" });
//   } else {
//     if (!time) {
//       res.status(400).json({ message: "rank failed" });
//     }
//   }
// };
