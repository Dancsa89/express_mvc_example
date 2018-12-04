const express = require('express');
const clocks = express();
const models = require('../models');

// Index

clocks.get('/', (req, res) => {
  models.Clock.findAll().then(clocks => {
    res.locals.clocks = clocks;
    res.render('clocks/index.handlebars');
  });
});

// Show

clocks.get('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(clock => {
    if (clock === null) {
      res.status(400).send('Nincs ilyen óra!');
    } else {
      res.locals.clock = clock;
      res.render('clocks/show.handlebars');
    }
  });
});

// Edit

clocks.get('/:id/edit', (req, res) => {
  models.Clock.findById(req.params.id).then(clock => {
    if (clock === null) {
      res.status(400).send('Nincs ilyen óra!');
    } else {
      res.locals.clock = clock;
      res.render('clocks/edit.handlebars');
    }
  });
});

// Create

clocks.post('/', (req, res) => {
  models.Clock.findOne({ where: { model: req.body.model } }).then(preResult => {
    if (preResult) {
      return res.status(400).send('Már van ilyen óra!')
    } else {
      models.Clock.create({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        type: req.body.type
      }).then(clock => {
        res.locals.clock = clock;
        res.render('clocks/post.handlebars');
      });
    }
  });
});

// Update

clocks.put('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(preResult => {
    if (!preResult) {
      return res.status(400).send('Nincs ilyen óra!');
    }
    models.Clock.findOne({ where: { model: req.body.model } }).then(preResult2 => {
      if (preResult2) {
        return res.status(400).send('Már van ilyen modell!');
      } else {
        models.Clock.update({
          manufacturer: req.body.manufacturer,
          model: req.body.model,
          type: req.body.type
        }, {
          where: { id: req.params.id }
        }).then(clock => {
          res.redirect(`/clocks/${req.params.id}`);
        });
      }
    });
  });
});

// Delete

clocks.delete('/:id', (req, res) => {
  models.Clock.destroy({ where: { id: req.params.id } }).then(result => {
    if (!result) {
      return res.status(400).send('Nincs ilyen óra!')
    } else {
      res.redirect(`/clocks`);
    }
  });
});

module.exports = clocks;