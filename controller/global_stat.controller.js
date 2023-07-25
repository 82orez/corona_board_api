const { GlobalStat } = require('../database');

// 예외 처리를 공통으로 하기 위한 모듈.
const { wrapWithErrorHandler } = require('../util');

// 조건없이 모든 통계 데이터를 반환.
const getAll = async (req, res) => {
  const result = await GlobalStat.findAll();
  // 객체 리터럴의 축약 문법임.
  // res.status(200).json({ result });
  res.status(200).send(result);
};

// 데이터 삽입 또는 업데이트.
const insertOrUpdate = async (req, res) => {
  const { cc, date } = req.body;

  if (!cc || !date) {
    res.status(400).json({ error: 'cc and date are required!' });
    return;
  }

  // 조건에 맞는 데이터 갯수 확인.
  const count = await GlobalStat.count({ where: { cc, date } });

  if (count === 0) {
    await GlobalStat.create(req.body);
  } else {
    await GlobalStat.update(req.body, { where: { cc, date } });
  }

  res.status(200).json({ result: 'success' });
};

// 데이터 삭제.
const remove = async (req, res) => {
  const { cc, date } = req.body;

  if (!cc || !date) {
    res.status(400).json({ error: 'cc and date are required!' });
    return;
  }

  await GlobalStat.destroy({ where: { cc, date } });

  res.status(200).json({ result: 'success' });
};


// * 예외 처리를 wrapWithErrorHandler 함수를 통해 한 번에 처리한다.
module.exports = wrapWithErrorHandler({
  getAll,
  insertOrUpdate,
  remove,
});
