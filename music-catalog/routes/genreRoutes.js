const express = require('express');
const router = express.Router();
const { Genre } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newGenre = await Genre.create({ name });
    res.redirect(`/api/genres/${newGenre.id}`); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar gênero.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).send('Gênero não encontrado.');
    res.render('genres/showGenre', { genre });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao exibir gênero.');
  }
});

module.exports = router;
