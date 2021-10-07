const { Sequelize, DataTypes } = require('sequelize');
const { performance } = require('perf_hooks');

const sequelize = new Sequelize('test', 'root', 'test', {
    host: 'localhost',
    dialect: 'mysql',
    query : {
        raw: true
    }
  });

const MockData = sequelize.define('MockData', 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.INTEGER
      },    last_name: {
        type: DataTypes.INTEGER
      },    email: {
        type: DataTypes.INTEGER
      },    gender: {
        type: DataTypes.INTEGER
      },    ip_address: {
        type: DataTypes.INTEGER
      },
}, 
{
    tableName: "MOCK_DATA",
    timestamps: false,
});

(async function(){
  var startTime = performance.now()
  var numRows = 0;
    
    for (var i = 0; i<100; i++) {
        const mock = await sequelize.query("SELECT CAST(`id` AS DECIMAL(10,2)) `test`, CAST('2020-01-01 10:10:10' AS DATETIME) `birth`, `first_name`, `last_name`, `email`, `gender`, `ip_address` FROM `MOCK_DATA` AS `MockData`");
        console.assert(mock != null);
        numRows += mock[0].length;
    }
    var endTime = performance.now()

    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
    console.log(`RPS: ${1000*numRows / (endTime - startTime)}`)
    
})();