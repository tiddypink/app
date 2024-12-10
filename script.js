const ext = 'webp'
var image;
var stepIndex = 1;
var correct;
var score = 0;
var opcion;
var currentLanguage
var zsf4ns9g4 = 25 //total items
var images;
var exitIndex = 0
var music;
var soundEfect;
var musicOn = true;
var gameStarted = false;
var extra = 87;
var wildcards  = 16;  //wildcards
var wildcardUsed = false
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

  $('#language-select').on('change', function() {
    const language = $(this).val();
    currentLanguage = language
    setLanguage(language);
    $('.score').text(getScoreLabel());
  });

 $('#steps').text(`${stepIndex} / ${zsf4ns9g4}`)

 if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection.downlink < 5) {
      musicOn = false;
    }

    connection.addEventListener('change', () => {
      if (connection.downlink < 5) {
        musicOn = false;
      }
    });
  }

  //localStorage.removeItem('td-zx5sk-stats');
  if (localStorage.getItem("td-zx5sk-stats") !== null) {
    analitics = getAnalitics()
    setAnaliticsLabels()
  }else{
    setAnaliticsLabels()
  }

  $('#next').hide();
  $('.ia-tag').hide();
  $(".suceess-image").hide()
  $(".final-actions").hide()
  $(".tabs").hide()
  $("#end").hide()
  $("#score").hide()
  $('#loading-circle').hide();
  $('#status').hide()
  $('#wildcards').text(' ('+wildcards+")")
  $('#wildcard').hide()
  $(".musicswitch").hide()
  $("#total").text((imagesFull.length + extra))

  setTimeout(() => {
    $('#welcome').hide()
    $("body").css("overflow", "auto");
 // }, Math.floor(Math.random() * (4000 - 1750 + 1)) + 1750);
}, 1);


  let defaultImage = imagesFull.find(item => item.name == 82)
  zsf4ns9g4--
  images = setArray(imagesFull, zsf4ns9g4)

  isLocal ? $('#image').attr('src', `v1i89uo45w/${defaultImage.name}.${ext}`) : shelterImage(`v1i89uo45w/${defaultImage.name}.${ext}`)
  setAnalitics(defaultImage.name,false,false,false)
  
  image = defaultImage
  $('.actions-container > :nth-child(2)').addClass('first');

  defaultImage.viewed = true
  images.push(defaultImage)
  zsf4ns9g4++

  $('.go').click(function () {
    $('.actions-container > :nth-child(2)').removeClass('first');
    opcion = $(this).attr('id');
    if (!image.name) {
      return
    }
    if (Math.random() < 0.001) {
      sound(`v1i89uo45w/audio/mistry.mp3`, 2, .3);
    }
    if (Math.random() < 0.020) {
      sound(`v1i89uo45w/audio/mistry2.mp3`, 3, .3);
    }
    if (!gameStarted) {
      gameStarted = true;
      isLocal ? $('#image').attr('src', `v1i89uo45w/82.${ext}`) : shelterImage(`v1i89uo45w/82.${ext}`)
      sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    }
    $("#wildcard").hide()
    image = images.find(item => item.name == image.name)
    const claves = Object.keys(image);
    const prop = claves[1];
    if (opcion == image[prop]) {
    //if(true){
      if ($('#next').is(':visible')) {
        return
      }
      $('.go').removeClass('first')
      $(this).css("animation", "");
      sound(`v1i89uo45w/audio/correct${getCorrectSoundRandom()}.mp3`);
      score += 100 / images.length;
      $('.score').show()
      $('.score').text(getScoreLabel());
      $('.score').css('color', '#88ff4c');
      setTimeout(function () {
        $('.score').css('color', '#ddd');
      }, 250);

      $('.gallery-item-animation').addClass('fade-out')
      setTimeout(() => {
        setTimeout(() => {
          $('.gallery-item-animation').removeClass('fade-out');
        }, 250);
        isLocal ? $('#image').attr('src', `v1i89uo45w/n${image.name}.${ext}`) : shelterImage(`v1i89uo45w/n${image.name}.${ext}`)
        //$(".tabs").show()
        setAnalitics(image.name,true,false,true)
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
      setAnalitics(image.name, assert = false,true,false)
      const $elemento = $(this);
      $elemento.css("animation", "shake 0.2s");
      setTimeout(function () {
        $elemento.css("animation", "");
        //return
      }, 200);
      if ($('#next').is(':hidden')) {
        sound(`v1i89uo45w/audio/fail${getFailSoundRandom()}.mp3`);
        $('.go').css('pointer-events', 'none');
        $('.score').text(getScoreLabel());
        $('.score').css('color', '#ff3636');
        setTimeout(function () {
          $('.score').css('color', '#ddd');
          $('.go').css('pointer-events', 'auto');
        }, 2000);

        $(this).css('border', '12px solid #ff3636');
        setTimeout(function () {
          $('.go').css('border', '2px solid #ff206e');
          $('.actions-container').fadeOut()
          next();
        }, 2200);
      }
    }
    

  });

  $('#purchase1, #purchase').click(function () {
    const modal = $("#modalPurchase");
    const openModal = $("#openModal");
    const closeModal = $(".close");
    const closeAcept = $(".acept");
    modal.show();
    openModal.click(function () {
      modal.show();
    });

    closeModal.click(function () {
      modal.hide();
    });
    closeAcept.click(function () {
      modal.hide();
    });

    $(window).click(function (event) {
      if ($(event.target).is(modal)) {
        modal.hide();
      }
    });
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
  $('#next').click(function () {
    next()
  });

  $("#wildcard").click(function () {
    if (wildcards >= 1) {
      if (wildcardUsed) {
        return
      }
      $(`.actions-container #${image.correct}`).addClass('first')
      wildcards--
      sound('v1i89uo45w/audio/wildcard.mp3');
      if (wildcards == 0) {
        $('#wildcard').css('opacity', '.4')
      }
      wildcardUsed = true
      $('#wildcards').text(' ('+wildcards+")")
      $('#wildcard').fadeOut()
    }
    
  });

  $('.restart').click(function () {
    score = 0
    exitIndex = 0
    stepIndex = 1
    wildcardUsed = false
    wildcards  = 2;
    $('#wildcards').text(' ('+wildcards+")")
    $('#wildcard').css('opacity', '1')

    $('.go').removeClass('first')
    $('#steps').text(`${stepIndex} / ${zsf4ns9g4}`)
    stopMusic()
    sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    $('.score').text(getScoreLabel());
    imagesFull.forEach(obj => obj.viewed = false);
    zsf4ns9g4--
    let defaultImage = imagesFull.find(item => item.name == 82)
    images = setArray(imagesFull, zsf4ns9g4)
    defaultImage.viewed = true
    image = defaultImage
    images.push(defaultImage)
    zsf4ns9g4++
    isLocal ? $('#image').attr('src', `v1i89uo45w/${defaultImage.name}.${ext}`) : shelterImage(`v1i89uo45w/${defaultImage.name}.${ext}`)
    setAnalitics(image.name,false,false,false)
    $(".final-actions").hide()
    $("#end").hide()
    $(".game").fadeIn()
    $('.actions-container').fadeIn()
  });
  $('.exit').click(function () {
    if (exitIndex == 2) {
      rumbleArray(languages[currentLanguage].exitMessage)
    }
    if (exitIndex == 10) {
      sound(`v1i89uo45w/audio/giveup.mp3`);
    }
    if (exitIndex == languages[currentLanguage].exitMessage.length) {
      exitIndex = 2
    }

    alert(languages[currentLanguage].exitMessage[exitIndex])
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
      stopMusic()
      //sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    } else {
      musicOn = true
      sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    }
  });

  $('#start').click(function () {
    if (!gameStarted) {
      gameStarted = true
      sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true); 
      $(".musicswitch").show()
    }
  })

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
    //sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
  });
  closeAcept.click(function () {
    modal.hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
      //sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    }
  });
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  imagesFull.forEach((image) => {
    const img = new Image();
    img.src = `v1i89uo45w/${image.name}.${ext}`;
  
    img.onload = () => {
      //console.log(`✅ La imagen existe: ${image.name}`);
    };
  
    img.onerror = () => {
      console.log(`❌ La imagen no existe: ${image.name}`);
    };
  });
  imagesFull.forEach((image) => {
    const img = new Image();
    img.src = `v1i89uo45w/n${image.name}.${ext}`;
  
    img.onload = () => {
      //console.log(`✅ La imagen existe: ${image.name}`);
    };
  
    img.onerror = () => {
      console.log(`❌ La imagen no existe: n${image.name}`);
    };
  });
  
});

// !
// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });

function next() {
  sound('v1i89uo45w/audio/next.mp3');
  $('#next').fadeOut();
  correct = null;
  opcion = -1;
  wildcardUsed = false
  $('.go').css('border', '2px solid #ff206e');
  $('.actions-container').fadeIn()
  $('#image').removeClass('correct');
  $('.gallery-item').css('border', '3px solid #ff206e');
  $('.images').fadeIn()
  $('.go').removeClass('first')
  $('.ia-tag').hide();
  $(".tabs").hide()
  $('#nd').addClass('active')
  $('#nm').removeClass('active')
  stepIndex++
  $('#steps').text(`${stepIndex} / ${zsf4ns9g4}`)
  $("#wildcard").fadeIn()

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

    $('.gallery-item-animation').addClass('fade-out')
    setTimeout(() => {
      setTimeout(() => {
        $('.gallery-item-animation').removeClass('fade-out');
      }, 250);
      isLocal ? $('#image').attr('src', `v1i89uo45w/${image.name}.${ext}`) : shelterImage(`v1i89uo45w/${image.name}.${ext}`)
      setAnalitics(image.name,false,false,false)
    }, 250);

    if (image.ia_generated) {
      $('.ia-tag').fadeIn();
    }

  } else {
    stopMusic()
    $(".game").hide()
    if (score == 100) {
      setAnalitics(image.name,false,false,false,true,true)
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
          sound('v1i89uo45w/audio/scream1.mp3');
          $('.suceess-image').removeClass('fade-out');
          $('.suceess-image').attr('src', `v1i89uo45w/end.${ext}`);
          $('html').animate({
            scrollTop: $('#suceess-image').offset().top
          }, 0);
        } else {
          sound(`v1i89uo45w/audio/heart-beat.mp3`);
        }

      }, 1000);

    } else {
      setAnalitics(image.name,false,false,false,true,false)
      $("#end").show()
      $(".final-actions").fadeIn()
      $(".actions-container").hide()
      sound(`v1i89uo45w/audio/endfail${getEndfailSoundRandom()}.mp3`);
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
        const firstChild = element.firstChild;
        
        if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
            firstChild.nodeValue = value;
        } else {
            element.insertBefore(document.createTextNode(value), firstChild);
        }
    }

});
$('#exnext').click(function() {  
  $('#imageex').attr('src', `v1i89uo45w/${imagesFull[stepIndex-1].name}.${ext}`)
  $('#imageex1').attr('src', `v1i89uo45w/n${imagesFull[stepIndex-1].name}.${ext}`)
  stepIndex++
  //735
})
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

function get() {

}

function selectTabN() {
  $('#nd').addClass('active')
  $('#nm').removeClass('active')
  isLocal ? $('#image').attr('src', `v1i89uo45w/n${image.name}.${ext}`) : shelterImage(`v1i89uo45w/n${image.name}.${ext}`)
}

function selectTabNm() {
  $('#nd').removeClass('active')
  $('#nm').addClass('active')
  isLocal ? $('#image').attr('src', `v1i89uo45w/${image.name}.${ext}`) : shelterImage(`v1i89uo45w/${image.name}.${ext}`)
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

  soundEfect = new Audio(path);
  soundEfect.volume = volume;
  soundEfect.play();

  soundEfect.addEventListener('ended', function () {
    index++;

    if (index < loops) {
      soundEfect.play();
    }
  });
}
function stopMusic() {

  if( music?.pause()) {
    music.currentTime = 0;
  }
  if (soundEfect?.pause()) {
    soundEfect.currentTime = 0;  
  }
  
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

function setAnalitics(image,assert,fail,nd,match,wmatch){
  if (localStorage.getItem("d-zx5sk-stats") !== null) {
    currentAnalitics = getAnalitics()
    analitics = currentAnalitics;
  }
  if (assert) {
    analitics.corrects++
  } 
  if(fail) {
    analitics.mistakes++
  }
  if(match) {
    analitics.matches++
  }
  if(wmatch) {
    analitics.wmatches++
  }
  if (!analitics.seenimages.includes(image) && !nd) {
    analitics.seenimages.push(image)
  }
  if (!analitics.seennimages.includes(image) && nd) {
    analitics.seennimages.push(image)
  }
  localStorage.setItem('td-zx5sk-stats', JSON.stringify(analitics));

  setAnaliticsLabels()
}

function getAnalitics(){
  var analitics = JSON.parse(localStorage.getItem("td-zx5sk-stats"));
  return analitics;
}

function getCorrectSoundRandom() {
  const numbers = [
    { value: 1, weight: 0.35 },
    { value: 2, weight: 0.03 },
    { value: 3, weight: 0.20 },
    { value: 4, weight: 0.015 },
    { value: 5, weight: 0.25 },
    { value: 6, weight: 0.02 },
    { value: 7, weight: 0.03 },
    { value: 8, weight: 0.02 },
    { value: 9, weight: 0.00 },
    { value: 10, weight: 0.05 },
    { value: 11, weight: 0.005 },
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
    { value: 2, weight: 0.35 },
    { value: 3, weight: 0.35 },
    { value: 4, weight: 0.09 },
    { value: 5, weight: 0.10 },
    { value: 6, weight: 0.15 }
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

function getScoreLabel(){
  return languages[currentLanguage].score + Math.floor(score)
}

function setAnaliticsLabels(){
  $('#matchesx').text(analitics.matches)
  $('#wmatchesx').text(analitics.wmatches)
  $('#correctsx').text(analitics.corrects)
  $('#mistakesx').text(analitics.mistakes)
  $('#seenimagesx').text(analitics.seenimages.length + ' de '+ (imagesFull.length + extra))
  $('#seennimagesx').text(analitics.seennimages.length + ' de '+ (imagesFull.length + extra))
}
const audios = document.querySelectorAll('audio');

// Función para pausar todos los audios
function pauseAllAudios() {
    audios.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
        }
    });
}

// Detectamos cambios en la visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseAllAudios(); // Pausar todos los audios si la página no está visible
    }
});

const languages = {
  es: {
    name: "TiddyPink",
    next: "Siguiente",
    restart: "Volver a intertarlo",
    wildcard: "Usar un comodín ",
    exit: "Salir",
    purchase: "Obtener todas las imágenes",
    purchase1: "Obtener todas las imágenes",
    modal_title: "Debes aceptar solo si eres mayor de 18 años",
    modal_purchase_title: "Obtener todas las imagenes:",
    modal_content: "Puedes obtener todas las imagenes, en version vestida y en versión desnuda, atravez de estas dos opciones:",
    total_text:'Total de imágenes: ',
    acept: "Aceptar",
    ia_tag: "Generada por IA",
    footer: "Todos los derechos reservados - 2024",
    score: "Puntuación: ",
    musicOn: "Música",
    MusicOff: "Música",
    home: "Jugar",
    nm: "Vestir",
    nd: "Desnudar",
    howto: "Como jugar",
    more: "Saber más",
    analitics: "Mis estadísticas",
    statslabel: "Mis estadísticas:",
    end: "Haz fallado estrepitosamente tu puntuación ha sido de:",
    matches: "Partidas jugadas:  ",
    wmatches: "Partidas ganadas:  ",
    corrects: "Asiertos totales:  ",
    mistakes: "Fallos totales:  ",
    seenimages: "Imágenes diferentes vistas:  ",
    seennimages: "Imagenes diferentes d vistas:  ",
    titlehowto: "Como jugar:",
    texthowto: 'Adivina el color del pezón de la chica entre 6 opciones. Si aciertas, verás a la chica desnuda; si fallas, pasas a la siguiente imagen. La primera ronda te mostraré la opción correcta, luego sigues solo. A medida que avanzas, las imágenes serán más explícitas, y con puntuación perfecta, habrá una sorpresa especial.',
    //texthowto : "Adivina el color del pezón de la chica entre 6 opciones. si adivinas la veras desnuda; si fallas, pasas a la siguiente imagen. entre mas lejos avances, las imágenes seran mas explícitas, La primera ronda muestra la respuesta correcta, luego sigues solo. Si consigues una puntuación perfecta habrá algo especial para ti.",
    start: "Empezar ya !",
    moretitle: "Obtener mas",
    moretext: "Puedes obtener todas las imágenes",
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
  // {
  //   name: '62',
  //   correct: "4",
  //   viewed: false,
  //   ia_generated: false,
  //   level: 0,
  //   active: true
  // },
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
    correct: "4",
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
    level: 2,
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
    correct: "3",
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
    correct: "5",
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
  },
  //
  {
    name: '897',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '898',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '899',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '900',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '901',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '902',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '903',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '904',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '905',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '906',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '907',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  {
    name: '908',
    correct: "3",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '909',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 1,
    active: true
  },
  {
    name: '910',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 0,
    active: true
  },
  {
    name: '911',
    correct: "2",
    viewed: false,
    ia_generated: false,
    level: 2,
    active: true
  },
  { name: '912', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '913', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '914', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '915', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '916', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '917', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '918', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '919', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '920', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '921', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '922', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '923', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '924', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '925', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '926', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '927', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '928', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '929', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '930', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '931', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '932', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '933', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '934', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '935', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '936', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '937', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '938', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '939', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '940', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '941', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '942', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '943', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '944', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '945', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '946', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '947', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '948', correct: "3", viewed: false, ia_generated: true, level: 2, active: true },
  { name: '949', correct: "3", viewed: false, ia_generated: true, level: 2, active: true },
  { name: '950', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '951', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '952', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '953', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '954', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '955', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '956', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '957', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '958', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '959', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '960', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '961', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '962', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '963', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '964', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '965', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '966', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '967', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '968', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '969', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '970', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '971', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '972', correct: "1", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '973', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '974', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '975', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '976', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '977', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '978', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '979', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '980', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '981', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '982', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '983', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '984', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '985', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '986', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '987', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '988', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  // { name: '989', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '990', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '991', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '992', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '993', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '994', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '995', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '996', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '997', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '998', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '999', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1000', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1001', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1002', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1003', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1004', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1005', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1006', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1007', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1008', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1009', correct: "3", viewed: false, ia_generated: true, level: 1, active: true },
  { name: '1010', correct: "4", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1011', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1012', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1013', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1014', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1015', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1016', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1017', correct: "1", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1018', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1019', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1020', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1021', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1022', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1023', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1024', correct: "1", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1025', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1026', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1027', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1028', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1029', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1030', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1031', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1032', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1033', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1034', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1035', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1036', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1037', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1038', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1039', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1040', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1041', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1042', correct: "6", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1043', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1044', correct: "6", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1045', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1046', correct: "5", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1047', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1048', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1049', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1050', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1051', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1052', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1053', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1054', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1055', correct: "5", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1056', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1057', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1058', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1059', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1060', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1061', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1062', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1063', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1064', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1065', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1066', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1067', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1068', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1069', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1070', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1071', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1072', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1073', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1074', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1075', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1076', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1077', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1078', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1079', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1080', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1081', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1082', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1083', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1084', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1085', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1086', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1087', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1088', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1089', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1090', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1091', correct: "5", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1092', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1093', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1094', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1095', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1096', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1097', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1098', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1099', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1100', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1101', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1102', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1103', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1104', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1105', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1106', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1107', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1108', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1109', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1110', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1111', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1112', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1113', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1114', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1115', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1116', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1117', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1118', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1119', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1120', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1121', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1122', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1123', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1124', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1125', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1126', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1127', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1128', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1129', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1130', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1131', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1132', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1133', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1134', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1135', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1136', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1137', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1138', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1139', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1140', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1141', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1142', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1143', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1144', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1145', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1146', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1147', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1148', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1149', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1150', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1151', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1152', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1153', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1154', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1155', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1156', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1157', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1158', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1159', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1160', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1161', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1162', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1163', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1164', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1165', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1166', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1167', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1168', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1169', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1170', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1171', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1172', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1173', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1174', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1175', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1176', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1177', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1178', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1179', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1180', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1181', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1182', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1183', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1184', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1185', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  // { name: '1186', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1187', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1188', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1189', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1190', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1191', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1192', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1193', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1194', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1195', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1196', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1197', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1198', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1199', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1200', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  //{ name: '1201', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1202', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1203', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1204', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1205', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1206', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1207', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1208', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1209', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1210', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1211', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1212', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1213', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1214', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1215', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1216', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1217', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1218', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1219', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1220', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1221', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1222', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1223', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1224', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1225', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1226', correct: "2", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1227', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1228', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1229', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1230', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1231', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1232', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1233', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1234', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1235', correct: "4", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1236', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1237', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1238', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1239', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1240', correct: "2", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1241', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1242', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1243', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1244', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1245', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1246', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1247', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1248', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1249', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1250', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1251', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1252', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1253', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1254', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  // { name: '1255', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1256', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1257', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1258', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1259', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1260', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1261', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1262', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1263', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1264', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1265', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1266', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1267', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1268', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1269', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1270', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1271', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1272', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1273', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1274', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1275', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1276', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1277', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1278', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1279', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1280', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1281', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  
  { name: '1282', correct: "6", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1283', correct: "5", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1284', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1285', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1286', correct: "5", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1287', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1288', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1289', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1290', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1291', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1292', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1293', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1294', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1295', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1296', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  // { name: '1297', correct: "", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1298', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1299', correct: "3", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1300', correct: "4", viewed: false, ia_generated: true, level: 0, active: true },
  { name: '1301', correct: "3", viewed: false, ia_generated: true, level: 2, active: true },
  { name: '1302', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1303', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1304', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1305', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1306', correct: "4", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1307', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1308', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1309', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1310', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1311', correct: "2", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1312', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1313', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1314', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1315', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1316', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1317', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1318', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1319', correct: "5", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1320', correct: "5", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1321', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },

  { name: '1322', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1323', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1324', correct: "3", viewed: false, ia_generated: false, level: 2, active: true }, 
  { name: '1325', correct: "3", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1326', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1327', correct: "3", viewed: false, ia_generated: false, level: 0, active: true }, 
  { name: '1328', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1329', correct: "4", viewed: false, ia_generated: false, level: 0, active: true },
  { name: '1330', correct: "3", viewed: false, ia_generated: false, level: 0, active: true }, 
  { name: '1331', correct: "3", viewed: false, ia_generated: false, level: 1, active: true },
  { name: '1332', correct: "3", viewed: false, ia_generated: false, level: 1, active: true }, 
  { name: '1333', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
  { name: '1334', correct: "3", viewed: false, ia_generated: false, level: 0, active: true }, 
  { name: '1335', correct: "3", viewed: false, ia_generated: false, level: 2, active: true },
];

