const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pet = sequelize.define(
  "Pet",
  {
    nama_hewan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_hewan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_pemilik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_telp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "pets",
    timestamps: false,
  }
);

async function syncPetModel() {
  try {
    await Pet.sync();
    console.log("Model Pet telah disinkronkan dengan database.");
  } catch (error) {
    console.error("Gagal menyinkronkan model Pet:", error);
  }
}

syncPetModel();
module.exports = Pet;
