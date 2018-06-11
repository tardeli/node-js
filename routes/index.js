var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Clientes', docs: docs });
  })
});



router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var cpf = req.body.cpf;
  global.db.insert({nome, cpf}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","cp":""}, action: '/new' });
});

router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var cpf = req.body.cpf;
  global.db.update(id, {nome, cpf}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});


router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;
