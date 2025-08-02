const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const petsRoutes = require('./src/rutas/crud');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/mascotas', petsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
