const express = require('express');
const router = express.Router();
const { Artist } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { name, genre } = req.body;
    const newArtist = await Artist.create({ name, genre });
    res.redirect(`/api/artists/${newArtist.id}`); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar artista.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).send('Artista não encontrado.');
    res.render('artists/showArtist', { artist }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao exibir artista.');
  }
});

module.exports = router;
