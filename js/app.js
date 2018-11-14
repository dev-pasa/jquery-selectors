'use strict';

function Horn(hornObj) {
  this.image_url = hornObj.image_url;
  this.title = hornObj.title;
  this.description = hornObj.description;
  this.keyword = hornObj.keyword;
  this.horns = hornObj.horns;
}

Horn.allhorns=[];

Horn.prototype.render = function(){
$('main').append('<div class="clone"></div>');

let hornObjClone = $('div[class="clone"]');
let hornObjHtml = $('#photo-template').html();

hornObjClone.html(hornObjHtml);

hornObjClone.find('h2').text(this.title);
hornObjClone.find('img').attr('src', this.image_url).attr('alt', this.description).attr('title', this.keyword);
hornObjClone.find('p').text(this.description);

hornObjClone.removeClass('clone');
hornObjClone.attr('class', this.title);
}

Horn.readJson = () =>{
  $.get('data/page-1.json', 'json')
  .then(data => {
    data.forEach(obj => {
      Horn.allhorns.push(new Horn(obj));
    });
  })
  .then(Horn.loadHorns)
}

Horn.loadHorns = () => {
  Horn.allhorns.forEach(hornObj => hornObj.render())
}

$(() => Horn.readJson());