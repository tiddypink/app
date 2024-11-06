const ext = 'webp'
var image;
var correct;
var score = 0;
var opcion;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active'); // Alterna la clase 'active' en el menú
  });
  const currentLanguage = (navigator.language || navigator.userLanguage).split("-")[0];
  setLanguage(currentLanguage);

  $('#next').hide();
  $('.ia-tag').hide();
  let defaultImage = images.find(item => item.name == 82)
  images = setArray(images, 100)
  $('#image').attr('src', `assets/${defaultImage.name}.${ext}`); 
  defaultImage.viewed = true

console.log(images)


  $('.go').click(function() {
    opcion = $(this).attr('id');
    image = (($('#image').attr('src')).split('/')[1]).split('.')[0]
    if (!image) {
      return
    }
    image = images.find(item => item.name == image)
      if (opcion == image?.correct) {
      score++;
      $('.score').text('Score: ' + score);
      $('.score').css('color', '#88ff4c'); 
      setTimeout(function() {
        $('.score').css('color', '#ddd'); 
      }, 250); 

      $('#image').addClass('fade-out')
      setTimeout(() => {
        $('#image').attr('src', `assets/n${image.name}.${ext}`); 
        $('#image').removeClass('fade-out');
      }, 300);

      if (images.ia_generated) {
          $('.ia-tag').fadeIn();
      }

      $('#next').fadeIn();
      $(this).css('border', '12px solid #88ff4c');
      $('#image').addClass('correct');
      //$('.actions-container').hide()
    } else {
      if ($('#next').is(':hidden')) {
        //$('.go').css('border', '1px solid #ff206e');
          //score--;
          $('.go').css('pointer-events', 'none');
          $('.score').text('Score: ' + score);
          $('.score').css('color', '#ff3636'); 
          setTimeout(function() {
            $('.score').css('color', '#ddd');
            $('.go').css('pointer-events', 'auto');
          }, 2000); 

        $(this).css('border', '12px solid #ff3636');
       // $('#image').attr('src', `assets/n${image}.${ext}`)
        setTimeout(function() {
           $('.go').css('border', '1px solid #ff206e');
           $('.actions-container').fadeOut()
           next();
        }, 1250); 
        
        //$(this).css('border', '8px solid #ff3636');
      }
    }

    $('.correct').on('mousedown mouseleave', function() {
      $(this).css('filter', 'brightness(1)'); 
    }).on('mouseup mouseenter', function() {
      if (opcion == correct) {
        $(this).css('filter', 'brightness(0.8)');
      }
    });
  
    $('.correct').on('mousedown', function() {
      $('#image').attr('src', `assets/${image}.${ext}`);
    }).on('mouseup mouseleave', function() {
      if (opcion === correct) {
        $('#image').attr('src', `assets/n${image}.${ext}`); 
      }
    });

  });

  $('#next').click(function() {
    next()
  });

});

function next(){
  $('#next').fadeOut();
  correct = null;
  opcion = -1;
  $('.go').css('border', '1px solid #ff206e');
  $('.actions-container').fadeIn()
  $('#image').removeClass('correct');
  $('.gallery-item').css('border', '1px solid #ff206e');
  $('.go').removeClass('s')
  $('.ia-tag').hide();
  //let unseen = images.filter(obj => obj.viewed === false && obj.active === true);

  let unseen =  images.filter(obj => obj.level == 0 && obj.viewed === false);

  if (unseen.length == 0) {
    unseen = images.filter(obj => obj.level == 1 && obj.viewed === false);
  }

  if (unseen.length == 0) {
    unseen = images.filter(obj => obj.level == 2 && obj.viewed === false);
  }

  if (unseen.length > 0) {
    let randomIndex = Math.floor(Math.random() * unseen.length);
    let nextImage = unseen[randomIndex].name;
    image = images.find(item => item.name == nextImage)
    image.viewed = true;
    $(".go").each(function() {
      if ($(this).attr("id") !== image.correct) {
        $(this).addClass('s');
      }
    });

    $('#image').addClass('fade-out')
    setTimeout(() => {
      $('#image').attr('src', `assets/${image.name}.${ext}`); 
      $('#image').removeClass('fade-out');
    }, 300);

    //console.log(image)
    if (image.ia_generated) {
      $('.ia-tag').fadeIn();
    }

  } else {
      alert('All images seen');
  }
}

function setLanguage(currentLanguage) {
  Object.entries(languages[currentLanguage]).forEach(([key, value]) => {

    const element = $(`#${key}`);
    if (element) {
      element.text(value);
    }
  });

  $("#language").val(currentLanguage);
  $("#language").change(function() {
    const language = $(this).val();
    setLanguage(language);
  });
}
function getElementToWrite(text) {
  const elements = document.body.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].textContent.trim() === text) {
      return elements[i];
    }
  }
  return null;
}

function setArray(images, limit) {
  const result = [];
  const selecteds = new Set();
  while (result.length < limit) {
      const randomIndex = Math.floor(Math.random() * images.length);
      if (!selecteds.has(randomIndex)) {
        selecteds.add(randomIndex);
        result.push(images[randomIndex]);
      }
  }
  return result;
}




const languages = {
  es: {
    title: "{{title}}",
    description: "{{description}}",
    action: "{{action}}",
    galery: "{{galery}}",
    next: "Siguiente",
    showprev: "Mostrar imagen anterior"
  },
  en: {
    title: "Guess it",
    description: "You should guess the most levels you can",
    action: "Start",
    galery: "Gallery"
  }
};

var images = [
  {
    name: '0',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '1',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '2',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '3',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '4',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '5',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '6',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '7',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '8',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  ///
  {
    name: '9',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '10',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '11',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '12',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '13',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '14',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '15',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '16',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '17',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '18',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '19',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '20',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '21',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '22',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '23',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '24',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '25',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '26',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '27',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '28',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '29',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '30',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '31',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '32',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '33',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '34',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '35',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '36',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '37',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '38',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '39',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '40',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '41',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '42',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '43',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '44',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '45',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '46',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '47',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '48',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '49',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '50',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '51',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '52',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '53',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '54',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  //---//
  {
    name: '55',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '56',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '57',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '58',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '59',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '60',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '61',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '62',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '63',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '64',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '65',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '66',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '67',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '68',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '69',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '70',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '71',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  //-----*
  {
    name: '72',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '73',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '74',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '75',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '76',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '77',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '78',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  //---//
  {
    name: '79',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '80',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '81',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '82',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '83',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '84',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '85',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '86',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '87',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '88',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '89',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '90',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '91',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '92',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '93',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '94',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '95',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '96',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '97',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '98',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '99',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '100',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '101',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '102',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '103',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '104',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '105',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '106',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '107',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '108',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '109',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '110',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '111',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '112',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '113',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '114',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '115',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '116',
    correct: "1",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '117',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '118',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '119',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '120',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  
];

//replace n74