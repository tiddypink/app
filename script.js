const ext = 'webp'
var image;
var stepIndex = 1;
var correct;
var score = 0;
var opcion;
var currentLanguage
var totalItems = 30
var images;
var exitIndex = 0
var music;
var musicOn = true;
var sounds = []
const isLocal = window.location.protocol === "file:";
var analitics = {
  matches: 0,
  wmatches: 0,
  corrects: 0,
  mistakes: 0,
  seenimages: [],
  seennimages: [],
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
  });
  currentLanguage = (navigator.language || navigator.userLanguage).split("-")[0];
  setLanguage(currentLanguage);

  $('#language-select').on('change', function () {
    const language = $(this).val();
    currentLanguage = language
    setLanguage(language);
    $('.score').text(getScoreLabel());
  });

  $('#steps').text(`${stepIndex} / ${totalItems}`)

  //localStorage.removeItem('td-zx5sk-stats');
  if (localStorage.getItem("td-zx5sk-stats") !== null) {
    analitics = getAnalitics()
    setAnaliticsLabels()
  }

  $('#next').hide();
  $('.ia-tag').hide();
  $(".suceess-image").hide()
  $(".final-actions").hide()
  $("#end").hide()
  $("#score").hide()
  $('#loading-circle').hide();
  $('#status').hide()


  let defaultImage = imagesFull.find(item => item.name == 82)
  totalItems--
  images = setArray(imagesFull, totalItems)

  isLocal ? $('#image').attr('src', `assets/${defaultImage.name}.${ext}`) : shelterImage(`assets/${defaultImage.name}.${ext}`)
  setAnalitics(defaultImage.name, false, false, false)

  image = defaultImage

  defaultImage.viewed = true
  images.push(defaultImage)
  totalItems++

  $('.go').click(function () {
    opcion = $(this).attr('id');
    if (!image.name) {
      return
    }
    if (Math.random() < 0.001) {
      sound(`assets/audio/mistry.mp3`, 2, .3);
    }
    if (Math.random() < 0.005) {
      sound(`assets/audio/mistry2.mp3`, 3, .3);
    }

    image = images.find(item => item.name == image.name)
    if (opcion == image?.correct) {
      //   if (true) {
      if ($('#next').is(':visible')) {
        return
      }
      $(this).css("animation", "");
      sound(`assets/audio/correct${getCorrectSoundRandom()}.mp3`);
      score += 100 / images.length;
      $('.score').show()
      $('.score').text(getScoreLabel());
      $('.score').css('color', '#88ff4c');
      setTimeout(function () {
        $('.score').css('color', '#ddd');
      }, 250);

      $('.gallery-item').addClass('fade-out')
      setTimeout(() => {
        setTimeout(() => {
          $('.gallery-item').removeClass('fade-out');
        }, 250);
        isLocal ? $('#image').attr('src', `assets/n${image.name}.${ext}`) : shelterImage(`assets/n${image.name}.${ext}`)
        setAnalitics(image.name, true, false, true)
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
      setAnalitics(image.name, assert = false, true, false)
      const $elemento = $(this);
      $elemento.css("animation", "shake 0.2s");
      setTimeout(function () {
        $elemento.css("animation", "");
        //return
      }, 200);
      if ($('#next').is(':hidden')) {
        sound(`assets/audio/fail${getFailSoundRandom()}.mp3`);
        $('.go').css('pointer-events', 'none');
        $('.score').text(getScoreLabel());
        $('.score').css('color', '#ff3636');
        setTimeout(function () {
          $('.score').css('color', '#ddd');
          $('.go').css('pointer-events', 'auto');
        }, 2000);

        $(this).css('border', '12px solid #ff3636');
        setTimeout(function () {
          $('.go').css('border', '1px solid #ff206e');
          $('.actions-container').fadeOut()
          next();
        }, 2200);
      }
    }

  });

  $('#next').click(function () {
    next()
  });

  $('.restart').click(function () {
    score = 0
    exitIndex = 0
    stepIndex = 1
    $('#steps').text(`${stepIndex} / ${totalItems}`)
    stopMusic()
    sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    $('.score').text(getScoreLabel());
    imagesFull.forEach(obj => obj.viewed = false);
    totalItems--
    let defaultImage = imagesFull.find(item => item.name == 82)
    images = setArray(imagesFull, totalItems)
    defaultImage.viewed = true
    image = defaultImage
    images.push(defaultImage)
    totalItems++
    isLocal ? $('#image').attr('src', `assets/${defaultImage.name}.${ext}`) : shelterImage(`assets/${defaultImage.name}.${ext}`)
    setAnalitics(image.name, false, false, false)
    $(".final-actions").hide()
    $("#end").hide()
    $(".gallery-grid").fadeIn()
    $('.actions-container').fadeIn()
  });
  $('.exit').click(function () {
    if (exitIndex == 2) {
      rumbleArray(languages[currentLanguage].exitMessage)
    }
    if (exitIndex == 10) {
      sound(`assets/audio/giveup.mp3`);
    }
    if (exitIndex == languages[currentLanguage].exitMessage.length) {
      exitIndex = 2
    }
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
    $('#loading-circle').show();
    $('#status').show()
    //(path, loops = 1, volume = 1, isMusic = false, initialLoad = false, callback)
    sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true, true, function () {
      modal.hide();
    });
  });

  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
      sound(`assets/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true, true, true);
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

  stepIndex++
  $('#steps').text(`${stepIndex} / ${totalItems}`)

  //let unseen = images.filter(obj => obj.viewed === false && obj.active === true);

  let unseen = images.filter(obj => obj.level == 0 && obj.viewed === false);

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

    $('.gallery-item').addClass('fade-out')
    setTimeout(() => {
      setTimeout(() => {
        $('.gallery-item').removeClass('fade-out');
      }, 250);
      isLocal ? $('#image').attr('src', `assets/${image.name}.${ext}`) : shelterImage(`assets/${image.name}.${ext}`)
      setAnalitics(image.name, false, false, false)
    }, 250);

    if (image.ia_generated) {
      $('.ia-tag').fadeIn();
    }

  } else {
    stopMusic()
    $(".gallery-grid").hide()
    if (score == 100) {
      setAnalitics(image.name, false, false, false, true, true)
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
      setAnalitics(image.name, false, false, false, true, false)
      $("#end").show()
      $(".final-actions").fadeIn()
      $(".actions-container").hide()
      sound(`assets/audio/endfail${getEndfailSoundRandom()}.mp3`);
      $('#end').contents().filter(function () {
        return this.nodeType === 3;
      }).first().replaceWith(`${languages[currentLanguage].end}`);
      $('#count').text(` ${Math.floor(score)}`)
    }
  }

}

function setLanguage(currentLanguage) {

  Object.entries(languages[currentLanguage]).forEach(([key, value]) => {
    const element = document.getElementById(key);
    if (element) {
      // Verifica si el primer hijo es un nodo de texto
      const firstChild = element.firstChild;

      if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
        // Si ya existe un nodo de texto como primer hijo, actualízalo
        firstChild.nodeValue = value;
      } else {
        // Si no hay un nodo de texto, crea uno y agrégalo al inicio
        element.insertBefore(document.createTextNode(value), firstChild);
      }
    }
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

function sound(path, loops = 1, volume = 1, isMusic = false, initialLoad = false, callback) {
  if (musicOn == false) {
    stopMusic();
    return
  }
  let index = 0;
  if (initialLoad) {
    const totalAudios = soundsPaths.length;

    let promises = soundsPaths.map(function (path) {
      return new Promise(function (resolve, reject) {
        let sound = new Audio(path);
        sound.addEventListener('canplaythrough', function () {
          sounds.push(sound);
          resolve(); // Indica que este sonido está listo
        });
        sound.addEventListener('error', function () {
          reject('Error al cargar el sonido');
        });
      });
    });

    Promise.all(promises)
      .then(function () {
        // Una vez que todos los sonidos estén listos
        $('#loading-circle').hide();
        $('#status').hide();
        $('#play-button').show();
        callback();

        var sound = sounds.find(item => item.attributes.src.value == path)

        sound.volume = volume;
        sound.play();

        sound.addEventListener('ended', function () {
          index++;

          if (index < loops) {
            sound.play();
          }
        });
      })
      .catch(function (error) {
        alert(error);
      });

  } else {

  var sound = sounds.find(item => item.attributes.src.value == path)

  sound.volume = volume;
  sound.play();

  sound.addEventListener('ended', function () {
    index++;

    if (index < loops) {
      sound.play();
    }
  });
  }
}
function stopMusic() {
  sounds.forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });
}

function shelterImage(imagePath) {
  fetch(imagePath)  // Usa la ruta o URL de la imagen
    .then(response => response.blob())  // Convierte la respuesta a un Blob
    .then(blob => {
      var reader = new FileReader();
      reader.onloadend = function () {
        var base64Image = reader.result;  // La imagen convertida a Base64
        $('#image').attr('src', base64Image);
      };
      reader.readAsDataURL(blob);  // Lee el Blob como URL de datos (Base64)
    })
    .catch(error => console.log('Error getting image', error));
}

function setAnalitics(image, assert, fail, nd, match, wmatch) {
  if (localStorage.getItem("d-zx5sk-stats") !== null) {
    currentAnalitics = getAnalitics()
    analitics = currentAnalitics;
  }
  if (assert) {
    analitics.corrects++
  }
  if (fail) {
    analitics.mistakes++
  }
  if (match) {
    analitics.matches++
  }
  if (wmatch) {
    analitics.wmatches++
  }
  if (!analitics.seenimages.includes(image) && !nd) {
    analitics.seenimages.push(image)
  }
  if (!analitics.seennimages.includes(image) && nd) {
    analitics.seennimages.push(image)
  }
  localStorage.setItem('td-zx5sk-stats', JSON.stringify(analitics));
  // matches: "Partidas jugadas:",
  // corrects: "Asiertos totales:",
  // mistakes: "Fallos totales:",
  // seenimages: "Imágenes vistas:",
  // seennimages: "",
}
function getAnalitics() {
  var analitics = JSON.parse(localStorage.getItem("td-zx5sk-stats"));
  return analitics;
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
    { value: 3, weight: 0.41 },
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

function getScoreLabel() {
  return languages[currentLanguage].score + Math.floor(score)
}

function setAnaliticsLabels() {
  $('#matchesx').text(analitics.matches)
  $('#wmatchesx').text(analitics.wmatches)
  $('#correctsx').text(analitics.corrects)
  $('#mistakesx').text(analitics.mistakes)
  $('#seenimagesx').text(analitics.seenimages.length + ' de ' + (imagesFull.length + 22))
  $('#seennimagesx').text(analitics.seennimages.length + ' de ' + (imagesFull.length + 22))
}


var soundsPaths = [
  'assets/audio/correct1.mp3',
  'assets/audio/correct2.mp3',
  'assets/audio/correct3.mp3',
  'assets/audio/correct4.mp3',
  'assets/audio/correct5.mp3',
  'assets/audio/correct6.mp3',
  'assets/audio/correct7.mp3',
  'assets/audio/correct8.mp3',
  'assets/audio/correct9.mp3',
  'assets/audio/correct10.mp3',
  'assets/audio/correct11.mp3',
  'assets/audio/correct12.mp3',
  'assets/audio/correct13.mp3',

  'assets/audio/endfail1.mp3',
  'assets/audio/endfail2.mp3',
  'assets/audio/endfail3.mp3',
  'assets/audio/endfail4.mp3',
  'assets/audio/endfail5.mp3',

  'assets/audio/fail1.mp3',
  'assets/audio/fail2.mp3',
  'assets/audio/fail3.mp3',

  'assets/audio/scream1.mp3',
  'assets/audio/next.mp3',
  'assets/audio/mistry.mp3',
  'assets/audio/mistry2.mp3',
  'assets/audio/mistry3.mp3',
  'assets/audio/giveup.mp3',
  'assets/audio/heart-beat.mp3',

  'assets/audio/music1.mp3',
  'assets/audio/music2.mp3',
  'assets/audio/music3.mp3',
  'assets/audio/music4.mp3',
  'assets/audio/music5.mp3',
  'assets/audio/music6.mp3',

];

const languages = {
  es: {
    name: "TiddyPink",
    next: "Siguiente",
    restart: "Volver a intertarlo",
    exit: "Salir",
    purchase: "Obtener todas las imágenes",
    modal_title: "Instruccions para jugar",
    modal_content: "Debes adiveinar el color",
    acept: "Aceptar",
    ia_tag: "Generada por IA",
    footer: "Todos los derechos reservados - 2024",
    score: "Puntuación: ",
    home: "Inicio",
    howto: "Como jugar",
    more: "Saber más",
    analitics: "Mis estadísticas",
    showprev: "Mostrar imagen anterior",
    end: "Haz fallado estrepitosamente tu puntuación ha sido de:",
    matches: "Partidas jugadas:  ",
    wmatches: "Partidas ganadas:  ",
    corrects: "Asiertos totales:  ",
    mistakes: "Fallos totales:  ",
    seenimages: "Imágenes diferentes vistas:  ",
    seennimages: "Imagenes diferentes d vistas:  ",
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
    name: "TiddyPink",
    next: "Next",
    restart: "Try Again",
    exit: "Exit",
    purchase: "Get all the images",
    modal_title: "Instructions to play",
    modal_content: "You must guess the color",
    acept: "Accept",
    footer: "All rights reserved - 2024",
    score: "Score: ",
    home: "Home",
    howto: "How to play",
    more: "Learn more",
    analitics: "My analitics",
    showprev: "Show previous image",
    end: "You have failed miserably, your score is:",
    successMessage: "Amazing, you guessed all the images 😳 I have a prize for you 🥵 it will appear in: ",
    exitMessage: [
      "This button does nothing :v",
      "I told you this button does nothing.",
      "Please listen to me. This button does nothing.",
      "(The button still does nothing *)",
      "This button still does nothing, like your ex.",
      "Press carefully, this button has low self-esteem.",
      "This button is like her feelings, empty...",
      "For every time you press this button, a kitten dies somewhere in the world.",
      "This button has feelings and they are about to break.",
      "This button is here just for decoration.",
      "If you press this button again, you're g4y.",
      "I knew it...",
      "Intelligence is chasing you, but you're faster.",
      "I lost her when I loved her the most.",
      "Messirve...",
      "Remember you have important things to do uwu.",
      "Siiuuuuuuuu",
      "Each click on this button is a reminder that nothing lasts forever.",
      "Thank you for your valuable time, but nothing still happens.",
      "Please, look for happiness elsewhere.",
      "Press again to waste another second of your life.",
      "What doesn’t break this button makes it stronger.",
      "This button promises to do nothing and delivers.",
      "This button is as useful as an umbrella in the desert.",
      "This button has goals, but it says it starts tomorrow.",
      "Sometimes you just have to accept that not everything goes your way.",
      "This button is not broken; it just does nothing.",
      "I see you like feeling digitally ignored.",
      "This button feels flattered... but still does nothing.",
      "The world keeps moving while you insist on this...",
      "Nothing changes... everything stays the same...",
      "This button does nothing, but you still have faith.",
      "Each click is a small victory.",
      "0 results were produced.",
      "Some people are slow to understand.",
      "This button does nothing, but you already knew that.",
      "This button does nothing in the morning and rests in the afternoon.",
      "This button is emptier than your bank account.",
      "This button is more absent than her love.",
      "This button is more lost than your phone when left on silent.",
      "This button is more broken than your New Year's resolutions.",
      "This button is more stuck than your progress with her.",
      "This button is emptier than your inbox.",
      "This button needs its space...",
      "This button is more tense than you when someone grabs your phone.",
      "This button is getting uncomfortable.",
      "This button is emptier than your chat with the one you like.",
      "Don't even try.",
      "Better luck next time.",
      "Don't worry, you'll do fine.",
      "Don't panic, just let yourself go.",
      "Well done, do you dare to try again?",
      "I promise this button will never do anything.",
      "Don't worry, this button is empty inside too.",
      "There’s effort, but talent is missing.",
      "This button is like the one you like, it doesn’t respond.",
      "Look at you... you're not aware and still insist on showing the world what you can do... as if you've already proven it.",
      "Even the strongest opponent always has a weakness.",
      "No one cared who I was until I put on a mask.",
      "All efforts are useless if you don't believe in yourself."
    ],
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
    correct: "2",
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

  /**
   * 
   * 
   * 
  */

  {
    name: '539',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '540',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '541',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '542',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '543',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '544',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '545',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '546',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '547',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '548',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '549',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '550',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '551',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '552',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '553',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '554',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '555',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '556',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '557',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '558',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '559',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '560',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '561',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '562',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '563',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '564',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '565',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '566',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '567',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '568',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '569',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '570',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '571',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '572',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '573',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '574',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '575',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '576',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '577',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '578',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '579',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '580',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '581',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '582',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '583',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '584',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '585',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '586',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '587',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '588',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '589',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '590',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '591',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '591',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '592',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '593',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '594',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '595',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '596',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '597',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '598',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '599',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '600',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '601',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '602',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '603',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '604',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '605',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '606',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '607',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '608',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '609',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '610',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '611',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '612',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '613',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '614',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '615',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '616',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '617',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '618',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '619',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '620',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '621',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '622',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '623',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '624',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '625',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '626',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '627',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '628',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '629',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '630',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '631',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '632',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '633',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '634',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '635',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '636',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '637',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '638',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '639',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '640',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '641',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '642',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '643',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '644',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '645',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '646',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '647',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '648',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '649',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '650',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '651',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '652',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '653',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '654',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '655',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '656',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '657',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '658',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '659',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '660',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '661',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '662',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '663',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '664',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '665',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '666',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '667',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '668',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '669',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '670',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '671',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '672',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '673',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '674',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '675',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  // {
  //   name: '676',
  //   correct: "3",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  {
    name: '677',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '678',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '679',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '680',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '681',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '682',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '683',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '684',
    correct: "1",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '685',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '686',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '687',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '688',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '689',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '690',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '691',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '692',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '693',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '694',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '695',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '696',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '697',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '698',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '699',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '700',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '701',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '702',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '703',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '704',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '705',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '706',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '707',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '708',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '709',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '710',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '711',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '712',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '713',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '714',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '715',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '716',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '717',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '718',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '719',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '720',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '721',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '722',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '723',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '724',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '725',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '726',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '727',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '728',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '729',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '730',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '731',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '732',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '733',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '734',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '735',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '736',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '737',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '738',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '739',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '740',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '741',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '742',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '743',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '744',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '745',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '746',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '747',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '748',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '749',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '750',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '751',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '752',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '753',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '754',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '755',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '756',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '757',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '758',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '759',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '760',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '761',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '762',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '763',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '764',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '765',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '766',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '767',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '768',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '769',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  // {
  //   name: '770',
  //   correct: "3",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  // {
  //   name: '771',
  //   correct: "3",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  // {
  //   name: '772',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  // {
  //   name: '773',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  // {
  //   name: '774',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  // {
  //   name: '775',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  // {
  //   name: '776',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  // {
  //   name: '777',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  // {
  //   name: '778',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  // {
  //   name: '779',
  //   correct: "5",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  {
    name: '780',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '781',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '782',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '783',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '784',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '785',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '786',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '787',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '788',
    correct: "6",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '789',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '790',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '791',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '792',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '793',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '794',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '795',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '796',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '797',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '798',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '799',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '800',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '801',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '802',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '803',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '804',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '805',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '806',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '807',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '808',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '809',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '810',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '811',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '812',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '813',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '814',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '815',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '816',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '817',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '818',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '819',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '820',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '821',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '822',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '823',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '824',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '825',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '826',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '827',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '828',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '829',
    correct: "4",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '830',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '831',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '832',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '833',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '834',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '835',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '836',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '837',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '838',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '839',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '840',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '841',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '842',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '843',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '844',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '845',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '846',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '847',
    correct: "5",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '848',
    correct: "5",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '849',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '850',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '851',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '852',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '853',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '854',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '855',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '856',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '857',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '858',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '859',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '860',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '861',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '862',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '863',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '864',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '865',
    correct: "5",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '866',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '857',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '868',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '869',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '870',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '871',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '872',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '873',
    correct: "2",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '874',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '875',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '876',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '877',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '878',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },//
  {
    name: '879',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '880',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 0,
    active: true
  },
  {
    name: '881',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '882',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '883',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '884',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '885',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '886',
    correct: "4",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '887',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  // {
  //   name: '888',
  //   correct: "2",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
  {
    name: '889',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '890',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 1,
    active: true
  },
  {
    name: '891',
    correct: "3",
    viewed: false,
    ia_generated: true,
    level: 2,
    active: true
  },
  {
    name: '892',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '893',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  // {
  //   name: '894',
  //   correct: "3",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 1,
  //   active: true
  // },
  {
    name: '895',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '896',
    correct: "5",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  }
];

/*References
273
272
*/