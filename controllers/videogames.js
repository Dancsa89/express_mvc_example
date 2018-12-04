const express = require('express');
const videogames = express();
const models = require('../models');

// Index

videogames.get('/', (req, res) => {
  models.Videogame.findAll().then(videogames => {
    res.locals.videogames = videogames;
    res.render('videogames/index.handlebars');
  });
});

// Show

videogames.get('/:id/', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogame => {
    if (videogame === null) {
      res.status(400).send('Nincs ilyen Pokemon!');
    } else {
      res.locals.videogame = videogame;
      res.render('videogames/show.handlebars');
    }
  });
});

// Edit

videogames.get('/:id/edit', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogame => {
    if (videogame === null) {
      res.status(400).send('Nincs ilyen Pokemon!');
    } else {
      res.locals.videogame = videogame;
      res.render('videogames/edit.handlebars');
    }
  });
});

// Create

videogames.post('/', (req, res) => {
  models.Videogame.findOne({ where: { name: req.body.name } }).then(preResult => {
    if (preResult) {
      return res.status(400).send('Már van ilyen Játék!')
    } else {
      models.Videogame.create({
        distributor: req.body.distributor,
        name: req.body.name,
        type: req.body.type
      }).then(result => {
        res.json(result);
      });
    }
  });
});

// Update

videogames.put('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(preResult => {
    if (!preResult) {
      return res.status(400).send('Nincs ilyen Játék!');
    }
    models.Videogame.findOne({ where: { name: req.body.name } }).then(preResult2 => {
      if (preResult2) {
        return res.status(400).send('Már van ilyen nevű Játék!');
      } else {
        models.Videogame.update({
          distributor: req.body.distributor,
          name: req.body.name,
          type: req.body.type
        }, {
          where: { id: req.params.id }
        }).then(videogame => {
          res.redirect(`/videogames/${req.params.id}`);
        });
      }
    });
  });
});

// Delete

videogames.delete('/:id', (req, res) => {
  models.Videogame.destroy({ where: { id: req.params.id } }).then(result => {
    if (!result) {
      return res.status(400).send('Nincs ilyen Játék!');
    } else {
      res.redirect(`/videogames`);
    }
  });
});

module.exports = videogames;
