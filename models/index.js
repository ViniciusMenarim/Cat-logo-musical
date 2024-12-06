const sequelize = require('../config/database');
const Album = require('./album');
const Artist = require('./artist');
const Genre = require('./genre');

Album.belongsToMany(Artist, { through: 'ArtistAlbums', timestamps: false });
Artist.belongsToMany(Album, { through: 'ArtistAlbums', timestamps: false });

Album.belongsToMany(Genre, { through: 'AlbumGenres', timestamps: false });
Genre.belongsToMany(Album, { through: 'AlbumGenres', timestamps: false });

Artist.belongsToMany(Genre, { through: 'ArtistGenres', timestamps: false });
Genre.belongsToMany(Artist, { through: 'ArtistGenres', timestamps: false });

module.exports = { sequelize, Album, Artist, Genre };
