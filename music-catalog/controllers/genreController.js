const { Genre } = require('../models');

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;

    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Gênero não encontrado.' });

    await genre.destroy();
    res.status(200).json({ message: 'Gênero deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
