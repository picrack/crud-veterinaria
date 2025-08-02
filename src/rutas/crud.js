const express = require('express');
const fs = require('fs');
const router = express.Router();

const dataPath = './src/data/mascotas.json';

// Helper para leer y escribir en el archivo
const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Listar mascotas con filtros
router.get('/', (req, res) => {
  const { tipo, raza } = req.query;
  let pets = readData();

  if (tipo) pets = pets.filter((pet) => pet.tipo.toLowerCase() === tipo.toLowerCase());
  if (raza) pets = pets.filter((pet) => pet.raza.toLowerCase() === raza.toLowerCase());

  res.status(200).json(pets);
});

router.get('/tipos', (req, res) => {
  const pets = readData();
  const tipos = pets.map((pet) => pet.tipo);
  const tiposUnicos = [...new Set(tipos)];

  res.status(200).json(tiposUnicos);
});

router.get('/razas', (req, res) => {
  const pets = readData();
  const razas = pets.map((pet) => pet.raza);
  const razasUnicas = [...new Set(razas)];

  res.status(200).json(razasUnicas);
});

// Crear nueva mascota
router.post('/', (req, res) => {
  const pets = readData();
  const newPet = { id: Date.now(), ...req.body };

  pets.push(newPet);
  writeData(pets);

  res.status(201).json(newPet);
});

// Actualizar mascota
router.put('/:id', (req, res) => {
  const pets = readData();
  const index = pets.findIndex((pet) => pet.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ error: 'Pet not found' });

  pets[index] = { ...pets[index], ...req.body };
  writeData(pets);

  res.status(200).json(pets[index]);
});

// Eliminar mascota
router.delete('/:id', (req, res) => {
  const pets = readData();
  const updatedPets = pets.filter((pet) => pet.id !== parseInt(req.params.id));

  if (pets.length === updatedPets.length) return res.status(404).json({ error: 'Pet not found' });

  writeData(updatedPets);
  res.status(200).json({ message: 'Pet deleted' });
});

module.exports = router;
