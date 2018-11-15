'use strict';

function Horn(hornObj) {
  this.image_url = hornObj.image_url;
  this.title = hornObj.title;
  this.description = hornObj.description;
  this.keyword = hornObj.keyword;
  this.horns = hornObj.horns;
}


$('nav a').on('click', function(){
let $selectedGallery = $(this).data('tab');
// console.log('Curent gallery: ', $selectedGallery);
$('.tab-content').hide();
Horn.allhorns = []
$('main section').html("");

if ($selectedGallery === 'gallery-1') {
  $(() => Horn.readJson1());

  $('#' + $selectedGallery).fadeIn(300)
}

if ($selectedGallery === 'gallery-2') {
  console.log("Is clicked:")
  $(() => Horn.readJson2());
  Horn.allhorns.forEach(hornObj =>{
    $('#gallery-2').append(hornObj.toHtml());
  })
  $('#' + $selectedGallery).fadeIn(300)
}
})

Horn.allhorns=[];

Horn.prototype.toHtml = function(){
  const source = $('#photo-Template').html();
  const template = Handlebars.compile(source);
  return template(this);
}

Horn.readJson1 = () =>{
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horn.allhorns.push(new Horn(obj));
      });
      Horn.allhorns.forEach(hornObj =>{
        $('#gallery-1').append(hornObj.toHtml());
      })
      })
    .then(selectKeyWord)
}


Horn.readJson2 = () =>{
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horn.allhorns.push(new Horn(obj));
      });
      console.log(Horn.allhorns);
      
      Horn.allhorns.forEach(hornObj =>{
        $('#gallery-2').append(hornObj.toHtml());
      })
      })
    // .then(Horn.loadHorns)
    .then(selectKeyWord)
}


const selectKeyWord = function() {
  let uniqueArr =[];

  Horn.allhorns.forEach((obj) => {
    if(!uniqueArr.includes(obj.keyword)){
      uniqueArr.push(obj.keyword)}
  })

  uniqueArr.forEach((obj)=> {
    $('select').append($('<option>',{value: obj, text: obj}));
  })
}

$('select').on('change',function(){
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class = "${$selection}"]`).show()
})

$(document).ready(function(){
  $('.tab-content').hide();
})

// $(() => Horn.readJson());
