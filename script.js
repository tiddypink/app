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
var uxdmcg = 0 // flag for render images
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

//  if ('connection' in navigator) {
//     const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
//     if (connection.downlink < 4) {
//       musicOn = false;
//     }

//     connection.addEventListener('change', () => {
//       if (connection.downlink < 4) {
//         musicOn = false;
//       }
//     });
//   }

  //localStorage.removeItem('td-zx5sk-stats');
  if (localStorage.getItem("td-zx5sk-stats") !== null) {
    analitics = getAnalitics()
    setAnaliticsLabels()
  }else{
    setAnaliticsLabels()
  }

  const params = new URLSearchParams(window.location.search);
  params.get('uxdmcg') == 1 ?  uxdmcg = 1 : uxdmcg = 0;
  if (uxdmcg) {
    $('#game').hide()
    $('#udmcg').show()
    $('#modal').hide()
  } else {
    $('#game').show()
    $('#udmcg').hide()
    $('#modal').show()
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
  $("#paypal_message").hide()

  setTimeout(() => {
    $('#welcome').hide()
    $("body").css("overflow", "auto");
//  }, Math.floor(Math.random() * (3000 - 1750 + 1)) + 1750);
}, 1);


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
    const closeAcept = $(".aceptclose");
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

  $('#paypal').click(function () {
    $('#paypal_message').fadeIn();
  })

  const modal = $("#modal");
  const openModal = $("#openModal");
  const closeModal = $(".close");
  const closeAcept = $(".acept");
  if (!uxdmcg) {
    modal.show();
  }
  
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

  udmcg();

});



// !
// document.addEventListener('contextmenu', function (e) {
//   e.preventDefault();
// });



var page = 1
var total_pages = 0
var per_page = 16;

function udmcg(paging) {
  var hgb9qyzx = hgb9qyz
  total_pages = Math.ceil(hgb9qyzx.length / per_page)

  $('#page').text(page);
  $('#total_pages').text(total_pages);

  //shufle array
  if (!paging) {
      let m = hgb9qyzx.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = hgb9qyzx[m];
        hgb9qyzx[m] = hgb9qyzx[i];
        hgb9qyzx[i] = t;
    }
  }


    hgb9qyzx.slice((page * per_page) - per_page , page * per_page).forEach((i, index) => {
      isLocal ? image = `v1i89uo45w/${i.ec3sx}.${ext}` : image = shelterImage(`v1i89uo45w/${i.ec3sx}.${ext}`, `#im${index}`);
      isLocal ? image_n = `v1i89uo45w/n${i.ec3sx}.${ext}` : image_n = shelterImage(`v1i89uo45w/n${i.ec3sx}.${ext}`, `#imn${index}`);
      
      $('#udmcge').append(`
          <div class='splited-image' id="splited-image${index}">
              <div class="item-splited i1 gallery-item">
                  <img id="im${index}" alt="${languages[currentLanguage].loading}" style="width: 100%; height: auto;" draggable="false">
              </div>
              <div class="item-splited i2 gallery-item">
                  <img id="imn${index}" alt="${languages[currentLanguage].loading}" style="width: 100%; height: auto;" draggable="false">
              </div>
              <div class="item-splited i3">
                <div class="purchase dld" onclick="dldi('${`v1i89uo45w/${i.ec3sx}.${ext}`}', '${`v1i89uo45w/n${i.ec3sx}.${ext}`}')">${languages[currentLanguage].download}</div>
              </div>
          </div>
      `);
      isLocal ? $(`#im${index}`).attr('src', `v1i89uo45w/${i.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/${i.ec3sx}.${ext}`, `#im${index}`);
      isLocal ? $(`#imn${index}`).attr('src', `v1i89uo45w/n${i.ec3sx}.${ext}`) : shelterImage(`v1i89uo45w/n${i.ec3sx}.${ext}`, `#imn${index}`);
      // isLocal ? image = `v1i89uo45w/${i.ec3sx}.${ext}` : image = shelterImage(`v1i89uo45w/${i.ec3sx}.${ext}`, `#im${index}`);
      // isLocal ? image_n = `v1i89uo45w/n${i.ec3sx}.${ext}` : image_n = shelterImage(`v1i89uo45w/n${i.ec3sx}.${ext}`, `#imn${index}`);
  });
}
function nextPage() {
  page++
  $('#udmcge').empty();
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  udmcg(1)
}
function prevPage() {
  page--
  $('#udmcge').empty();
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  udmcg(1)
}

function dldi(url1, url2) {
  console.log(url1)
  console.log(url2)
  nombre = 'td';
  textoMarca = 'tiddypink.com'
  WebFont.load({
        google: { families: ["Fredoka One"] },
        active: function () { // Se ejecuta cuando la fuente está cargada
            Promise.all([
                fetch(url1).then(res => res.blob()).then(blob => createImageBitmap(blob)),
                fetch(url2).then(res => res.blob()).then(blob => createImageBitmap(blob))
            ]).then(([img1, img2]) => {
                // Definir tamaño del canvas para unir las imágenes
                let canvas = document.createElement("canvas");
                canvas.width = img1.width + img2.width; // Sumar anchos
                canvas.height = Math.max(img1.height, img2.height); // Tomar la altura mayor
                let ctx = canvas.getContext("2d");

                // Dibujar ambas imágenes
                ctx.drawImage(img1, 0, 0);
                ctx.drawImage(img2, img1.width, 0); // Colocar la segunda imagen a la derecha

                // Ajustar tamaño de la fuente basado en la imagen
                let fontSize = Math.floor(canvas.width * 0.05); // 5% del ancho
                ctx.font = `${fontSize}px 'Fredoka One', cursive`;
                ctx.fillStyle = "rgba(255, 32, 110, 0.4)"; // Blanco semi-transparente
                ctx.textAlign = "center";
                ctx.fillText(textoMarca, canvas.width - 20, canvas.height - 20);

                // Descargar la imagen unida con la marca de agua
                let link = document.createElement("a");
                link.href = canvas.toDataURL("image/jpeg", 1.0);
                link.download = nombre.endsWith(".jpg") ? nombre : nombre + ".jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(error => console.error("Error al unir imágenes:", error));
        }
    });
}

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

function shelterImage(imagePath, udmcg) {
  fetch(imagePath)  // Usa la ruta o URL de la imagen
  .then(response => response.blob())  // Convierte la respuesta a un Blob
  .then(blob => {
      var reader = new FileReader();
      reader.onloadend = function () {
          var base64Image = reader.result;  // La imagen convertida a Base64
          if (udmcg) {
            $(udmcg).attr('src', base64Image);
          } else {
            $('#image').attr('src', base64Image);
          }
          
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
    download: "Descargar",
    moretitle: "Puedes obtener todas las imágenes de este juego 😈",
    successMessage: "Increíble, has acertado todas las imágenes 😳 Tengo un premio para ti 🥵 Aparecerá en: ",
    paypal_message: "Debes anotar tu correo en los detalles del pago, pagar $10, y en breve recibiras las 100 imagenes en tu correo electrónico",
    paypal_button: "Continuar con paypal",
    paypal_success_thanks: "Gracias!",
    paypal_success_message: 'Tu compra ha sido exitosa, el material ha sido enviado al correo electronico indicado en la compra, o bien al correo vinculado a tu cuenta de paypal.',
    paypal_success_ok: 'Listo',
    paypal_error: 'Hubo un error en el proceso de pago.'
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

var hgb9qyz=[{ec3sx:"0",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"2",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"3",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"4",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"5",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"6",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"7",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"8",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"9",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"11",wjz2sr:"1",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"12",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"13",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"14",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"15",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"16",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"17",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"18",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"19",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"20",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"21",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"22",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"23",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"24",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"25",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"26",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"27",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"28",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"29",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"30",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"31",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"32",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"33",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"34",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"35",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"36",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"37",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"38",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"39",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"40",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"41",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"42",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"43",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"44",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"45",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"46",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"47",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"48",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"49",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"50",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"51",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"52",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"53",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"54",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"55",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"56",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"57",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"58",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"59",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"60",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"61",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"63",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"64",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"65",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"66",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"67",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"68",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"69",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"70",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"71",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"72",wjz2sr:"1",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"73",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"74",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"75",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"76",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"77",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"78",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"79",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"80",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"81",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"82",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"83",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"84",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"85",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"86",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"87",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"88",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"89",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"90",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"91",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"92",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"93",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"94",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"95",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"96",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"97",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"98",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"99",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"100",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"101",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"102",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"103",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"104",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"105",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"106",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"107",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"108",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"109",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"110",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"111",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"112",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"113",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"114",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"115",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"116",wjz2sr:"1",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"117",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"118",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"119",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"120",wjz2sr:"2",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"121",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"122",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"123",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"124",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"125",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"126",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"127",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"128",wjz2sr:"1",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"129",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"130",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"131",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"132",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"133",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"134",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"135",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"136",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"137",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"138",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"139",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"140",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"141",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"142",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"143",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"144",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"145",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"146",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"147",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"148",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"149",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"150",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"151",wjz2sr:"2",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"152",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"153",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"154",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"155",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"156",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"157",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"158",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"159",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"160",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"161",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"162",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"163",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"164",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"165",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"166",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"167",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"168",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"169",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"170",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"171",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"172",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"173",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"174",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"175",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"176",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"177",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"178",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"179",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"180",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"181",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"182",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"183",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"184",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"185",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"186",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"187",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"189",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"190",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"191",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"192",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"193",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"194",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"195",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"196",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"197",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"198",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"199",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"200",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"201",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"202",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"204",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"205",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"206",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"207",wjz2sr:"1",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"208",wjz2sr:"1",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"209",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"211",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"212",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"213",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"214",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"215",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"216",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"218",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"219",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"220",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"221",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"222",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"223",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"224",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"225",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"226",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"227",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"228",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"229",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"230",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"231",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"232",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"233",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"234",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"235",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"236",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"237",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"238",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"239",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"240",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"241",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"242",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"243",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"244",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"245",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"246",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"247",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"248",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"249",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"250",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"251",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"252",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"253",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"254",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"255",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"256",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"257",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"258",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"259",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"260",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"261",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"262",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"263",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"264",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"265",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"266",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"267",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"268",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"269",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"270",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"271",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"272",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"273",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"274",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"275",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"276",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"277",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"278",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"279",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"280",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"281",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"282",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"283",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"284",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"285",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"286",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"287",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"288",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"289",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"290",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"291",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"292",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"293",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"294",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"295",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"296",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"297",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"298",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"299",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"300",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"301",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"302",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"303",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"304",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"305",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"306",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"307",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"308",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"309",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"310",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"311",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"312",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"313",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"314",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"315",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"316",wjz2sr:"2",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"317",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"318",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"319",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"320",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"321",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"322",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"323",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"324",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"325",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"326",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"327",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"328",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"329",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"330",wjz2sr:"2",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"331",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"332",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"333",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"334",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"335",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"336",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"337",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"338",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"339",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"340",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"341",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"342",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"343",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"344",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"345",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"346",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"347",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"348",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"349",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"350",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"351",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"352",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"353",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"354",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"355",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"356",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"357",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"358",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"359",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"360",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"361",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"362",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"363",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"364",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"365",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"366",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"367",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"368",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"369",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"370",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"371",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"372",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"373",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"374",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"375",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"376",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"377",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"378",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"379",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"380",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"381",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"382",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"383",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"384",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"385",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"386",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"387",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"388",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"389",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"390",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"391",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"392",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"393",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"394",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"395",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"396",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"397",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"398",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"399",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"400",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"401",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"402",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"403",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"404",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"405",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"406",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"407",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"408",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"409",wjz2sr:"6",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"410",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"411",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"412",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"413",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"414",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"415",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"416",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"417",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"418",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"420",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"421",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"422",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"423",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"424",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"425",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"426",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"427",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"428",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"429",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"430",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"431",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"432",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"433",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"434",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"435",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"436",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"437",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"438",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"439",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"440",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"441",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"442",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"443",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"444",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"445",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"446",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"447",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"448",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"449",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"450",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"451",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"452",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"453",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"454",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"455",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"456",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"457",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"458",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"459",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"460",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"461",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"462",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"463",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"464",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"465",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"466",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"467",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"468",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"469",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"470",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"472",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"473",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"474",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"475",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"476",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"477",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"478",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"479",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"480",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"482",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"483",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"484",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"485",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"486",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"487",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"488",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"489",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"490",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"491",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"492",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"493",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"494",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"495",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"496",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"497",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"498",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"499",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"500",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"501",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"502",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"503",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"504",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"505",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"506",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"507",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"508",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"509",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"510",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"511",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"512",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"513",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"514",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"515",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"516",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"517",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"518",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"519",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"520",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"521",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"522",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"523",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"524",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"525",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"526",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"527",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"528",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"529",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"530",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"531",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"532",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"533",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"534",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"535",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"536",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"537",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"538",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"539",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"540",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"541",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"542",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"543",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"544",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"545",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"546",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"547",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"548",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"549",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"550",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"551",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"552",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"553",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"554",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"555",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"556",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"557",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"558",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"559",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"560",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"561",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"562",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"563",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"564",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"565",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"566",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"567",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"568",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"569",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"570",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"571",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"572",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"573",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"574",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"575",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"576",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"577",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"578",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"579",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"580",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"581",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"582",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"583",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"584",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"585",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"586",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"587",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"588",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"589",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"590",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"591",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"592",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"593",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"594",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"595",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"596",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"597",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"598",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"599",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"600",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"601",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"602",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"603",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"604",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"605",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"606",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"607",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"608",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"609",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"610",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"611",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"612",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"613",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"614",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"615",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"616",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"617",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"618",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"619",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"620",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"621",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"622",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"623",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"624",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"625",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"626",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"627",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"628",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"629",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"630",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"631",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"632",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"633",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"634",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"635",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"636",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"637",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"638",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"639",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"640",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"641",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"642",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"643",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"644",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"645",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"646",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"647",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"648",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"649",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"650",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"651",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"652",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"653",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"654",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"655",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"656",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"657",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"658",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"659",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"660",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"661",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"662",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"663",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"664",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"665",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"666",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"667",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"668",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"669",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"670",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"671",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"672",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"673",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"674",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"675",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"677",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"678",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"679",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"680",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"681",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"682",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"683",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"684",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"685",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"686",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"687",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"688",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"689",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"690",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"691",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"692",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"693",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"694",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"695",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"696",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"697",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"698",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"699",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"700",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"701",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"702",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"703",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"704",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"705",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"706",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"707",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"708",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"709",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"710",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"711",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"712",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"713",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"714",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"715",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"716",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"717",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"718",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"719",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"720",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"721",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"722",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"723",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"724",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"725",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"726",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"727",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"728",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"729",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"730",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"731",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"732",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"733",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"734",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"735",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"736",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"737",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"738",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"739",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"740",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"741",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"742",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"743",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"744",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"745",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"746",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"747",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"748",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"749",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"750",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"751",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"752",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"753",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"754",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"755",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"756",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"757",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"758",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"759",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"760",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"761",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"762",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"763",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"764",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"765",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"766",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"767",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"768",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"769",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"780",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"781",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"782",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"783",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"784",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"785",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"786",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"787",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"788",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"789",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"790",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"791",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"792",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"793",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"794",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"795",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"796",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"797",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"798",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"799",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"800",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"801",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"802",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"803",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"804",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"805",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"806",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"807",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"808",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"809",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"810",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"811",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"812",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"813",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"814",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"815",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"816",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"817",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"818",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"819",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"820",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"821",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"822",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"823",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"824",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"825",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"826",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"827",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"828",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"829",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"830",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"831",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"832",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"833",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"834",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"835",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"836",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"837",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"838",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"839",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"840",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"841",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"842",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"843",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"844",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"845",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"846",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"847",wjz2sr:"5",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"848",wjz2sr:"5",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"849",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"850",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"851",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"852",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"853",wjz2sr:"4",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"854",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"855",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"856",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"857",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"858",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"859",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"860",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"861",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"862",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"863",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"864",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"865",wjz2sr:"5",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"866",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"868",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"869",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"870",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"871",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"872",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"873",wjz2sr:"2",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"874",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"875",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"876",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"877",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"878",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"879",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"880",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"881",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"882",wjz2sr:"4",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"883",wjz2sr:"4",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"884",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"885",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"886",wjz2sr:"4",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"887",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"889",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"890",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"891",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"892",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"893",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"895",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"896",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"897",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"898",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"899",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"900",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"901",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"902",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"903",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"904",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"905",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"906",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"907",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"908",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"909",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"910",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"911",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"912",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"913",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"914",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"915",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"916",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"917",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"918",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"919",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"920",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"921",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"922",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"923",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"924",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"925",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"926",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"927",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"928",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"929",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"930",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"931",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"932",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"933",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"934",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"935",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"936",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"937",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"938",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"939",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"940",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"941",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"942",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"943",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"944",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"945",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"946",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"947",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"948",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"949",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"950",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"951",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"952",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"953",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"954",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"955",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"956",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"957",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"958",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"959",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"960",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"961",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"962",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"963",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"964",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"965",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"966",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"967",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"968",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"969",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"970",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"971",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"972",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"973",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"974",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"975",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"976",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"977",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"978",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"979",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"980",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"981",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"982",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"983",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"984",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"985",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"986",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"987",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"988",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"990",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"991",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"992",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"993",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"994",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"995",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"996",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"997",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"998",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"999",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1000",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1001",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1002",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1003",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1004",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1005",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1006",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1007",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1008",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1009",wjz2sr:"3",viewed:!1,ia_generated:!0,level:1,active:!0},{ec3sx:"1010",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1011",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1012",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1013",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1014",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1015",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1016",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1017",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1018",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1019",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1020",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1021",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1022",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1023",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1024",wjz2sr:"1",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1025",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1026",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1027",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1028",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1029",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1030",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1031",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1032",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1033",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1034",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1035",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1036",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1037",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1038",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1039",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1040",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1041",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1042",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1043",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1044",wjz2sr:"6",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1045",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1046",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1047",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1048",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1049",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1050",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1051",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1052",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1053",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1054",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1055",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1056",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1057",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1058",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1059",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1060",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1061",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1062",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1063",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1064",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1065",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1066",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1067",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1068",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1069",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1070",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1071",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1072",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1073",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1074",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1075",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1076",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1077",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1078",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1079",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1080",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1081",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1082",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1083",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1084",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1085",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1086",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1087",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1088",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1089",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1090",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1091",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1092",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1093",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1094",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1095",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1096",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1097",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1098",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1099",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1100",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1101",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1102",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1103",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1104",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1105",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1106",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1107",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1108",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1109",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1110",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1111",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1112",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1113",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1114",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1115",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1116",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1117",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1118",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1119",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1120",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1121",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1122",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1123",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1124",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1125",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1126",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1127",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1128",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1129",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1130",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1131",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1132",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1133",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1134",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1135",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1136",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1137",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1138",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1139",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1140",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1141",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1142",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1143",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1144",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1145",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1146",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1147",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1148",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1149",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1150",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1151",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1152",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1153",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1154",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1155",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1156",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1157",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1158",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1159",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1160",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1161",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1162",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1163",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1164",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1165",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1166",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1167",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1168",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1169",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1170",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1171",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1172",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1173",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1174",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1175",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1176",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1177",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1178",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1179",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1180",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1181",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1182",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1183",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1184",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1185",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1187",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1188",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1189",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1190",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1191",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1192",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1193",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1194",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1195",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1196",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1197",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1198",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1199",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1200",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1202",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1203",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1204",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1205",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1206",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1207",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1208",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1209",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1210",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1211",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1212",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1213",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1214",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1215",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1216",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1217",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1218",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1219",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1220",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1221",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1222",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1223",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1224",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1225",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1226",wjz2sr:"2",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1227",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1228",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1229",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1230",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1231",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1232",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1233",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1234",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1235",wjz2sr:"4",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1236",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1237",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1238",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1239",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1240",wjz2sr:"2",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1241",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1242",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1243",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1244",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1245",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1246",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1247",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1248",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1249",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1250",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1251",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1252",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1253",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1254",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1256",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1257",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1258",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1259",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1260",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1261",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1262",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1263",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1264",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1265",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1266",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1267",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1268",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1269",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1270",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1271",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1272",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1273",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1274",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1275",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1276",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1277",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1278",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1279",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1280",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1281",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1282",wjz2sr:"6",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1283",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1284",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1285",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1286",wjz2sr:"5",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1287",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1288",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1289",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1290",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1291",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1292",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1293",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1294",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1295",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1296",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1298",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1299",wjz2sr:"3",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1300",wjz2sr:"4",viewed:!1,ia_generated:!0,level:0,active:!0},{ec3sx:"1301",wjz2sr:"3",viewed:!1,ia_generated:!0,level:2,active:!0},{ec3sx:"1302",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1303",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1304",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1305",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1306",wjz2sr:"4",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1307",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1308",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1309",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1310",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1311",wjz2sr:"2",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1312",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1313",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1314",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1315",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1316",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1317",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1318",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1319",wjz2sr:"5",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1320",wjz2sr:"5",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1321",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1322",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1323",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1324",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1325",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1326",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1327",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1328",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1329",wjz2sr:"4",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1330",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1331",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1332",wjz2sr:"3",viewed:!1,ia_generated:!1,level:1,active:!0},{ec3sx:"1333",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},{ec3sx:"1334",wjz2sr:"3",viewed:!1,ia_generated:!1,level:0,active:!0},{ec3sx:"1335",wjz2sr:"3",viewed:!1,ia_generated:!1,level:2,active:!0},

{ec3sx:"1336",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1337",wjz2sr:"4",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1338",wjz2sr:"5",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1339",wjz2sr:"4",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1340",wjz2sr:"4",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1341",wjz2sr:"4",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1342",wjz2sr:"2",viewed:0,ia_generated:0,level:2,active:!0},
{ec3sx:"1343",wjz2sr:"4",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1344",wjz2sr:"5",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1345",wjz2sr:"5",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1346",wjz2sr:"5",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1347",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1348",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1349",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1350",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1351",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1352",wjz2sr:"4",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1353",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1354",wjz2sr:"4",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1355",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1356",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1357",wjz2sr:"2",viewed:0,ia_generated:0,level:2,active:!0},
{ec3sx:"1358",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1359",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1360",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1361",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1362",wjz2sr:"2",viewed:0,ia_generated:0,level:2,active:!0},
{ec3sx:"1363",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1364",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1365",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1366",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1367",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1368",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1369",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1370",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1371",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1372",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1373",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1374",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1375",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1376",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1377",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1378",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1379",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1380",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1381",wjz2sr:"4",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1382",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1383",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1384",wjz2sr:"3",viewed:0,ia_generated:0,level:2,active:!0},
{ec3sx:"1385",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1386",wjz2sr:"2",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1387",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1388",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1389",wjz2sr:"4",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1390",wjz2sr:"5",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1391",wjz2sr:"2",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1392",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1393",wjz2sr:"4",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1394",wjz2sr:"4",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1395",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1396",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1397",wjz2sr:"3",viewed:0,ia_generated:0,level:2,active:!0},
{ec3sx:"1398",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1399",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1400",wjz2sr:"3",viewed:0,ia_generated:0,level:1,active:!0},
{ec3sx:"1401",wjz2sr:"3",viewed:0,ia_generated:0,level:0,active:!0},
{ec3sx:"1402",wjz2sr:"4",viewed:0,ia_generated:0,level:0,active:!0},
];


