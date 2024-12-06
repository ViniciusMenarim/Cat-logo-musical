const { Artist, Album, Genre } = require('../models');

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      include: [Album, Genre],
    });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createArtist = async (req, res) => {
  try {
    const { name, genre, albumIds, genreIds } = req.body;
    const artist = await Artist.create({ name, genre });

    if (albumIds) {
      const albums = await Album.findAll({ where: { id: albumIds } });
      await artist.addAlbums(albums);
    }
    if (genreIds) {
      const genres = await Genre.findAll({ where: { id: genreIds } });
      await artist.addGenres(genres);
    }

    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genre, albumIds, genreIds } = req.body;

    const artist = await Artist.findByPk(id);
    if (!artist) return res.status(404).json({ error: 'Artista não encontrado.' });

    artist.name = name;
    artist.genre = genre;
    await artist.save();

    if (albumIds) {
      const albums = await Album.findAll({ where: { id: albumIds } });
      await artist.setAlbums(albums);
    }
    if (genreIds) {
      const genres = await Genre.findAll({ where: { id: genreIds } });
      await artist.setGenres(genres);
    }

    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findByPk(id);
    if (!artist) return res.status(404).json({ error: 'Artista não encontrado.' });

    await artist.destroy();
    res.status(200).json({ message: 'Artista deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
