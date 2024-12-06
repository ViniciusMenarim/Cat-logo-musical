const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  
const sequelize = require('./config/database');
const { Album, Artist, Genre } = require('./models');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/albums', async (req, res) => {
    const albums = await Album.findAll({ include: [Artist, Genre] });
    res.render('albums/listAlbums', { albums });
});

app.get('/api/albums/new', (req, res) => {
    res.render('albums/newAlbum');
});

app.post('/api/albums', async (req, res) => {
    const { title, releaseYear, cover } = req.body;
    await Album.create({ title, releaseYear, cover });
    res.redirect('/api/albums');
});

app.get('/api/albums/:id/edit', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    res.render('albums/editAlbum', { album });
});

app.post('/api/albums/:id', async (req, res) => {
    const { title, releaseYear, cover } = req.body;
    const album = await Album.findByPk(req.params.id);
    await album.update({ title, releaseYear, cover });
    res.redirect('/api/albums');
});

app.post('/api/albums/:id/delete', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.destroy();
    res.redirect('/api/albums');
});

app.get('/api/albums/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id, { include: [Artist, Genre] });
    res.render('albums/showAlbum', { album });
});

app.get('/api/artists', async (req, res) => {
    const artists = await Artist.findAll({ include: [Album] });
    res.render('artists/listArtists', { artists });
});

app.get('/api/artists/new', (req, res) => {
    res.render('artists/newArtist');
});

app.post('/api/artists', async (req, res) => {
    const { name, genre } = req.body;
    await Artist.create({ name, genre });
    res.redirect('/api/artists');
});

app.get('/api/artists/:id/edit', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    res.render('artists/editArtist', { artist });
});

app.post('/api/artists/:id', async (req, res) => {
    const { name, genre } = req.body;
    const artist = await Artist.findByPk(req.params.id);
    await artist.update({ name, genre });
    res.redirect('/api/artists');
});

app.post('/api/artists/:id/delete', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.destroy();
    res.redirect('/api/artists');
});

app.get('/api/artists/:id', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id, { include: [Album] });
    res.render('artists/showArtist', { artist });
});

// Rota de gêneros
app.get('/api/genres', async (req, res) => {
    const genres = await Genre.findAll();
    res.render('genres/listGenres', { genres });
});

app.get('/api/genres/new', (req, res) => {
    res.render('genres/newGenre');
});

app.post('/api/genres', async (req, res) => {
    const { name } = req.body;
    await Genre.create({ name });
    res.redirect('/api/genres');
});

app.get('/api/genres/:id/edit', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    res.render('genres/editGenre', { genre });
});

app.post('/api/genres/:id', async (req, res) => {
    const { name } = req.body;
    const genre = await Genre.findByPk(req.params.id);
    await genre.update({ name });
    res.redirect('/api/genres');
});

app.post('/api/genres/:id/delete', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    await genre.destroy();
    res.redirect('/api/genres');
});

app.get('/api/genres/:id', async (req, res) => {
    const genre = await Genre.findByPk(req.params.id);
    res.render('genres/showGenre', { genre });
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(error => console.error('Erro ao sincronizar o banco de dados:', error));
