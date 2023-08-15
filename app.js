const express = require('express');
const { sequelize } = require('./database');
const globalStatController = require('./controller/global_stat.controller');
const keyValueController = require('./controller/key_value.controller');
// cors 적용
const cors = require('cors');

const launchServer = async () => {
  const app = express();
  app.use(express.json({ strict: false }));
  app.use(express.urlencoded({ extended: true }));
  // cors 적용
  app.use(cors());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello Corona' });
  });

  app.get('/global-stats', globalStatController.getAll);
  app.post('/global-stats', globalStatController.insertOrUpdate);
  app.delete('/global-stats', globalStatController.remove);

  app.get('/key-value/:key', keyValueController.get);
  app.post('/key-value', keyValueController.insertOrUpdate);
  app.delete('/key-value/:key', keyValueController.remove);

  try {
    await sequelize.sync();
    console.log('DB is ready!');
  } catch (e) {
    console.log('Unable to connect to DB!!');
    console.error(e);
    process.exit(1);
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

launchServer();

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C

/*
아래는 body 의 예시.

{
  "cc": "KR",
  "date": "2020-02-14",
  "confirmed": 28,
  "death": 0,
  "negative": 6779,
  "released": 7,
  "tested": 7242,
  "testing": 535
}
 */
