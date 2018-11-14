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
hornObjClone.addClass(this.keyword);
}

Horn.readJson = () =>{
  $.get('data/page-1.json', 'json')
  .then(data => {
    data.forEach(obj => {
      Horn.allhorns.push(new Horn(obj));
    });
  })
  .then(Horn.loadHorns)
  .then(selectKeyWord)
}


Horn.loadHorns = () => {
  Horn.allhorns.forEach(hornObj => hornObj.render())
}


const selectKeyWord = function() {
  let uniqueArr =[];

 Horn.allhorns.forEach((obj) => {
   if(!uniqueArr.includes(obj.keyword)){
     uniqueArr.push(obj.keyword)}
   })
uniqueArr.forEach((obj)=> {
$('select').append($('<option>',{value: obj, text: obj}));
})}


$('select').on('change',function(){
let $selection = $(this).val();
$('div').hide()

$(`div[class = "${$selection}"]`).show()
})

$(() => Horn.readJson());
