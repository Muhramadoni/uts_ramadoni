const express = require("express");
const pet = require("./models/PetModel");
const app = express();

app.use(express.json());

app.get("/api/pets", async (req, res) => {
  try {
    const pets = await pet.findAll();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil data hewan peliharaan" });
  }
});

app.get("/api/pets/:id", async (req, res) => {
  try {
    const petId = req.params.id;
    const foundPet = await pet.findByPk(petId);

    if (foundPet) {
      res.json(foundPet);
    } else {
      res.status(404).json({ error: "Hewan peliharaan tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error detail:", error);
    res.status(500).json({ error: "Gagal mengambil data hewan peliharaan", detail: error.message });
  }
});

app.post("/api/pets", async (req, res) => {
  try {
    const newPet = await pet.create(req.body);
    res.status(201).json(newPet);
  } catch (error) {
    console.error("Error detail:", error);
    res.status(500).json({ error: "Gagal menambahkan hewan peliharaan", detail: error.message });
  }
});

app.put("/api/pets/:id", async (req, res) => {
  try {
    const petId = req.params.id;
    const [updated] = await pet.update(req.body, { where: { id: petId } });
    if (updated) {
      const updatedPet = await pet.findOne({ where: { id: petId } });
      res.json(updatedPet);
    } else {
      res.status(404).json({ error: "Hewan peliharaan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui hewan peliharaan" });
  }
});

app.delete("/api/pets/:id", async (req, res) => {
  try {
    const petId = req.params.id;
    const deleted = await pet.destroy({ where: { id: petId } });
    if (deleted) {
      res.json({ message: "Hewan peliharaan berhasil dihapus" });
    } else {
      res.status(404).json({ error: "Hewan peliharaan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus hewan peliharaan" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
