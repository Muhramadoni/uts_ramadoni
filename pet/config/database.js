const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("petdaycare_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Koneksi ke MySQL berhasil"))
  .catch((err) => console.log("Koneksi gagal:", err));

module.exports = sequelize;
