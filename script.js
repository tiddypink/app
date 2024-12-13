const ext = 'webp'
var kd84bd0; // 1295
var stepIndex = 1;
//var correct; //
var score = 0;
var wr5kj; //opcion
var currentLanguage
var zsf4ns9g4 = 25 //total items
var xpz1t9k; //
var exitIndex = 0
var music;
var soundEfect;
var musicOn = true;
var gameStarted = false;
var u4qhgfty2 = 91; // extra
var zQlnx2  = 3;  //wildcards
var x8dlH61 = false  //wildcardUsed
var zmidr4 = 0 //storage WC
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

  
  $(document).click(function(event) {
    if (!$(event.target).closest('.nav').length && !$(event.target).is('.menu-toggle')) {
      $('.nav').removeClass('active');
    }
  });

  currentLanguage = (navigator.language || navigator.userLanguage).split("-")[0];

  if (!['es','en','fr','ko','de','ja', 'pt','zh'].includes(currentLanguage)) {
    currentLanguage = 'en'
  }
  
  setLanguage(currentLanguage);

  //localStorage.removeItem("td-uwc")
  if (localStorage.getItem("td-uwc") !== null) {
    zmidr4 = localStorage.getItem("td-uwc").split(',')[0]
  }

  $('#language-select').on('change', function() {
    const language = $(this).val();
    currentLanguage = language
    setLanguage(language);
    $('.score').text(getScoreLabel());
  });

 $('#steps').text(`${stepIndex} / ${zsf4ns9g4}`)

 if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection.downlink < 4) {
      musicOn = false;
    }
    //alert(connection.downlink+' '+musicOn)

    connection.addEventListener('change', () => {
      if (connection.downlink < 4) {
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
  $('#6v0sd4').text(' ('+zQlnx2+")")
  $('#zx7uj2r').hide()  //wilcard element
  $(".musicswitch").hide()
  $("#total").text((hgb9qyz.length + u4qhgfty2))

  setTimeout(() => {
    $('#welcome').hide()
    $("body").css("overflow", "auto");
  }, Math.floor(Math.random() * (3000 - 1750 + 1)) + 1750);
//}, 1);


  let defaultImage = hgb9qyz.find(item => item.ec3sx == 82)
  zsf4ns9g4--
  xpz1t9k = setArray(hgb9qyz, zsf4ns9g4)

  isLocal ? $('#image').attr('src', `v1i89uo45w/${defaultImage.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/${defaultImage.ec3sx}.${ext}`)
  setAnalitics(defaultImage.ec3sx,false,false,false)
  
  kd84bd0 = defaultImage
  $('.actions-container > :nth-child(2)').addClass('first');

  defaultImage.viewed = true
  xpz1t9k.push(defaultImage)
  zsf4ns9g4++

  $('.go').click(function () {
    $('.actions-container > :nth-child(2)').removeClass('first');
    wr5kj = $(this).attr('id');
    if (!kd84bd0.ec3sx) {
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

    $("#zx7uj2r").hide()
    kd84bd0 = xpz1t9k.find(item => item.ec3sx == kd84bd0.ec3sx)
    const claves = Object.keys(kd84bd0);
    const prop = claves[1];
    if (wr5kj == kd84bd0[prop]) {
    //if(true){
      if ($('#next').is(':visible')) {
        return
      }
      $('.go').removeClass('first')
      $(this).css("animation", "");
      sound(`v1i89uo45w/audio/correct${getCorrectSoundRandom()}.mp3`);
      score += 100 / xpz1t9k.length;
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
        $('#image').attr('src', null)
        isLocal ? $('#image').attr('src', `v1i89uo45w/n${kd84bd0.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/n${kd84bd0.ec3sx}.${ext}`)
        //$(".tabs").show()
        setAnalitics(kd84bd0.ec3sx,true,false,true)
      }, 250);

      if (xpz1t9k.ia_generated) {
        $('.ia-tag').fadeIn();
      }

      $('#next').fadeIn();
      $(this).css('border', '12px solid #88ff4c');
      $('#image').addClass('correct');
    } else {
      //animation
      setAnalitics(kd84bd0.ec3sx, assert = false,true,false)
      const $elemento = $(this);
      $elemento.css("animation", "shake 0.2s");
      setTimeout(function () {
        $elemento.css("animation", "");
        
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

  $("#zx7uj2r").click(function () {
    if (zQlnx2 == 0){
      return
    }
    if (localStorage.getItem("td-uwc") !== null) {
      var string = localStorage.getItem("td-uwc")

      times = string.split(',')[0]
      storedTime = string.split(',')[1]
      //console.log(times)
      const HoursInMillis = 2 * 60 * 60 * 1000;

      if (Date.now() - storedTime >= HoursInMillis) {
        zmidr4 = 0
        times = 0
        localStorage.setItem('td-uwc', `${zmidr4},${Date.now()}`);
      } else {

      }
      if (times > 18) {
        alert(languages[currentLanguage].toManyWC)
        return;
      }
    }
    if (zQlnx2 >= 1) {
      if (x8dlH61) {
        return
      }
      $(`.actions-container #${kd84bd0.wjz2sr}`).addClass('first')
      zQlnx2--
      zmidr4++
      localStorage.setItem('td-uwc', `${zmidr4},${Date.now()}`);
      sound('v1i89uo45w/audio/wildcard.mp3');
      if (zQlnx2 == 0) {
        $('#zx7uj2r').css('opacity', '.4')
      }
      x8dlH61 = true
      $('#6v0sd4').text(' ('+zQlnx2+")")
      $('#zx7uj2r').fadeOut()
    }
    
  });

  $('.restart').click(function () {
    score = 0
    exitIndex = 0
    stepIndex = 1
    x8dlH61 = false
    zQlnx2  = 3;
    $('#6v0sd4').text(' ('+zQlnx2+")")
    $('#zx7uj2r').css('opacity', '1')

    $('.go').removeClass('first')
    $('#steps').text(`${stepIndex} / ${zsf4ns9g4}`)
    stopMusic()
    sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    $('.score').text(getScoreLabel());
    hgb9qyz.forEach(obj => obj.viewed = false);
    zsf4ns9g4--
    let defaultImage = hgb9qyz.find(item => item.ec3sx == 82)
    xpz1t9k = setArray(hgb9qyz, zsf4ns9g4)
    defaultImage.viewed = true
    kd84bd0 = defaultImage
    xpz1t9k.push(defaultImage)
    zsf4ns9g4++
    $('#image').attr('src', null)
    isLocal ? $('#image').attr('src', `v1i89uo45w/${defaultImage.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/${defaultImage.ec3sx}.${ext}`)
    setAnalitics(kd84bd0.ec3sx,false,false,false)
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
    } else {
      musicOn = true
      sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true);
    }
  });

  $('#start').click(function () {
    if (!gameStarted) {
      gameStarted = true
      sound(`v1i89uo45w/audio/music${getMusicSoundRandom()}.mp3`, 1000, 1, true); 
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
  
});

// !
// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });

function next() {
  sound('v1i89uo45w/audio/next.mp3');
  $('#next').fadeOut();
  //correct = null;
  wr5kj = -1;
  x8dlH61 = false
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
  $("#zx7uj2r").fadeIn()

  let unseen = xpz1t9k.filter(obj => obj.level == 0 && obj.viewed === false);

  if (unseen.length == 0) {
    unseen = xpz1t9k.filter(obj => obj.level == 1 && obj.viewed === false);
  }
  if (unseen.length == 0) {
    unseen = xpz1t9k.filter(obj => obj.level == 2 && obj.viewed === false);
  }

  if (unseen.length > 0) {
    // alert(unseen.length)
    let randomIndex = Math.floor(Math.random() * unseen.length);
    let nextImage = unseen[randomIndex].ec3sx;
    kd84bd0 = xpz1t9k.find(item => item.ec3sx == nextImage)
    kd84bd0.viewed = true;

    $('.gallery-item-animation').addClass('fade-out')
    setTimeout(() => {
      setTimeout(() => {
        $('.gallery-item-animation').removeClass('fade-out');
      }, 250);
      $('#image').attr('src', null)
      isLocal ? $('#image').attr('src', `v1i89uo45w/${kd84bd0.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/${kd84bd0.ec3sx}.${ext}`)
      setAnalitics(kd84bd0.ec3sx,false,false,false)
    }, 250);

    if (kd84bd0.ia_generated) {
      $('.ia-tag').fadeIn();
    }

  } else {
    stopMusic()
    $(".game").hide()
    if (score == 100) {
      setAnalitics(kd84bd0.ec3sx,false,false,false,true,true)
      let seconds = 20;
      $("#end").show()
      $('#end').contents().filter(function () {
        return this.nodeType === 3;
      }).first().replaceWith(`${languages[currentLanguage].successMessage}`);
      $('#count').text(seconds)
      $('.suceess-image').show()
      $('.suceess-image').addClass('fade-out')
      const intervalo = setInterval(() => {
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
      setAnalitics(kd84bd0.ec3sx,false,false,false,true,false)
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
  $('#imageex').attr('src', `v1i89uo45w/${hgb9qyz[stepIndex-1].ec3sx}.${ext}`)
  $('#imageex1').attr('src', `v1i89uo45w/n${hgb9qyz[stepIndex-1].ec3sx}.${ext}`)
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

function setArray(xpz1t9k, limit) {
  const result = [];
  const selecteds = new Set();
  while (result.length < limit) {
    const randomIndex = Math.floor(Math.random() * xpz1t9k.length);
    if (!selecteds.has(randomIndex)) {
      selecteds.add(randomIndex);
      result.push(xpz1t9k[randomIndex]);
    }
  }
  return result;
}

function get() {

}

function selectTabN() {
  $('#nd').addClass('active')
  $('#nm').removeClass('active')
  isLocal ? $('#image').attr('src', `v1i89uo45w/n${kd84bd0.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/n${kd84bd0.ec3sx}.${ext}`)
}

function selectTabNm() {
  $('#nd').removeClass('active')
  $('#nm').addClass('active')
  isLocal ? $('#image').attr('src', `v1i89uo45w/${kd84bd0.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/${kd84bd0.ec3sx}.${ext}`)
}

function sound(path, loops = 1, volume = 1, isMusic = false) {
  if (musicOn == false) {
    stopMusic();
    return
  }
  $(".musicswitch").show()
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

function setAnalitics(kd84bd0,assert,fail,nd,match,wmatch){
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
  if (!analitics.seenimages.includes(kd84bd0) && !nd) {
    analitics.seenimages.push(kd84bd0)
  }
  if (!analitics.seennimages.includes(kd84bd0) && nd) {
    analitics.seennimages.push(kd84bd0)
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
  $('#seenimagesx').text(analitics.seenimages.length + ' de '+ (hgb9qyz.length + u4qhgfty2))
  $('#seennimagesx').text(analitics.seennimages.length + ' de '+ (hgb9qyz.length + u4qhgfty2))
}


// Detectamos cambios en la visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopMusic()
    }
});

window.addEventListener('focus', () => {
  if (musicOn) {
    if (music) {
      music.play()
    }
  }
});

const languages = {
  es: {
    name: "TiddyPink",
    next: "Siguiente",
    restart: "Volver a intentarlo ",
    zx7uj2r: "Usar un comodín", // wildcard element
    toManyWC: "Usaste demasiados comodines recientemente, debes esperar para utilizar más. :)",
    exit: "Salir",
    loading: 'Cargando...',
    purchase: "Obtener todas las imágenes",
    purchase1: "Obtener todas las imágenes",
    modal_title: "Debes continuar solamente si eres mayor de 18 años.",
    modal_purchase_title: "Obtener todas las imágenes:",
    modal_content: "Puedes obtener todas las imágenes, en versión vestida y en versión desnuda, a través de estas dos opciones:",
    total_text: 'Total de imágenes: ',
    acept: "Continuar",
    ia_tag: "Generada por IA",
    footer: "Todos los derechos reservados - © TiddyPink 2024",
    score: "Puntuación: ",
    musicOn: "Música",
    MusicOff: "Música",
    home: "Jugar",
    nm: "Vestir",
    nd: "Desnudar",
    howto: "Cómo jugar",
    more: "Saber más",
    analitics: "Mis estadísticas",
    statslabel: "Mis estadísticas:",
    end: "Has fallado estrepitosamente. Tu puntuación ha sido de:",
    matches: "Partidas jugadas: ",
    wmatches: "Partidas ganadas: ",
    corrects: "Aciertos totales: ",
    mistakes: "Fallos totales: ",
    seenimages: "Chicas vestidas vistas: ",
    seennimages: "Chicas desnudas vistas: ",
    titlehowto: "Cómo jugar:",
    texthowto: "Adivina el color del pezón de la chica entre 6 opciones. Si aciertas, verás a la chica desnuda; si fallas, pasas a la siguiente imagen. La primera ronda te mostrará la opción correcta, luego sigues solo. A medida que avanzas, las imágenes serán más explícitas, y con puntuación perfecta, habrá una sorpresa especial.",
    start: "¡Empezar ya!",
    moretitle: "Puedes obtener todas las imágenes de este juego 😈",
    successMessage: "Increíble, has acertado todas las imágenes 😳 Tengo un premio para ti 🥵 Aparecerá en: ",
    exitMessage: [
      "Este botón no hace nada :v",
      "Te dije que este botón no hace nada.",
      "Por favor escúchame. Este botón no hace nada",
      "(El botón sigue sin hacer nada *)",
      "Este botón sigue sin hacer nada, como tu ex.",
      "Pulsa con cuidado, este botón tiene baja autoestima.",
      "Este botón está como los sentimientos de ella, vacío...",
      "Por cada vez que pulses este botón, muere un gatito en el mundo.",
      "Este botón tiene sentimientos y están a punto de romperse.",
      "Este botón está aquí solo para decorar.",
      "Si pulsas de nuevo el botón eres g4y.",
      "Lo suponía...",
      "La inteligencia te persigue, pero vas más rápido.",
      "La perdí cuando más la amaba.",
      "Messirve...",
      "Recuerda que tienes cosas importantes que hacer uwu.",
      "Siiuuuuuuuu.",
      "Cada clic en este botón es un recordatorio de que nada es para siempre.",
      "Gracias por tu valioso tiempo, pero sigue sin pasar nada.",
      "Por favor, busca la felicidad en otro lugar.",
      "Pulsa de nuevo para perder un segundo más de tu vida.",
      "Lo que no rompe a este botón lo hace más fuerte.",
      "Este botón promete no hacer nada, y cumple.",
      "Este botón es tan útil como un paraguas en el desierto.",
      "Este botón tiene metas, pero dice que empieza mañana.",
      "A veces hay que aceptar que no todo es como uno quiere.",
      "Este botón no está roto, simplemente no hace nada.",
      "Veo que te gusta sentirte ignorado digitalmente.",
      "Este botón se siente halagado... pero sigue sin hacer nada.",
      "En el mundo siguen pasando cosas mientras sigues empeñado en esto...",
      "Nada cambia... todo permanece igual...",
      "Este botón no hace nada, pero tú sigues teniendo la fe.",
      "Cada clic es una pequeña victoria.",
      "Se produjeron 0 resultados.",
      "Hay personas que son lentas de entender.",
      "Este botón no hace nada, pero eso, tú ya lo sabías.",
      "Este botón por la mañana no hace nada y por la tarde descansa.",
      "Este botón está más vacío que tu cuenta bancaria.",
      "Este botón está más ausente que el amor de ella.",
      "Este botón está más perdido que tu teléfono cuando lo dejas en silencio.",
      "Este botón está más roto que tus promesas de año nuevo.",
      "Este botón está más estancado que tu progreso con ella.",
      "Este botón está más vacío que tu inbox.",
      "Este botón necesita su espacio...",
      "Este botón está más tenso que tú cuando alguien coge tu teléfono.",
      "Este botón se está poniendo incómodo.",
      "Este botón está más vacío que tu chat con la que te gusta.",
      "Ni lo intentes.",
      "Mejor suerte la próxima vez.",
      "No te preocupes, lo harás bien.",
      "No te asustes, solo déjate llevar.",
      "Bien hecho, ¿te atreves a hacerlo de nuevo?",
      "Prometo que este botón nunca hará nada.",
      "No te preocupes, este botón también está vacío por dentro.",
      "Hay apoyo, lo que falta es talento.",
      "Este botón es como la que te gusta, no responde.",
      "Mírate... no estás consciente y sigues empeñado en mostrar al mundo lo que puedes hacer... y ya lo has demostrado.",
      "Incluso el más fuerte de los oponentes siempre tiene una debilidad.",
      "A nadie le importaba quién fuera hasta que me puse una máscara.",
      "Todos los esfuerzos son inútiles si no crees en ti mismo."
    ]
  },
  en: {
    name: "TiddyPink",
    next: "Next",
    restart: "Try Again",
    zx7uj2r: "Use a wildcard", // wildcard element
    toManyWC: "You used too many wildcards recently, you need to wait before using more. :)",
    exit: "Exit",
    loading: "Loading...",
    purchase: "Get all images",
    purchase1: "Get all images",
    modal_title: "You must proceed only if you are over 18 years old.",
    modal_purchase_title: "Get all images:",
    modal_content: "You can get all the images, in dressed and nude versions, through these two options:",
    total_text: "Total images: ",
    acept: "Continue",
    ia_tag: "AI Generated",
    footer: "All rights reserved - © TiddyPink 2024",
    score: "Score: ",
    musicOn: "Music",
    MusicOff: "Music",
    home: "Play",
    nm: "Dress",
    nd: "Undress",
    howto: "How to play",
    more: "Learn more",
    analitics: "My stats",
    statslabel: "My stats:",
    end: "You failed miserably. Your score was:",
    matches: "Games played: ",
    wmatches: "Games won: ",
    corrects: "Total correct answers: ",
    mistakes: "Total mistakes: ",
    seenimages: "Dressed girls seen: ",
    seennimages: "Nude girls seen: ",
    titlehowto: "How to play:",
    texthowto: "Guess the color of the girl's nipple from 6 options. If you guess right, you'll see the girl naked; if you guess wrong, you'll move to the next image. The first round will show you the correct option, then you're on your own. As you progress, the images become more explicit, and with a perfect score, there will be a special surprise.",
    start: "Start now!",
    moretitle: "You can get all the images in this game 😈",
    successMessage: "Amazing, you guessed all the images 😳 I have a prize for you 🥵 It will appear in: ",
    exitMessage: [
      "This button does nothing :v",
      "I told you this button does nothing.",
      "Please listen to me. This button does nothing.",
      "(The button still does nothing *)",
      "This button does nothing, like your ex.",
      "Click carefully, this button has low self-esteem.",
      "This button is like her feelings, empty...",
      "Every time you click this button, a kitten dies somewhere in the world.",
      "This button has feelings, and they're about to break.",
      "This button is just here for decoration.",
      "If you click this button again, you're g4y.",
      "I knew it...",
      "Intelligence chases you, but you run faster.",
      "I lost her when I loved her the most.",
      "Remember you have important things to do uwu.",
      "Every click on this button is a reminder that nothing lasts forever.",
      "Thanks for your valuable time, but still, nothing happens.",
      "Please, seek happiness elsewhere.",
      "Click again to waste another second of your life.",
      "What doesn't break this button makes it stronger.",
      "This button promises to do nothing, and it keeps its promise.",
      "This button is as useful as an umbrella in the desert.",
      "This button has goals, but says it will start tomorrow.",
      "Sometimes you just have to accept that not everything goes your way.",
      "This button isn't broken; it just doesn't do anything.",
      "I see you like being digitally ignored.",
      "This button feels flattered... but still does nothing.",
      "The world keeps turning while you keep insisting on this...",
      "Nothing changes... everything remains the same...",
      "This button does nothing, but you still have faith.",
      "Every click is a small victory.",
      "0 results were found.",
      "Some people are slow to understand.",
      "This button does nothing, but you already knew that.",
      "This button does nothing in the morning and rests in the afternoon.",
      "This button is emptier than your bank account.",
      "This button is more absent than her love.",
      "This button is more lost than your phone on silent mode.",
      "This button is more broken than your New Year's resolutions.",
      "This button is more stuck than your progress with her.",
      "This button is emptier than your inbox.",
      "This button needs its space...",
      "This button is tenser than you when someone grabs your phone.",
      "This button is getting uncomfortable.",
      "This button is emptier than your chat with the girl you like.",
      "Don't even try.",
      "Better luck next time.",
      "Don't worry, you'll do fine.",
      "Don't panic, just go with the flow.",
      "Well done, dare to do it again?",
      "I promise this button will never do anything.",
      "Don't worry, this button is also empty inside.",
      "There is support; what's missing is talent.",
      "This button is like the girl you like, it doesn't respond.",
      "Look at yourself... you are unaware and still determined to show the world what you can do... and you've already shown it.",
      "Even the strongest opponents always have a weakness.",
      "Nobody cared who I was until I put on the mask.",
      "All efforts are useless if you don't believe in yourself."
    ]
  },
  fr: {
    name: "TiddyPink",
    next: "Suivant",
    restart: "Réessayer",
    zx7uj2r: "Utiliser un joker", // élément wildcard
    toManyWC: "Vous avez utilisé trop de jokers récemment, vous devez attendre avant d'en utiliser d'autres. :)",
    exit: "Quitter",
    loading: "Chargement...",
    purchase: "Obtenir toutes les images",
    purchase1: "Obtenir toutes les images",
    modal_title: "Vous devez continuer uniquement si vous avez plus de 18 ans.",
    modal_purchase_title: "Obtenez toutes les images :",
    modal_content: "Vous pouvez obtenir toutes les images, en version habillée et déshabillée, via ces deux options :",
    total_text: "Nombre total d'images : ",
    acept: "Continuer",
    ia_tag: "Généré par IA",
    footer: "Tous droits réservés - © TiddyPink 2024",
    score: "Score : ",
    musicOn: "Musique",
    MusicOff: "Musique",
    home: "Jouer",
    nm: "Habiller",
    nd: "Déshabiller",
    howto: "Comment jouer",
    more: "En savoir plus",
    analitics: "Mes statistiques",
    statslabel: "Mes statistiques :",
    end: "Vous avez échoué lamentablement. Votre score est de :",
    matches: "Parties jouées : ",
    wmatches: "Parties gagnées : ",
    corrects: "Réponses correctes totales : ",
    mistakes: "Erreurs totales : ",
    seenimages: "Filles habillées vues : ",
    seennimages: "Filles déshabillées vues : ",
    titlehowto: "Comment jouer :",
    texthowto: "Devinez la couleur du téton de la fille parmi 6 options. Si vous devinez juste, vous verrez la fille nue ; sinon, vous passerez à l'image suivante. La première manche vous montrera l'option correcte, ensuite vous serez seul. Au fur et à mesure, les images deviennent plus explicites, et avec un score parfait, il y aura une surprise spéciale.",
    start: "Commencez maintenant !",
    moretitle: "Vous pouvez obtenir toutes les images de ce jeu 😈",
    successMessage: "Incroyable, vous avez deviné toutes les images 😳 J'ai un prix pour vous 🥵 Il apparaîtra dans : ",
    exitMessage: [
      "Ce bouton ne fait rien :v",
      "Je vous ai dit que ce bouton ne fait rien.",
      "S'il vous plaît, écoutez-moi. Ce bouton ne fait rien.",
      "(Le bouton ne fait toujours rien *)",
      "Ce bouton ne fait rien, comme votre ex.",
      "Cliquez prudemment, ce bouton a une faible estime de soi.",
      "Ce bouton est comme ses sentiments, vide...",
      "Chaque fois que vous cliquez sur ce bouton, un chaton meurt quelque part dans le monde.",
      "Ce bouton a des sentiments, et ils sont sur le point de se briser.",
      "Ce bouton est juste là pour décorer.",
      "Si vous cliquez à nouveau sur ce bouton, vous êtes g4y.",
      "Je le savais...",
      "L'intelligence vous poursuit, mais vous allez plus vite.",
      "Je l'ai perdue quand je l'aimais le plus.",
      "Rappelez-vous que vous avez des choses importantes à faire uwu.",
      "Chaque clic sur ce bouton est un rappel que rien ne dure éternellement.",
      "Merci pour votre temps précieux, mais toujours, rien ne se passe.",
      "S'il vous plaît, cherchez le bonheur ailleurs.",
      "Cliquez à nouveau pour perdre une seconde de plus de votre vie.",
      "Ce qui ne brise pas ce bouton le rend plus fort.",
      "Ce bouton promet de ne rien faire, et il tient sa promesse.",
      "Ce bouton est aussi utile qu'un parapluie dans le désert.",
      "Ce bouton a des objectifs, mais dit qu'il commencera demain.",
      "Parfois, vous devez accepter que tout ne se passe pas comme prévu.",
      "Ce bouton n'est pas cassé, il ne fait simplement rien.",
      "Je vois que vous aimez être ignoré numériquement.",
      "Ce bouton se sent flatté... mais ne fait toujours rien.",
      "Le monde continue de tourner pendant que vous insistez là-dessus...",
      "Rien ne change... tout reste pareil...",
      "Ce bouton ne fait rien, mais vous gardez la foi.",
      "Chaque clic est une petite victoire.",
      "0 résultats trouvés.",
      "Certaines personnes comprennent lentement.",
      "Ce bouton ne fait rien, mais vous le saviez déjà.",
      "Ce bouton ne fait rien le matin et se repose l'après-midi.",
      "Ce bouton est plus vide que votre compte bancaire.",
      "Ce bouton est plus absent que son amour.",
      "Ce bouton est plus perdu que votre téléphone en mode silencieux.",
      "Ce bouton est plus cassé que vos résolutions du Nouvel An.",
      "Ce bouton est plus bloqué que votre progrès avec elle.",
      "Ce bouton est plus vide que votre boîte de réception.",
      "Ce bouton a besoin d'espace...",
      "Ce bouton est plus tendu que vous lorsque quelqu'un prend votre téléphone.",
      "Ce bouton devient inconfortable.",
      "Ce bouton est plus vide que votre chat avec la fille que vous aimez.",
      "N'essayez même pas.",
      "Bonne chance la prochaine fois.",
      "Ne vous inquiétez pas, vous y arriverez.",
      "Ne paniquez pas, laissez-vous simplement aller.",
      "Bien joué, oserez-vous recommencer ?",
      "Je promets que ce bouton ne fera jamais rien.",
      "Ne vous inquiétez pas, ce bouton est également vide à l'intérieur.",
      "Il y a du soutien, ce qui manque, c'est du talent.",
      "Ce bouton est comme la fille que vous aimez, il ne répond pas.",
      "Regardez-vous... vous êtes inconscient et vous êtes toujours déterminé à montrer au monde ce que vous pouvez faire... et vous l'avez déjà montré.",
      "Même les adversaires les plus forts ont toujours une faiblesse.",
      "Personne ne se souciait de qui j'étais jusqu'à ce que je mette le masque.",
      "Tous les efforts sont inutiles si vous ne croyez pas en vous."
    ]
  },
  ko: {
    name: "TiddyPink",
    next: "다음",
    restart: "다시 시도하기",
    zx7uj2r: "와일드카드 사용", // 와일드카드 요소
    toManyWC: "최근에 너무 많은 와일드카드를 사용했습니다. 더 사용하려면 기다려야 합니다. :)",
    exit: "나가기",
    loading: "로딩 중...",
    purchase: "모든 이미지를 얻기",
    purchase1: "모든 이미지를 얻기",
    modal_title: "18세 이상만 계속할 수 있습니다.",
    modal_purchase_title: "모든 이미지를 얻으세요:",
    modal_content: "모든 이미지를 의상 버전과 누드 버전으로 두 가지 옵션을 통해 얻을 수 있습니다:",
    total_text: "총 이미지 수: ",
    acept: "계속",
    ia_tag: "AI 생성",
    footer: "모든 권리 보유 - © TiddyPink 2024",
    score: "점수: ",
    musicOn: "음악",
    MusicOff: "음악",
    home: "게임 시작",
    nm: "옷 입히기",
    nd: "옷 벗기기",
    howto: "게임 방법",
    more: "더 알아보기",
    analitics: "내 통계",
    statslabel: "내 통계:",
    end: "완전히 실패했습니다. 당신의 점수는:",
    matches: "플레이한 게임 수: ",
    wmatches: "승리한 게임 수: ",
    corrects: "총 정답 수: ",
    mistakes: "총 오답 수: ",
    seenimages: "본 의상 이미지: ",
    seennimages: "본 누드 이미지: ",
    titlehowto: "게임 방법:",
    texthowto: "6가지 옵션 중에서 소녀의 유두 색상을 맞춰보세요. 맞추면 소녀의 누드 이미지를 볼 수 있고, 틀리면 다음 이미지로 넘어갑니다. 첫 번째 라운드에서는 정답이 표시되며, 이후에는 스스로 진행해야 합니다. 진행할수록 이미지는 더 노골적이 되며, 완벽한 점수를 얻으면 특별한 보상이 있습니다.",
    start: "지금 시작!",
    moretitle: "이 게임의 모든 이미지를 얻을 수 있습니다 😈",
    successMessage: "대단해요! 모든 이미지를 맞췄어요 😳 당신을 위한 보상이 있습니다 🥵 나타날 시간: ",
    exitMessage: [
      "이 버튼은 아무것도 하지 않습니다 :v",
      "이 버튼이 아무것도 하지 않는다고 했잖아요.",
      "제발 제 말을 들어주세요. 이 버튼은 아무것도 하지 않아요.",
      "(이 버튼은 여전히 아무것도 하지 않음 *)",
      "이 버튼은 당신의 전 애인처럼 아무것도 하지 않습니다.",
      "조심스럽게 클릭하세요. 이 버튼은 자신감이 낮습니다.",
      "이 버튼은 그녀의 감정처럼 비어 있습니다...",
      "이 버튼을 클릭할 때마다 고양이가 죽습니다.",
      "이 버튼은 감정이 있고, 지금 상처받으려 합니다.",
      "이 버튼은 그냥 장식입니다.",
      "다시 클릭하면 당신은 g4y입니다.",
      "알고 있었습니다...",
      "지능이 당신을 따라오지만, 당신이 더 빠릅니다.",
      "가장 사랑했을 때 그녀를 잃었습니다.",
      "Messirve...",
      "중요한 일이 있다는 것을 기억하세요 uwu.",
      "Siiuuuuuuuu.",
      "이 버튼을 클릭할 때마다 영원한 것은 없다는 사실을 상기시킵니다.",
      "소중한 시간을 내 주셔서 감사합니다. 하지만 여전히 아무 일도 일어나지 않습니다.",
      "다른 곳에서 행복을 찾으세요.",
      "다시 클릭하면 당신의 삶에서 또 1초가 사라집니다.",
      "이 버튼을 부수지 않는 것은 그것을 더 강하게 만듭니다.",
      "이 버튼은 아무것도 하지 않겠다고 약속하고 그 약속을 지킵니다.",
      "이 버튼은 사막에서 우산만큼 쓸모가 없습니다.",
      "이 버튼은 목표가 있지만, 내일부터 시작한다고 말합니다.",
      "때로는 모든 것이 원하는 대로 되지 않는다는 것을 받아들여야 합니다.",
      "이 버튼은 고장난 게 아니라, 그냥 아무것도 하지 않습니다.",
      "당신이 디지털 무시를 즐기는 것 같군요.",
      "이 버튼은 칭찬받는 것 같지만 여전히 아무것도 하지 않습니다.",
      "세상은 계속 돌아가고 있지만, 당신은 여전히 이 버튼에 집착하고 있습니다...",
      "아무것도 변하지 않습니다... 모든 것이 그대로입니다...",
      "이 버튼은 아무것도 하지 않지만, 당신은 여전히 믿고 있습니다.",
      "클릭할 때마다 작은 승리입니다.",
      "결과가 0개입니다.",
      "이해가 느린 사람들이 있습니다.",
      "이 버튼은 아무것도 하지 않지만, 당신은 이미 알고 있었습니다.",
      "이 버튼은 아침에 아무것도 하지 않고 오후에는 쉽니다.",
      "이 버튼은 당신의 은행 계좌처럼 비어 있습니다.",
      "이 버튼은 그녀의 사랑만큼 없습니다.",
      "이 버튼은 무음 상태에서 당신의 전화처럼 길을 잃었습니다.",
      "이 버튼은 새해 결심처럼 부서졌습니다.",
      "이 버튼은 그녀와의 진전처럼 정체되어 있습니다.",
      "이 버튼은 당신의 받은 편지함처럼 비어 있습니다.",
      "이 버튼은 공간이 필요합니다...",
      "이 버튼은 누군가 당신의 전화를 잡았을 때 당신보다 더 긴장합니다.",
      "이 버튼은 불편해지고 있습니다.",
      "이 버튼은 당신이 좋아하는 사람과의 채팅처럼 비어 있습니다.",
      "시도하지 마세요.",
      "다음 번엔 더 잘하세요.",
      "걱정하지 마세요. 잘 해낼 거예요.",
      "겁내지 마세요. 그냥 자신을 맡기세요.",
      "잘했어요. 다시 도전할 건가요?",
      "이 버튼은 절대 아무것도 하지 않을 것을 약속합니다.",
      "걱정하지 마세요. 이 버튼도 안쪽은 비어 있습니다.",
      "지원은 있지만, 재능이 부족합니다.",
      "이 버튼은 당신이 좋아하는 사람처럼 반응하지 않습니다.",
      "보세요... 당신은 무의식적이고, 여전히 세상에 보여주고 싶어 합니다... 그리고 이미 보여줬습니다.",
      "가장 강한 상대조차도 항상 약점이 있습니다.",
      "내가 마스크를 쓰기 전까지 아무도 내가 누구인지 신경 쓰지 않았습니다.",
      "자기 자신을 믿지 않으면 모든 노력은 쓸모가 없습니다."
    ]
  },
  de: {
    name: "TiddyPink",
    next: "Weiter",
    restart: "Nochmal versuchen",
    zx7uj2r: "Einen Joker verwenden", // Joker-Element
    toManyWC: "Du hast kürzlich zu viele Joker benutzt, du musst warten, bevor du weitere verwenden kannst. :)",
    exit: "Beenden",
    loading: "Lädt...",
    purchase: "Alle Bilder erhalten",
    purchase1: "Alle Bilder erhalten",
    modal_title: "Du darfst nur weitermachen, wenn du über 18 Jahre alt bist.",
    modal_purchase_title: "Alle Bilder erhalten:",
    modal_content: "Du kannst alle Bilder in bekleideter und nackter Version über diese beiden Optionen erhalten:",
    total_text: "Gesamtanzahl Bilder: ",
    acept: "Fortfahren",
    ia_tag: "Von KI generiert",
    footer: "Alle Rechte vorbehalten - © TiddyPink 2024",
    score: "Punktestand: ",
    musicOn: "Musik",
    MusicOff: "Musik",
    home: "Spielen",
    nm: "Anziehen",
    nd: "Ausziehen",
    howto: "Spielanleitung",
    more: "Mehr erfahren",
    analitics: "Meine Statistiken",
    statslabel: "Meine Statistiken:",
    end: "Du bist kläglich gescheitert. Dein Punktestand ist:",
    matches: "Gespielte Spiele: ",
    wmatches: "Gewonnene Spiele: ",
    corrects: "Gesamte richtige Antworten: ",
    mistakes: "Gesamte falsche Antworten: ",
    seenimages: "Gesehene bekleidete Mädchen: ",
    seennimages: "Gesehene nackte Mädchen: ",
    titlehowto: "Spielanleitung:",
    texthowto: "Errate die Farbe der Brustwarzen des Mädchens aus 6 Optionen. Wenn du richtig liegst, siehst du das Mädchen nackt; wenn du falsch liegst, geht es zum nächsten Bild. In der ersten Runde wird dir die richtige Antwort gezeigt, danach musst du alleine weitermachen. Je weiter du kommst, desto expliziter werden die Bilder, und bei perfekter Punktzahl gibt es eine besondere Überraschung.",
    start: "Jetzt starten!",
    moretitle: "Du kannst alle Bilder dieses Spiels erhalten 😈",
    successMessage: "Unglaublich, du hast alle Bilder richtig erraten 😳 Ich habe eine Belohnung für dich 🥵 Sie erscheint in: ",
    exitMessage: [
        "Dieser Button macht nichts :v",
        "Ich habe dir gesagt, dieser Button macht nichts.",
        "Bitte hör mir zu. Dieser Button macht nichts.",
        "(Der Button macht immer noch nichts *)",
        "Dieser Button tut genauso wenig wie dein Ex.",
        "Klick vorsichtig, dieser Button hat ein geringes Selbstwertgefühl.",
        "Dieser Button ist so leer wie ihre Gefühle...",
        "Jedes Mal, wenn du diesen Button drückst, stirbt irgendwo eine Katze.",
        "Dieser Button hat Gefühle und sie stehen kurz vor dem Zerbrechen.",
        "Dieser Button ist nur zur Dekoration da.",
        "Wenn du den Button nochmal drückst, bist du g4y.",
        "Ich habe es geahnt...",
        "Die Intelligenz verfolgt dich, aber du bist schneller.",
        "Ich habe sie verloren, als ich sie am meisten liebte.",
        "Messirve...",
        "Denk daran, dass du wichtige Dinge zu erledigen hast uwu.",
        "Siiuuuuuuuu.",
        "Jeder Klick auf diesen Button erinnert daran, dass nichts für immer ist.",
        "Danke für deine wertvolle Zeit, aber es passiert immer noch nichts.",
        "Bitte finde dein Glück woanders.",
        "Klick nochmal, um eine weitere Sekunde deines Lebens zu verlieren.",
        "Was diesen Button nicht bricht, macht ihn stärker.",
        "Dieser Button verspricht nichts zu tun, und er hält dieses Versprechen.",
        "Dieser Button ist so nützlich wie ein Regenschirm in der Wüste.",
        "Dieser Button hat Ziele, aber sagt, dass er morgen anfängt.",
        "Manchmal muss man akzeptieren, dass nicht alles so ist, wie man es möchte.",
        "Dieser Button ist nicht kaputt, er macht einfach nichts.",
        "Ich sehe, du genießt es, digital ignoriert zu werden.",
        "Dieser Button fühlt sich geschmeichelt... aber er macht immer noch nichts.",
        "Während du dich damit beschäftigst, geht die Welt weiter...",
        "Nichts ändert sich... alles bleibt gleich...",
        "Dieser Button macht nichts, aber du glaubst immer noch daran.",
        "Jeder Klick ist ein kleiner Sieg.",
        "Es wurden 0 Ergebnisse erzielt.",
        "Manche Menschen verstehen langsam.",
        "Dieser Button macht nichts, aber das wusstest du schon.",
        "Dieser Button macht morgens nichts und ruht sich nachmittags aus.",
        "Dieser Button ist so leer wie dein Bankkonto.",
        "Dieser Button ist so abwesend wie ihre Liebe.",
        "Dieser Button ist so verloren wie dein Telefon im Lautlosmodus.",
        "Dieser Button ist so kaputt wie deine Neujahrsvorsätze.",
        "Dieser Button ist so festgefahren wie dein Fortschritt mit ihr.",
        "Dieser Button ist so leer wie dein Posteingang.",
        "Dieser Button braucht seinen Raum...",
        "Dieser Button ist angespannter als du, wenn jemand dein Telefon nimmt.",
        "Dieser Button fühlt sich unwohl.",
        "Dieser Button ist so leer wie dein Chat mit der, die dir gefällt.",
        "Versuch es gar nicht.",
        "Mehr Glück beim nächsten Mal.",
        "Mach dir keine Sorgen, du wirst es gut machen.",
        "Keine Angst, lass dich einfach treiben.",
        "Gut gemacht, wagst du es nochmal?",
        "Ich verspreche, dieser Button wird niemals etwas tun.",
        "Mach dir keine Sorgen, auch dieser Button ist innerlich leer.",
        "Es gibt Unterstützung, es fehlt nur das Talent.",
        "Dieser Button reagiert nicht, genau wie die, die dir gefällt.",
        "Schau dich an... du bist dir dessen nicht bewusst und möchtest der Welt zeigen, was du kannst... und das hast du bereits bewiesen.",
        "Auch der stärkste Gegner hat immer eine Schwachstelle.",
        "Niemand hat sich dafür interessiert, wer ich war, bis ich eine Maske trug.",
        "Alle Anstrengungen sind nutzlos, wenn du nicht an dich selbst glaubst."
    ]
  },
  ja: {
    name: "TiddyPink",
    next: "次へ",
    restart: "もう一度やり直す",
    zx7uj2r: "ワイルドカードを使う", // ワイルドカード要素
    toManyWC: "最近ワイルドカードを使いすぎました。これ以上使うには待つ必要があります。 :)",
    exit: "終了",
    loading: "読み込み中...",
    purchase: "すべての画像を取得する",
    purchase1: "すべての画像を取得する",
    modal_title: "18歳以上の場合のみ続行してください。",
    modal_purchase_title: "すべての画像を取得する:",
    modal_content: "服を着たバージョンと裸のバージョン、両方の画像を以下のオプションで取得できます:",
    total_text: "画像の合計: ",
    acept: "続行",
    ia_tag: "AIによる生成",
    footer: "全著作権所有 - © TiddyPink 2024",
    score: "スコア: ",
    musicOn: "音楽",
    MusicOff: "音楽",
    home: "プレイ",
    nm: "服を着せる",
    nd: "服を脱がせる",
    howto: "遊び方",
    more: "さらに詳しく",
    analitics: "自分の統計",
    statslabel: "自分の統計:",
    end: "あなたは惨敗しました。スコアは次の通りです:",
    matches: "プレイしたゲーム: ",
    wmatches: "勝利したゲーム: ",
    corrects: "総正解数: ",
    mistakes: "総間違い数: ",
    seenimages: "見た服を着た女の子: ",
    seennimages: "見た裸の女の子: ",
    titlehowto: "遊び方:",
    texthowto: "6つの選択肢から女の子の乳首の色を当ててください。正解すれば女の子の裸を見ることができ、不正解なら次の画像に進みます。最初のラウンドでは正しい選択肢が表示されますが、その後は自分で挑戦します。進むにつれて画像はより露骨になり、完璧なスコアを達成すると特別なサプライズがあります。",
    start: "今すぐ始める！",
    moretitle: "このゲームのすべての画像を手に入れることができます 😈",
    successMessage: "素晴らしい！すべての画像を正解しました 😳 ご褒美があります 🥵 現れるまで: ",
    exitMessage: [
        "このボタンは何もしません :v",
        "言ったでしょ、このボタンは何もしないって。",
        "お願い、聞いて。このボタンは何もしない。",
        "（このボタンはまだ何もしません *)",
        "このボタンはあなたの元恋人のように何もしません。",
        "気をつけてクリックしてください。このボタンは自信が低いです。",
        "このボタンは彼女の気持ちのように空っぽです...",
        "このボタンをクリックするたびに、世界のどこかで猫が死にます。",
        "このボタンには感情があり、今壊れそうです。",
        "このボタンはただ飾りです。",
        "もう一度押すとあなたはゲイです。",
        "そうだと思った...",
        "知性はあなたを追いかけますが、あなたの方が速いです。",
        "最も愛していたときに彼女を失いました。",
        "メッシサーブ...",
        "大切なことをするのを忘れないでください uwu。",
        "シューーーー！",
        "このボタンをクリックするたびに、何も永遠ではないことを思い出します。",
        "貴重な時間をありがとう、でも何も起こりません。",
        "どうか他の場所で幸せを見つけてください。",
        "もう一度クリックすると人生の1秒を失います。",
        "このボタンを壊さないものが、このボタンを強くします。",
        "このボタンは何もしないと約束し、その約束を守ります。",
        "このボタンは砂漠の中の傘のように役に立たないです。",
        "このボタンには目標がありますが、明日から始めると言っています。",
        "時にはすべてが思い通りにならないことを受け入れる必要があります。",
        "このボタンは壊れていません。ただ何もしません。",
        "あなたがデジタルで無視されるのを楽しんでいるのが見えます。",
        "このボタンは感謝しています...でも何もしません。",
        "あなたがこれに固執している間に、世界は続いています...",
        "何も変わらない...すべては同じまま...",
        "このボタンは何もしませんが、あなたはまだ信じています。",
        "クリックするたびに小さな勝利です。",
        "結果は0です。",
        "理解が遅い人もいます。",
        "このボタンは何もしませんが、それはあなたも知っていました。",
        "このボタンは朝は何もしなくて、午後は休みます。",
        "このボタンはあなたの銀行口座のように空っぽです。",
        "このボタンは彼女の愛のように不在です。",
        "このボタンは無音モードで置いたあなたの電話のように迷子です。",
        "このボタンはあなたの新年の約束のように壊れています。",
        "このボタンは彼女との進歩のように停滞しています。",
        "このボタンはあなたの受信トレイのように空っぽです。",
        "このボタンには自分のスペースが必要です...",
        "このボタンは誰かがあなたの電話を取るときのあなたよりも緊張しています。",
        "このボタンは居心地が悪くなっています。",
        "このボタンはあなたが好きな子とのチャットのように空っぽです。",
        "試すだけ無駄です。",
        "次回の幸運を祈ります。",
        "心配しないで、きっとうまくいきます。",
        "怖がらずにただ身を任せてください。",
        "よくできました。もう一度挑戦しますか？",
        "このボタンは決して何もしないと約束します。",
        "心配しないでください。このボタンも内側は空っぽです。",
        "サポートはありますが、才能が足りません。",
        "このボタンは好きな子のように反応しません。",
        "見てみて...無意識に世界にあなたができることを見せようとしています...そしてそれをもう証明しました。",
        "最も強い対戦相手にも必ず弱点があります。",
        "マスクをつけるまで誰も私に興味を持ちませんでした。",
        "自分を信じない限り、すべての努力は無駄です。"
    ]
  },
  pt: {
    name: "TiddyPink",
    next: "Próximo",
    restart: "Tentar novamente",
    zx7uj2r: "Usar um coringa", // elemento coringa
    toManyWC: "Você usou muitos curingas recentemente, precisa esperar antes de usar mais. :)",
    exit: "Sair",
    loading: "Carregando...",
    purchase: "Obter todas as imagens",
    purchase1: "Obter todas as imagens",
    modal_title: "Você deve continuar apenas se for maior de 18 anos.",
    modal_purchase_title: "Obter todas as imagens:",
    modal_content: "Você pode obter todas as imagens, tanto na versão vestida quanto na versão nua, através dessas duas opções:",
    total_text: "Total de imagens: ",
    acept: "Continuar",
    ia_tag: "Gerado por IA",
    footer: "Todos os direitos reservados - © TiddyPink 2024",
    score: "Pontuação: ",
    musicOn: "Música",
    MusicOff: "Música",
    home: "Jogar",
    nm: "Vestir",
    nd: "Despir",
    howto: "Como jogar",
    more: "Saber mais",
    analitics: "Minhas estatísticas",
    statslabel: "Minhas estatísticas:",
    end: "Você falhou estrepitosamente. Sua pontuação foi:",
    matches: "Partidas jogadas: ",
    wmatches: "Partidas vencidas: ",
    corrects: "Acertos totais: ",
    mistakes: "Erros totais: ",
    seenimages: "Meninas vestidas vistas: ",
    seennimages: "Meninas nuas vistas: ",
    titlehowto: "Como jogar:",
    texthowto: "Adivinhe a cor do mamilo da menina entre 6 opções. Se acertar, verá a menina nua; se errar, passará para a próxima imagem. A primeira rodada mostrará a opção correta, depois você segue sozinho. À medida que avança, as imagens serão mais explícitas, e com uma pontuação perfeita, haverá uma surpresa especial.",
    start: "Começar agora!",
    moretitle: "Você pode obter todas as imagens deste jogo 😈",
    successMessage: "Incrível, você acertou todas as imagens 😳 Tenho um prêmio para você 🥵 Aparecerá em: ",
    exitMessage: [
        "Este botão não faz nada :v",
        "Eu te disse que esse botão não faz nada.",
        "Por favor, me ouça. Este botão não faz nada.",
        "(O botão ainda não faz nada *)",
        "Este botão continua não fazendo nada, como seu ex.",
        "Clique com cuidado, esse botão tem baixa autoestima.",
        "Este botão está como os sentimentos dela, vazio...",
        "Cada vez que você clicar neste botão, um gatinho morre em algum lugar.",
        "Este botão tem sentimentos e eles estão prestes a se quebrar.",
        "Este botão está aqui apenas para decorar.",
        "Se clicar novamente, você é g4y.",
        "Eu sabia...",
        "A inteligência te persegue, mas você é mais rápido.",
        "Eu a perdi quando mais a amava.",
        "Messirve...",
        "Lembre-se de que você tem coisas importantes para fazer uwu.",
        "Siiuuuuuuuu.",
        "Cada clique neste botão é um lembrete de que nada é para sempre.",
        "Obrigado pelo seu precioso tempo, mas ainda não aconteceu nada.",
        "Por favor, procure felicidade em outro lugar.",
        "Clique novamente para perder mais um segundo da sua vida.",
        "O que não destrói esse botão, o torna mais forte.",
        "Esse botão promete não fazer nada, e cumpre.",
        "Esse botão é tão útil quanto um guarda-chuva no deserto.",
        "Esse botão tem metas, mas diz que começa amanhã.",
        "Às vezes é preciso aceitar que nem tudo é como a gente quer.",
        "Esse botão não está quebrado, ele simplesmente não faz nada.",
        "Vejo que você gosta de se sentir ignorado digitalmente.",
        "Esse botão se sente lisonjeado... mas continua não fazendo nada.",
        "Enquanto você insiste nisso, o mundo continua acontecendo...",
        "Nada muda... tudo fica igual...",
        "Esse botão não faz nada, mas você ainda acredita.",
        "Cada clique é uma pequena vitória.",
        "Ocorreram 0 resultados.",
        "Há pessoas que são lentas para entender.",
        "Esse botão não faz nada, mas você já sabia disso.",
        "Esse botão pela manhã não faz nada e à tarde descansa.",
        "Esse botão está mais vazio que sua conta bancária.",
        "Esse botão está mais ausente que o amor dela.",
        "Esse botão está mais perdido que seu celular quando você coloca no modo silencioso.",
        "Esse botão está mais quebrado que suas promessas de ano novo.",
        "Esse botão está mais estagnado que seu progresso com ela.",
        "Esse botão está mais vazio que sua caixa de entrada.",
        "Esse botão precisa do seu espaço...",
        "Esse botão está mais tenso que você quando alguém pega seu celular.",
        "Esse botão está ficando desconfortável.",
        "Esse botão está mais vazio que seu chat com a pessoa que você gosta.",
        "Nem tente.",
        "Melhor sorte da próxima vez.",
        "Não se preocupe, você vai se sair bem.",
        "Não tenha medo, apenas relaxe.",
        "Bem feito, você se atreve a tentar novamente?",
        "Prometo que esse botão nunca fará nada.",
        "Não se preocupe, esse botão também está vazio por dentro.",
        "Há apoio, o que falta é talento.",
        "Esse botão é como a pessoa que você gosta, não responde.",
        "Olhe para você... você não está consciente, mas continua tentando mostrar ao mundo o que pode fazer... e já provou.",
        "Até o oponente mais forte sempre tem uma fraqueza.",
        "Ninguém se importava quem eu era até eu colocar uma máscara.",
        "Todos os esforços são inúteis se você não acreditar em si mesmo."
    ]
  },
  zh: {
    name: "TiddyPink",
    next: "下一步",
    restart: "重试",
    zx7uj2r: "使用通配符", // 通配符元素
    toManyWC: "您最近使用了太多通配符，需要等待一段时间才能再使用。:)",
    exit: "退出",
    loading: "加载中...",
    purchase: "获取所有图片",
    purchase1: "获取所有图片",
    modal_title: "您必须在确认年满18岁后继续。",
    modal_purchase_title: "获取所有图片：",
    modal_content: "您可以通过以下两种方式获取所有图片，分别是着装和裸露版本：",
    total_text: "图片总数：",
    acept: "继续",
    ia_tag: "由AI生成",
    footer: "版权所有 - © TiddyPink 2024",
    score: "分数：",
    musicOn: "音乐",
    MusicOff: "音乐",
    home: "开始游戏",
    nm: "穿衣",
    nd: "脱衣",
    howto: "怎么玩",
    more: "了解更多",
    analitics: "我的统计",
    statslabel: "我的统计：",
    end: "你失败了。你的得分是：",
    matches: "已玩局数：",
    wmatches: "已赢局数：",
    corrects: "总正确数：",
    mistakes: "总错误数：",
    seenimages: "已查看穿衣女孩：",
    seennimages: "已查看裸露女孩：",
    titlehowto: "怎么玩：",
    texthowto: "猜出女孩乳头的颜色，选出六个选项中的正确答案。如果你猜对了，你将看到裸露的女孩；如果错了，你将进入下一张图片。第一轮会显示正确选项，然后你就得自己继续了。随着游戏进展，图片会变得更加露骨，完美的得分将解锁一个特别惊喜。",
    start: "立即开始！",
    moretitle: "你可以获取所有这款游戏的图片 😈",
    successMessage: "太棒了，你猜对了所有图片 😳 我有一个奖品给你 🥵 它将在这里显示：",
    exitMessage: [
        "这个按钮什么也不做 :v",
        "我告诉过你，这个按钮什么也不做。",
        "请听我说，这个按钮什么也不做。",
        "(按钮仍然什么也不做 *)",
        "这个按钮依然什么也不做，就像你的前任。",
        "小心点击，这个按钮自尊心很低。",
        "这个按钮就像她的感情，空虚...",
        "每点击一次这个按钮，世界上就有一只小猫死去。",
        "这个按钮有情感，而且它们快崩溃了。",
        "这个按钮只是用来装饰的。",
        "如果你再按一次，你就是g4y。",
        "我就知道...",
        "智慧追逐你，但你跑得更快。",
        "我在最爱她的时候失去了她。",
        "Messirve...",
        "记住你还有重要的事情要做uwu。",
        "Siiuuuuuuuu。",
        "每点击一次这个按钮，都是一个提醒：没有什么是永恒的。",
        "谢谢你宝贵的时间，但还是没有发生任何事情。",
        "请去别的地方寻找幸福。",
        "再点击一次，你将浪费你生命中的一秒钟。",
        "这按钮没有毁掉它的东西，它变得更强。",
        "这个按钮承诺什么都不做，并且实现了。",
        "这个按钮就像沙漠里的伞一样没用。",
        "这个按钮有目标，但说它明天开始。",
        "有时我们必须接受并不是一切都如我们所愿。",
        "这个按钮并没有坏，只是它什么也不做。",
        "我看得出来你喜欢数字化地被忽略。",
        "这个按钮感到被夸奖...但它仍然什么也不做。",
        "当你坚持这一点时，世界上其他事情继续发生...",
        "没有改变... 一切依旧...",
        "这个按钮什么也不做，但你依然保持信念。",
        "每点击一次都是一次小胜利。",
        "没有结果。",
        "有些人理解起来比较慢。",
        "这个按钮什么也不做，但你已经知道了。",
        "这个按钮早上什么也不做，下午休息。",
        "这个按钮比你的银行账户还空。",
        "这个按钮比她的感情还空。",
        "这个按钮比你把手机放在静音时还迷失。",
        "这个按钮比你的新年承诺还破碎。",
        "这个按钮比你和她的进展还停滞不前。",
        "这个按钮比你的收件箱还空。",
        "这个按钮需要一点空间...",
        "这个按钮比你在别人拿你手机时还紧张。",
        "这个按钮开始让人不舒服了。",
        "这个按钮比你和你喜欢的人的聊天还空。",
        "别试了。",
        "下次好运。",
        "别担心，你会做得很好。",
        "别怕，放松一下。",
        "做得好，你敢再来一次吗？",
        "我保证这个按钮永远不会做任何事情。",
        "别担心，这个按钮里面也是空的。",
        "有支持，缺的只是才华。",
        "这个按钮就像你喜欢的人，不回应。",
        "看看你自己...你还没有意识到，但你坚持要向全世界展示你能做什么...其实你已经做到了。",
        "即使是最强的对手也总有一个弱点。",
        "没人关心我是谁，直到我戴上面具。",
        "如果你不相信自己，所有的努力都是徒劳的。"
    ]
  }
};

async function testConnectionSpeed() {
  const imageUrl = 'https://tiddypink.com/v1i89uo45w/1xg9sjngbg.jpg';
  const uniqueUrl = `${imageUrl}?nocache=${Date.now()}`;

  const startTime = Date.now();

  try {
    const response = await fetch(uniqueUrl, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

    const blob = await response.blob();
    const endTime = Date.now();

    const fileSizeInBits = blob.size * 8;
    const durationInSeconds = (endTime - startTime) / 1000;
    const speedInMbps = (fileSizeInBits / durationInSeconds) / (1024 * 1024);

    if (speedInMbps.toFixed(2) < 4) {
      musicOn = false;
    }
  } catch (error) {
    console.error('', error);
  }
}

testConnectionSpeed();

var hgb9qyz=[{ec3sx:"0",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"2",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"3",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"4",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"5",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"6",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"7",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"8",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"9",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"11",wjz2sr:"1",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"12",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"13",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"14",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"15",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"16",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"17",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"18",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"19",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"20",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"21",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"22",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"23",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"24",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"25",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"26",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"27",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"28",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"29",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"30",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"31",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"32",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"33",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"34",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"35",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"36",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"37",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"38",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"39",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"40",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"41",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"42",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"43",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"44",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"45",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"46",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"47",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"48",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"49",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"50",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"51",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"52",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"53",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"54",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"55",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"56",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"57",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"58",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"59",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"60",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"61",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"63",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"64",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"65",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"66",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"67",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"68",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"69",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"70",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"71",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"72",wjz2sr:"1",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"73",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"74",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"75",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"76",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"77",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"78",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"79",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"80",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"81",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"82",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"83",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"84",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"85",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"86",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"87",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"88",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"89",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"90",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"91",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"92",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"93",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"94",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"95",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"96",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"97",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"98",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"99",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"100",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"101",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"102",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"103",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"104",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"105",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"106",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"107",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"108",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"109",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"110",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"111",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"112",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"113",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"114",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"115",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"116",wjz2sr:"1",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"117",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"118",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"119",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"120",wjz2sr:"2",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"121",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"122",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"123",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"124",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"125",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"126",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"127",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"128",wjz2sr:"1",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"129",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"130",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"131",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"132",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"133",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"134",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"135",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"136",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"137",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"138",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"139",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"140",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"141",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"142",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"143",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"144",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"145",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"146",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"147",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"148",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"149",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"150",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"151",wjz2sr:"2",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"152",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"153",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"154",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"155",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"156",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"157",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"158",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"159",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"160",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"161",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"162",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"163",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"164",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"165",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"166",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"167",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"168",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"169",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"170",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"171",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"172",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"173",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"174",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"175",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"176",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"177",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"178",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"179",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"180",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"181",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"182",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"183",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"184",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"185",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"186",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"187",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"189",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"190",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"191",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"192",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"193",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"194",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"195",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"196",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"197",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"198",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"199",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"200",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"201",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"202",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"204",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"205",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"206",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"207",wjz2sr:"1",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"208",wjz2sr:"1",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"209",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"211",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"212",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"213",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"214",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"215",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"216",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"218",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"219",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"220",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"221",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"222",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"223",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"224",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"225",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"226",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"227",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"228",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"229",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"230",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"231",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"232",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"233",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"234",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"235",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"236",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"237",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"238",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"239",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"240",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"241",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"242",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"243",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"244",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"245",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"246",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"247",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"248",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"249",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"250",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"251",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"252",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"253",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"254",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"255",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"256",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"257",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"258",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"259",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"260",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"261",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"262",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"263",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"264",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"265",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"266",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"267",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"268",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"269",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"270",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"271",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"272",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"273",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"274",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"275",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"276",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"277",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"278",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"279",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"280",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"281",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"282",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"283",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"284",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"285",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"286",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"287",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"288",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"289",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"290",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"291",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"292",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"293",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"294",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"295",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"296",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"297",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"298",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"299",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"300",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"301",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"302",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"303",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"304",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"305",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"306",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"307",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"308",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"309",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"310",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"311",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"312",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"313",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"314",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"315",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"316",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"317",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"318",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"319",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"320",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"321",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"322",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"323",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"324",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"325",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"326",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"327",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"328",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"329",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"330",wjz2sr:"2",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"331",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"332",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"333",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"334",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"335",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"336",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"337",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"338",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"339",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"340",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"341",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"342",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"343",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"344",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"345",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"346",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"347",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"348",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"349",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"350",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"351",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"352",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"353",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"354",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"355",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"356",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"357",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"358",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"359",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"360",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"361",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"362",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"363",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"364",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"365",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"366",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"367",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"368",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"369",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"370",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"371",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"372",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"373",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"374",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"375",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"376",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"377",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"378",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"379",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"380",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"381",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"382",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"383",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"384",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"385",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"386",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"387",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"388",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"389",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"390",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"391",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"392",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"393",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"394",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"395",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"396",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"397",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"398",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"399",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"400",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"401",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"402",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"403",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"404",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"405",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"406",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"407",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"408",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"409",wjz2sr:"6",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"410",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"411",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"412",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"413",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"414",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"415",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"416",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"417",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"418",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"420",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"421",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"422",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"423",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"424",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"425",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"426",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"427",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"428",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"429",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"430",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"431",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"432",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"433",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"434",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"435",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"436",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"437",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"438",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"439",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"440",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"441",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"442",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"443",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"444",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"445",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"446",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"447",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"448",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"449",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"450",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"451",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"452",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"453",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"454",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"455",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"456",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"457",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"458",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"459",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"460",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"461",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"462",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"463",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"464",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"465",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"466",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"467",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"468",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"469",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"470",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"472",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"473",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"474",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"475",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"476",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"477",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"478",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"479",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"480",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"482",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"483",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"484",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"485",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"486",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"487",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"488",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"489",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"490",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"491",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"492",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"493",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"494",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"495",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"496",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"497",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"498",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"499",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"500",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"501",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"502",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"503",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"504",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"505",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"506",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"507",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"508",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"509",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"510",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"511",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"512",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"513",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"514",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"515",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"516",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"517",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"518",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"519",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"520",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"521",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"522",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"523",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"524",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"525",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"526",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"527",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"528",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"529",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"530",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"531",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"532",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"533",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"534",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"535",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"536",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"537",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"538",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"539",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"540",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"541",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"542",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"543",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"544",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"545",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"546",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"547",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"548",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"549",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"550",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"551",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"552",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"553",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"554",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"555",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"556",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"557",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"558",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"559",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"560",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"561",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"562",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"563",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"564",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"565",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"566",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"567",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"568",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"569",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"570",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"571",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"572",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"573",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"574",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"575",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"576",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"577",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"578",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"579",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"580",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"581",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"582",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"583",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"584",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"585",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"586",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"587",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"588",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"589",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"590",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"591",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"592",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"593",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"594",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"595",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"596",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"597",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"598",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"599",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"600",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"601",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"602",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"603",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"604",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"605",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"606",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"607",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"608",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"609",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"610",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"611",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"612",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"613",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"614",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"615",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"616",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"617",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"618",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"619",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"620",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"621",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"622",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"623",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"624",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"625",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"626",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"627",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"628",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"629",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"630",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"631",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"632",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"633",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"634",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"635",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"636",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"637",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"638",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"639",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"640",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"641",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"642",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"643",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"644",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"645",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"646",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"647",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"648",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"649",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"650",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"651",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"652",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"653",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"654",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"655",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"656",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"657",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"658",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"659",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"660",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"661",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"662",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"663",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"664",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"665",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"666",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"667",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"668",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"669",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"670",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"671",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"672",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"673",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"674",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"675",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"677",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"678",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"679",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"680",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"681",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"682",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"683",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"684",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"685",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"686",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"687",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"688",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"689",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"690",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"691",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"692",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"693",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"694",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"695",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"696",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"697",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"698",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"699",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"700",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"701",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"702",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"703",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"704",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"705",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"706",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"707",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"708",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"709",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"710",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"711",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"712",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"713",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"714",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"715",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"716",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"717",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"718",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"719",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"720",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"721",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"722",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"723",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"724",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"725",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"726",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"727",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"728",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"729",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"730",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"731",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"732",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"733",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"734",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"735",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"736",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"737",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"738",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"739",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"740",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"741",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"742",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"743",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"744",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"745",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"746",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"747",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"748",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"749",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"750",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"751",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"752",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"753",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"754",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"755",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"756",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"757",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"758",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"759",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"760",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"761",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"762",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"763",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"764",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"765",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"766",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"767",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"768",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"769",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"780",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"781",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"782",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"783",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"784",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"785",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"786",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"787",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"788",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"789",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"790",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"791",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"792",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"793",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"794",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"795",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"796",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"797",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"798",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"799",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"800",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"801",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"802",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"803",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"804",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"805",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"806",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"807",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"808",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"809",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"810",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"811",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"812",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"813",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"814",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"815",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"816",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"817",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"818",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"819",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"820",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"821",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"822",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"823",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"824",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"825",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"826",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"827",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"828",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"829",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"830",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"831",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"832",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"833",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"834",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"835",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"836",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"837",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"838",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"839",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"840",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"841",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"842",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"843",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"844",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"845",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"846",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"847",wjz2sr:"5",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"848",wjz2sr:"5",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"849",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"850",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"851",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"852",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"853",wjz2sr:"4",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"854",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"855",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"856",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"857",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"858",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"859",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"860",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"861",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"862",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"863",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"864",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"865",wjz2sr:"5",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"866",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"868",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"869",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"870",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"871",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"872",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"873",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"874",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"875",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"876",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"877",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"878",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"879",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"880",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"881",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"882",wjz2sr:"4",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"883",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"884",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"885",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"886",wjz2sr:"4",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"887",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"889",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"890",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"891",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"892",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"893",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"895",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"896",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"897",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"898",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"899",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"900",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"901",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"902",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"903",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"904",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"905",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"906",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"907",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"908",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"909",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"910",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"911",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"912",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"913",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"914",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"915",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"916",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"917",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"918",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"919",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"920",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"921",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"922",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"923",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"924",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"925",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"926",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"927",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"928",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"929",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"930",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"931",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"932",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"933",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"934",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"935",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"936",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"937",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"938",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"939",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"940",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"941",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"942",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"943",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"944",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"945",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"946",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"947",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"948",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"949",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"950",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"951",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"952",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"953",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"954",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"955",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"956",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"957",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"958",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"959",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"960",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"961",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"962",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"963",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"964",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"965",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"966",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"967",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"968",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"969",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"970",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"971",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"972",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"973",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"974",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"975",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"976",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"977",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"978",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"979",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"980",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"981",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"982",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"983",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"984",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"985",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"986",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"987",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"988",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"990",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"991",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"992",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"993",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"994",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"995",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"996",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"997",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"998",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"999",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1000",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1001",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1002",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1003",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1004",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1005",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1006",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1007",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1008",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1009",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"1010",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1011",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1012",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1013",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1014",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1015",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1016",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1017",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1018",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1019",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1020",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1021",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1022",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1023",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1024",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1025",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1026",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1027",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1028",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1029",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1030",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1031",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1032",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1033",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1034",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1035",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1036",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1037",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1038",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1039",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1040",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1041",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1042",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1043",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1044",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1045",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1046",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1047",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1048",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1049",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1050",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1051",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1052",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1053",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1054",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1055",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1056",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1057",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1058",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1059",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1060",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1061",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1062",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1063",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1064",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1065",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1066",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1067",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1068",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1069",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1070",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1071",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1072",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1073",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1074",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1075",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1076",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1077",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1078",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1079",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1080",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1081",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1082",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1083",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1084",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1085",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1086",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1087",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1088",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1089",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1090",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1091",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1092",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1093",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1094",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1095",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1096",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1097",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1098",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1099",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1100",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1101",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1102",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1103",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1104",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1105",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1106",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1107",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1108",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1109",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1110",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1111",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1112",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1113",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1114",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1115",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1116",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1117",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1118",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1119",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1120",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1121",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1122",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1123",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1124",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1125",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1126",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1127",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1128",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1129",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1130",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1131",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1132",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1133",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1134",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1135",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1136",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1137",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1138",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1139",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1140",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1141",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1142",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1143",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1144",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1145",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1146",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1147",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1148",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1149",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1150",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1151",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1152",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1153",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1154",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1155",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1156",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1157",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1158",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1159",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1160",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1161",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1162",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1163",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1164",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1165",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1166",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1167",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1168",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1169",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1170",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1171",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1172",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1173",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1174",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1175",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1176",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1177",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1178",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1179",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1180",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1181",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1182",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1183",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1184",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1185",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1187",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1188",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1189",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1190",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1191",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1192",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1193",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1194",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1195",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1196",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1197",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1198",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1199",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1200",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1202",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1203",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1204",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1205",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1206",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1207",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1208",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1209",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1210",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1211",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1212",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1213",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1214",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1215",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1216",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1217",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1218",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1219",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1220",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1221",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1222",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1223",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1224",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1225",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1226",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1227",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1228",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1229",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1230",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1231",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1232",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1233",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1234",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1235",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1236",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1237",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1238",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1239",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1240",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1241",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1242",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1243",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1244",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1245",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1246",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1247",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1248",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1249",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1250",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1251",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1252",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1253",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1254",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1256",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1257",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1258",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1259",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1260",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1261",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1262",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1263",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1264",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1265",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1266",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1267",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1268",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1269",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1270",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1271",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1272",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1273",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1274",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1275",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1276",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1277",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1278",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1279",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1280",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1281",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1282",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1283",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1284",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1285",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1286",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1287",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1288",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1289",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1290",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1291",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1292",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1293",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1294",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1295",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1296",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1298",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1299",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1300",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1301",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"1302",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1303",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1304",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1305",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1306",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1307",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1308",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1309",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1310",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1311",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1312",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1313",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1314",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1315",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1316",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1317",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1318",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1319",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1320",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1321",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1322",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1323",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1324",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1325",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1326",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1327",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1328",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1329",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1330",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1331",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1332",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1333",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1334",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1335",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},];


