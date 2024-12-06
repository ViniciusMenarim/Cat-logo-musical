const { Album, Artist, Genre } = require('../models');

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: [Artist, Genre],
    });
    res.status(200).json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar álbuns' });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const { title, releaseYear, cover, tracks, artistIds, genreIds } = req.body;
    const album = await Album.create({ title, releaseYear, cover, tracks });

    if (artistIds) {
      const artists = await Artist.findAll({ where: { id: artistIds } });
      await album.addArtists(artists);
    }
    if (genreIds) {
      const genres = await Genre.findAll({ where: { id: genreIds } });
      await album.addGenres(genres);
    }

    res.status(201).json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar álbum' });
  }
};

exports.updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, releaseYear, cover, tracks, artistIds, genreIds } = req.body;

    const album = await Album.findByPk(id);
    if (!album) return res.status(404).json({ error: 'Álbum não encontrado.' });

    album.title = title;
    album.releaseYear = releaseYear;
    album.cover = cover;
    album.tracks = tracks;
    await album.save();

    if (artistIds) {
      const artists = await Artist.findAll({ where: { id: artistIds } });
      await album.setArtists(artists);
    }
    if (genreIds) {
      const genres = await Genre.findAll({ where: { id: genreIds } });
      await album.setGenres(genres);
    }

    res.status(200).json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar álbum' });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findByPk(id);
    if (!album) return res.status(404).json({ error: 'Álbum não encontrado.' });

    await album.destroy();
    res.status(200).json({ message: 'Álbum deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar álbum' });
  }
};
