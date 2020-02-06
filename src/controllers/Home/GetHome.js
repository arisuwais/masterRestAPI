const pool = require('../../config/db');

const GetVersion = async (req, res) => {

  try {

    pool.query(`SELECT * FROM bread`, (err, data) => {
      console.log(data, "Data")

      res.status(200).send({
        statusText: 'ok',
        statusCode: 200,
        message: `get versiond is successful`,
        result: data
      });
    })
  } catch (error) {
    res.status(500).send({
      statusText: 'Internal server error',
      statusCode: 500,
      message: `version is not successful, ${error.stack}`,
    });
  }
};

module.exports = GetVersion;