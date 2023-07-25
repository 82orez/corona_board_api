const Sequelize = require('sequelize');

// DB 연결 정보 설정.
const config = {
  host: process.env.CORONABOARD_MYSQL_HOST || '127.0.0.1',
  port: 3306,
  database: 'corona_board',
  user: 'corona_board_admin',
  password: process.env.CORONABOARD_MYSQL_PASSWORD || '1234',
};

// DB 연결 정보 설정을 이용하여 sequelize 인스턴스 생성.
const sequelize = new Sequelize(config.database, config.user, config.password, { host: config.host, dialect: 'mysql' });

// 외부에서 사용할 수 있도록 내보내기.
module.exports = {
  sequelize,
  GlobalStat: require('./global_stat.model')(sequelize),
  KeyValue: require('./key_value.model')(sequelize),
  // 생성할 객체 모델(table)이 여러 개일 경우, 같은 방식으로 아래에 추가하면 됨.
};
