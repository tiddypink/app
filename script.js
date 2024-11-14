const ext = 'webp'
var image;
var correct;
var score = 0;
var opcion;
var currentLanguage
var totalItems = 32
var images;
var exitIndex = 0
var music;
var musicOn = true;
const isLocal = window.location.protocol === "file:";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active'); // Alterna la clase 'active' en el menú
  });
  currentLanguage = (navigator.language || navigator.userLanguage).split("-")[0];
  setLanguage(currentLanguage);

  $('#next').hide();
  $('.ia-tag').hide();
  $(".suceess-image").hide()
  $(".final-actions").hide()


  let defaultImage = imagesFull.find(item => item.name == 82)
  totalItems--
  images = setArray(imagesFull, totalItems)

  isLocal ? $('#image').attr('src', `assets/${defaultImage.name}.${ext}`) : shelterImage(`assets/${defaultImage.name}.${ext}`)
  
  image = defaultImage

  defaultImage.viewed = true
  images.push(defaultImage)
  totalItems++

  $('.go').click(function () {
    opcion = $(this).attr('id');
    if (!image.name) {
      return
    }
    if (Math.random() < 0.005) {
      sound(`assets/audio/mistry.mp3`, 2, .3);
    }
    if (Math.random() < 0.005) {
      sound(`assets/audio/mistry2.mp3`, 3, .3);
    }

    image = images.find(item => item.name == image.name)
    if (opcion == image?.correct) {
      // if (true) {
      if ($('#next').is(':visible')) {
        return
      }
      $(this).css("animation", "");
      sound(`assets/audio/correct${getCorrectSoundRandom()}.mp3`);
      score += 100 / images.length;
      $('.score').text('Score: ' + Math.floor(score));
      $('.score').css('color', '#88ff4c');
      setTimeout(function () {
        $('.score').css('color', '#ddd');
      }, 250);

      $('#image').addClass('fade-out')
      setTimeout(() => {
        setTimeout(() => {
          $('#image').removeClass('fade-out');
        }, 250);
        isLocal ? $('#image').attr('src', `assets/n${defaultImage.name}.${ext}`) : shelterImage(`assets/n${defaultImage.name}.${ext}`)
  
        shelterImage()
      }, 250);

      if (images.ia_generated) {
        $('.ia-tag').fadeIn();
      }

      $('#next').fadeIn();
      $(this).css('border', '12px solid #88ff4c');
      $('#image').addClass('correct');
      //$('.actions-container').hide()
    } else {
      //animation
      const $elemento = $(this);
      $elemento.css("animation", "shake 0.2s");
      setTimeout(function () {
        $elemento.css("animation", "");
        //return
      }, 200);
      if ($('#next').is(':hidden')) {
        sound(`assets/audio/fail${getFailSoundRandom()}.mp3`);
        //$('.go').css('border', '1px solid #ff206e');
        //score--;
        $('.go').css('pointer-events', 'none');
        $('.score').text('Score: ' + Math.floor(score));
        $('.score').css('color', '#ff3636');
        setTimeout(function () {
          $('.score').css('color', '#ddd');
          $('.go').css('pointer-events', 'auto');
        }, 2000);

        $(this).css('border', '12px solid #ff3636');
        // $('#image').attr('src', `assets/n${image}.${ext}`)
        setTimeout(function () {
          $('.go').css('border', '1px solid #ff206e');
          $('.actions-container').fadeOut()
          next();
        }, 2200);

        //$(this).css('border', '8px solid #ff3636');
      }
    }

    $('.correct').on('mousedown mouseleave touchstart touchcancel', function () {
      $(this).css('filter', 'brightness(1)');
    }).on('mouseup mouseenter touchend touchstart', function () {
      if (opcion == image?.correct) {
        $(this).css('filter', 'brightness(0.8)');
      }
    });

    $('.correct').on('mousedown touchstart', function () {
      isLocal ? $('#image').attr('src', `assets/${defaultImage.name}.${ext}`) : shelterImage(`assets/${defaultImage.name}.${ext}`)
  
      shelterImage()
    }).on('mouseup mouseleave touchend touchcancel', function () {
      if (opcion === image?.correct) {
        isLocal ? $('#image').attr('src', `assets/n${defaultImage.name}.${ext}`) : shelterImage(`assets/n${defaultImage.name}.${ext}`)
        shelterImage()
      }
    });

  });

  $('#next').click(function () {
    next()
  });

  $('.restart').click(function () {
    score = 0
    exitIndex = 0
    stopMusic()
    sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    $('.score').text('Score: ' + Math.floor(score));
    imagesFull.forEach(obj => obj.viewed = false);
    totalItems--
    let defaultImage = imagesFull.find(item => item.name == 82)
    images = setArray(imagesFull, totalItems)
    defaultImage.viewed = true
    image = defaultImage
    images.push(defaultImage)
    totalItems++
    isLocal ? $('#image').attr('src', `assets/${defaultImage.name}.${ext}`) : shelterImage(`assets/${defaultImage.name}.${ext}`)
    shelterImage()
    $(".final-actions").hide()
    $("#end").hide()
    $(".gallery-grid").fadeIn()
    $('.actions-container').fadeIn()
  });
  $('.exit').click(function () {
    console.log(exitIndex)
    console.log(languages[currentLanguage].exitMessage)
    if (exitIndex == 2) {
      rumbleArray(languages[currentLanguage].exitMessage)
    }
    if (exitIndex == 10) {
      sound(`assets/audio/giveup.mp3`);
    }
    if (exitIndex == languages[currentLanguage].exitMessage.length) {
      exitIndex = 2
    }

    //alert(languages[currentLanguage].exitMessage[exitIndex])
    exitIndex++
  });

  function rumbleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  $(".switch input").change(function () {
    if ($(this).is(":checked")) {
      musicOn = false
      sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    } else {
      musicOn = true
      sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    }
  });

  const modal = $("#modal");
  const openModal = $("#openModal");
  const closeModal = $(".close");
  const closeAcept = $(".acept");
  modal.show();
  openModal.click(function () {
    modal.show();
  });

  closeModal.click(function () {
    modal.hide();
    sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
  });
  closeAcept.click(function () {
    modal.hide();
    sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    $(".gallery-item").click();
    $("#image").click();
    //sound(`assets/audio/music5.mp3`, 1000, 1,true);
  });

  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
      sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    }
  });
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

});

// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });

function next() {
  sound('assets/audio/next.mp3');
  $('#next').fadeOut();
  correct = null;
  opcion = -1;
  $('.go').css('border', '1px solid #ff206e');
  $('.actions-container').fadeIn()
  $('#image').removeClass('correct');
  $('.gallery-item').css('border', '1px solid #ff206e');
  $('.images').fadeIn()
  $('.go').removeClass('s')
  $('.ia-tag').hide();

  //let unseen = images.filter(obj => obj.viewed === false && obj.active === true);

  let unseen = images.filter(obj => obj.level == 0 && obj.viewed === false);

  if (unseen.length == 0) {
    unseen = images.filter(obj => obj.level == 1 && obj.viewed === false);
  }

  if (unseen.length == 0) {
    unseen = images.filter(obj => obj.level == 2 && obj.viewed === false);
  }

  if (unseen.length > 0) {
    // alert(unseen.length)
    let randomIndex = Math.floor(Math.random() * unseen.length);
    let nextImage = unseen[randomIndex].name;
    image = images.find(item => item.name == nextImage)
    image.viewed = true;

    $('#image').addClass('fade-out')
    setTimeout(() => {
      setTimeout(() => {
        $('#image').removeClass('fade-out');
      }, 250);
      isLocal ? $('#image').attr('src', `assets/${defaultImage.name}.${ext}`) : shelterImage(`assets/${defaultImage.name}.${ext}`)
      shelterImage()
    }, 250);

    //console.log(image)
    if (image.ia_generated) {
      $('.ia-tag').fadeIn();
    }

  } else {
    stopMusic()
    $(".gallery-grid").hide()
    if (score == 100) {
      let seconds = 20;
      $("#end").show()
      $('#end').contents().filter(function () {
        return this.nodeType === 3;
      }).first().replaceWith(`${languages[currentLanguage].successMessage}`);
      $('#count').text(seconds)
      $('.suceess-image').show()
      $('.suceess-image').addClass('fade-out')
      const intervalo = setInterval(() => {
        //document.getElementById("contador").textContent = contador;
        seconds--;
        $('#count').text(seconds)
        if (seconds <= 6) {
          $('#count').text(0)
          clearInterval(intervalo);
          sound('assets/audio/scream1.mp3');
          $('.suceess-image').removeClass('fade-out');
          $('.suceess-image').attr('src', `assets/end.${ext}`);
        } else {
          sound(`assets/audio/heart-beat.mp3`);
        }

      }, 1000);

    } else {
      $("#end").show()
      $(".final-actions").fadeIn()
      $(".actions-container").hide()
      sound(`assets/audio/endfail${getEndfailSoundRandom()}.mp3`);
      // $('#end').prepend(`${languages[currentLanguage].endMessage}`)
      $('#end').contents().filter(function () {
        return this.nodeType === 3;
      }).first().replaceWith(`${languages[currentLanguage].endMessage}`);
      $('#count').text(` ${Math.floor(score)}`)
    }
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
  $("#language").change(function () {
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

function sound(path, loops = 1, volume = 1, isMusic = false) {
  if (musicOn == false) {
    stopMusic();
    return
  }
  let index = 0;
  if (isMusic) {
    music = new Audio(path);
    music.volume = volume;
    music.play();
    music.addEventListener('ended', function () {
      index++;

      if (index < loops) {
        music.play();
      }
    });
    return
  }

  const sound = new Audio(path);
  sound.volume = volume;
  sound.play();

  sound.addEventListener('ended', function () {
    index++;

    if (index < loops) {
      sound.play();
    }
  });
}
function stopMusic() {
  music.pause();
  music.currentTime = 0;
}

function shelterImage(imagePath) {
  fetch(imagePath)  // Usa la ruta o URL de la imagen
  .then(response => response.blob())  // Convierte la respuesta a un Blob
  .then(blob => {
      var reader = new FileReader();
      reader.onloadend = function () {
          var base64Image = reader.result;  // La imagen convertida a Base64
          console.log(base64Image);  // Puedes usarla o mostrarla
          $('#image').attr('src', base64Image);
      };
      reader.readAsDataURL(blob);  // Lee el Blob como URL de datos (Base64)
  })
  .catch(error => console.log('Error al obtener la imagen:', error));
  // const img = document.getElementById('image');
  // img.addEventListener('load', function () {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   canvas.width = img.naturalWidth;
  //   canvas.height = img.naturalHeight;
  //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //   const base64Image = canvas.toDataURL('image/webp');
  //   $('#image').attr('src', base64Image);
  // }, { once: true });
}

function getCorrectSoundRandom() {
  const numbers = [
    { value: 1, weight: 0.35 },
    { value: 2, weight: 0.03 },
    { value: 3, weight: 0.18 },
    { value: 4, weight: 0.01 },
    { value: 5, weight: 0.25 },
    { value: 6, weight: 0.02 },
    { value: 7, weight: 0.03 },
    { value: 8, weight: 0.02 },
    { value: 9, weight: 0.02 },
    { value: 10, weight: 0.05 },
    { value: 11, weight: 0.01 },
    { value: 12, weight: 0.02 },
    { value: 13, weight: 0.02 },
  ];
  let random = Math.random();
  for (let i = 0; i < numbers.length; i++) {
    random -= numbers[i].weight;
    if (random <= 0) {
      return numbers[i].value;
    }
  }
}

function getEndfailSoundRandom() {
  const numbers = [
    { value: 1, weight: 0.30 },
    { value: 2, weight: 0.20 },
    { value: 3, weight: 0.20 },
    { value: 4, weight: 0.15 },
    { value: 5, weight: 0.15 }
  ];
  let random = Math.random();
  for (let i = 0; i < numbers.length; i++) {
    random -= numbers[i].weight;
    if (random <= 0) {
      return numbers[i].value;
    }
  }
}

function getMusicSoundRandom() {
  const numbers = [
    { value: 1, weight: 0.01 },
    { value: 2, weight: 0.42 },
    { value: 3, weight: 0.40 },
    { value: 4, weight: 0.04 },
    { value: 5, weight: 0.10 },
    { value: 6, weight: 0.02 }
  ];
  let random = Math.random();
  for (let i = 0; i < numbers.length; i++) {
    random -= numbers[i].weight;
    if (random <= 0) {
      return numbers[i].value;
    }
  }
}

function getFailSoundRandom() {
  const numbers = [
    { value: 1, weight: 0.74 },
    { value: 2, weight: 0.18 },
    { value: 3, weight: 0.8 }
  ];
  let random = Math.random();
  for (let i = 0; i < numbers.length; i++) {
    random -= numbers[i].weight;
    if (random <= 0) {
      return numbers[i].value;
    }
  }
}


const languages = {
  es: {
    title: "{{title}}",
    description: "{{description}}",
    action: "{{action}}",
    galery: "{{galery}}",
    next: "Siguiente",
    showprev: "Mostrar imagen anterior",
    endMessage: "Haz fallado estrepitosamente tu puntuación ha sido de:",
    successMessage: "Increible, has acertado todas las imágenes 😳 tengo un premio para ti 🥵 aparecerá en: ",
    exitMessage: [
      "Este boton no hace nada :v",
      "Te dije que este voton no hace nada.",
      "Por favor escúchame. Este boton no hace nada",
      "(El boton sigue sin hacer nada *)",
      "Este botón sigue sin hacer nada, como tu ex.",
      "Pulsa con cuidado, este botón tiene baja autoestima.",
      "Este boton esta como los sentiminetos de ella, vacio..",
      "Por cada vez que pulses este boton muere un gatito en el mundo",
      "Este boton tiene sentimientos y estan apunto de romperse",
      "Este botón está aquí solo para decorar.",
      "Si pulsas de nuevo el boton eres g4y",
      "Lo suponia..",
      "La inteligencia te persigue, pero vas mas rapido",
      "La perdí cuando mas la amaba",
      "Messirve..",
      "Recuerda que tiene cosas importantes que hacer uwu",
      "Siiuuuuuuuu",
      "Cada clic en este botón es un recordatorio de que nada es para siempre.",
      "Gracias por tu valioso tiempo, pero sigue sin pasar nada.",
      "Por favor, busca la felicidad en otro lugar.",
      "Pulsa de nuevo para perder un segundo más de tu vida.",
      "Lo que no rompe a este boton lo hace mas fuerte",
      "Este botón promete no hacer nada, y cumple.",
      "Este botón es tan útil como un paraguas en el desierto.",
      "Este boton tiene metas, pero dice que empieza mañana",
      "A veces hay que aceptar que no todo es como uno quiere",
      "Este boton no esta roto, simplemente no hace nada",
      "Veo que te gusta sentirte ignorado digitalmente.",
      "Este botón se siente halagado... pero sigue sin hacer nada.",
      "En el mundo siguen pasando cosas mientras sigues empeñado en esto..",
      "Nada cambia.. todo permanece igual..",
      "Este botón no hace nada, pero tú sigues teniendo la fe.",
      "Cada click es una pequeña victoria",
      "Se produjeron 0 resultados",
      "Hay personas que son lentas de entender",
      "Este botón no hace nada, pero eso, tú ya lo sabías.",
      "Este boton por la mañana no hace nada y por la tarde descansa",
      "Este boton esta mas vacio que tu cuenta bancaria",
      "Este boton esta mas ausente que el amor de ella",
      "Este botón está más perdido que tu teléfono cuando lo dejas en silencio.",
      "Este botón está más roto que tus promesas de año nuevo.",
      "Este boton está mas estancado que tu progreso con ella",
      "Este boton esta mas vacio que tu inbox",
      "Este boton necesita su espacio..",
      "Este boton esta mas tenso que tu cuando alguien coje tu telefono",
      "Este boton se esta poniendo incomodo",
      "Este boton esta mas vacio que tu chat con la que te gusta",
      "Ni lo intentes",
      "Mejor suerte la proxima vez",
      "No te preocupes, lo harás bien",
      "No te asustes solo déjate llevar",
      "Bien hecho, ¿te atreves a hacerlo de nuevo?",
      "Prometo que este boton nunca hará nada",
      "No te preocupes, este botón también está vacío por dentro.",
      "Hay apollo lo que falta es talento",
      "Este boton es como la que te gusta, no responde",
      "Mírate... no estás consiente y sigues empeñado en mostrar al mundo lo que puedes hacer... li ya lo has demostrado",
      "Incluso el más fuerte de los oponentes siempre tiene una debilidad.",
      "A nadie le importaba quién fuera hasta que me puse una máscara. ",
      "Todos los esfuerzos son inútiles si no crees en ti mismo"
    ],
  },
  en: {
    title: "Guess it",
    description: "You should guess the most levels you can",
    action: "Start",
    galery: "Gallery",
    endMessage: "Mostrar imagen anterior"
  }
};

var imagesFull = [
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
  // {
  //   name: '10',
  //   correct: "2",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
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
  /////////////////////////////////////////
  {
    name: '121',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '122',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '123',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '124',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '125',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '126',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '127',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '128',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '129',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '130',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '131',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '132',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '133',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '134',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '135',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '136',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '137',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '138',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '139',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '140',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '141',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '142',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '143',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '144',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '145',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '146',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '147',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '148',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '149',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '150',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '151',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '152',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '153',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '154',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '155',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '156',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '157',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '158',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '159',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '160',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '161',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '162',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '163',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '164',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  /******************************************* x*/




  {
    name: '165',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '166',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '167',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '168',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '169',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '170',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '171',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '172',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '173',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  ///
  {
    name: '174',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '175',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '176',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '177',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '178',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '179',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '180',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '181',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '182',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '183',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '184',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '185',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '186',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '187',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  // {
  //   name: '188',
  //   correct: "5",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  {
    name: '189',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '190',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '191',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '192',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '193',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '194',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '195',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '196',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '197',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '198',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '199',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '200',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '201',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '202',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  // {
  //   name: '203',
  //   correct: "1",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  {
    name: '204',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '205',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '206',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '207',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '208',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '209',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  // {
  //   name: '210',
  //   correct: "3",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  {
    name: '211',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '212',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '213',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '214',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '215',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '216',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  // {
  //   name: '217',
  //   correct: "6",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  {
    name: '218',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '219',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  //---//
  {
    name: '220',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '221',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '222',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '223',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '224',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '225',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '226',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '227',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '228',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '229',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '230',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '231',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '232',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '233',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '234',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '235',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '236',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  //-----*
  {
    name: '237',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '238',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '239',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '240',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '241',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '242',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '243',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  //---//
  {
    name: '244',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '245',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '246',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '247',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '248',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '249',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '250',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '251',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '252',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '253',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '254',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '255',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '256',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '257',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '258',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '259',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '260',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '261',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '262',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '263',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '264',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '265',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '266',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '267',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '268',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '269',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '270',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '271',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '272',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '273',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '274',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '275',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '276',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '277',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '278',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '279',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '280',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '281',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '282',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '283',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '284',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '285',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  /////////////////////////////////////////
  {
    name: '286',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '287',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '288',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '289',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '290',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '291',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '292',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '293',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '294',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '295',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '296',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '297',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '298',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '299',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '300',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '301',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '302',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '303',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '304',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '305',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '306',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '307',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '308',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '309',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '310',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '311',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '312',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '313',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '314',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '315',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '151',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '316',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '317',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '318',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '319',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '320',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '321',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '322',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '323',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '324',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '325',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '326',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '327',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '328',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '329',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '330',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '331',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '332',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '333',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '334',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '335',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '336',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '337',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '338',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '339',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '340',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '341',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '342',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '343',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '344',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '345',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '346',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '347',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '348',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '349',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '350',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '351',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '352',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '353',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '354',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '355',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '356',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '357',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '358',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '359',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '360',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '361',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '362',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '363',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '364',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '365',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '366',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '367',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '368',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '369',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '370',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '371',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '372',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '373',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '374',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '375',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '376',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '377',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '378',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true/////
  },
  {
    name: '379',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '380',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '381',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '382',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '383',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '384',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '385',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '386',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '387',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '388',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '389',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '390',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '391',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '392',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '393',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '394',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '395',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '396',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '397',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '398',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '399',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '400',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '401',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '402',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '403',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '404',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '405',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '406',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '407',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '408',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '409',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '410',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '411',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '412',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '413',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '414',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '415',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '416',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '417',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '418',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  // {
  //   name: '419',
  //   correct: "2",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  {
    name: '420',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '421',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '422',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '423',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '424',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '425',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '426',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '427',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '428',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '429',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '430',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '431',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '432',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '433',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '434',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '435',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '436',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '437',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '438',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '439',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '440',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '441',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '442',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '443',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '444',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '445',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '446',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '447',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '448',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '449',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '450',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '451',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '452',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '453',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '454',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '455',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '456',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '457',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '458',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '459',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '460',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '461',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '462',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '463',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '464',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '465',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '466',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '467',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '468',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '469',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '470',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  // {
  //   name: '471',
  //   correct: "3",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  {
    name: '472',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '473',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '474',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '475',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '476',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '477',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '478',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '479',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '480',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  // {
  //   name: '481',
  //   correct: "4",
  //   viewed: true,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  {
    name: '482',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '483',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '484',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '485',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '486',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '487',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '488',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '489',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '490',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '491',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '492',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '493',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '494',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '495',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '496',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '497',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '498',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '499',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '500',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '501',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '502',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '503',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '504',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '505',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '506',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '507',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '508',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '509',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '510',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '511',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '512',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '513',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '514',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '515',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '516',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '517',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '518',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '519',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '520',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '521',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '522',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '523',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '524',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '525',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '526',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '527',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '528',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '529',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '530',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '531',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '532',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '533',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '534',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '535',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '536',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '537',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '538',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
];

/*References
273
*/