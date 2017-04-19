var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {

  var options = {
    url:'https://omelete.uol.com.br/filmes/noticia/',
    method: 'GET'
  };
  request(options, function (err,response,body){
    if(err || response.statusCode !=200){
      return;
    }

    var $ = cheerio.load(body);

    // Array
    var arr = [];

    var containerPrincipal = $('.js-items-busca > .secao-filmes');

    $(containerPrincipal).each(function(key, el){
      var item = el;

      var foto = $(item).find('img.secao-filmes');
      var titulo = $(item).find('span.title');
      var descricao = $(item).find('span.subtitle');
      var link = $(item).find('.call a');

      return arr.push({
        header : $(foto).attr('src'),
        content:{
          titulo: $(titulo).text().replace(/^\s+|\s+$/g,""),
          descricao: $(descricao).text().replace(/^\s+|\s+$/g,""),
          link: $(link).attr('href'),
        }
      });
    });

    res.status(200).json(arr);

    // res.render('index', {
    //   title: 'Express',
    //   body: body
    // });

  });
});

module.exports = router;
