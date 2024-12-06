const express = require('express');
const router = express.Router();
const { Album } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { title, releaseYear, cover } = req.body;
    const newAlbum = await Album.create({ title, releaseYear, cover });
    res.redirect(`/api/albums/${newAlbum.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar álbum.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (!album) return res.status(404).send('Álbum não encontrado.');
    res.render('albums/showAlbum', { album }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao exibir álbum.');
  }
});

module.exports = router;
