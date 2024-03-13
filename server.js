const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura express.static para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '.public')));

// Usa las rutas definidas en apiRoutes y htmlRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
