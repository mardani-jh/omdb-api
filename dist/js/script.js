//Navbar-Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Hamburger-active
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// cari film
const cariFilm = () => {
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    datatype: "json",
    data: {
      apikey: "918abb42",
      s: $("#cari").val(),
    },
    success: function (result) {
      if (result.Response === "True") {
        const film = result.Search; //liat di Postman

        $("#daftar-film").empty();
        $.each(film, (i, data) => {
          $("#daftar-film").append(` 
                    <div class="min-h-max w-60  border rounded-md shadow-lg shadow-red-300 overflow-hidden">
                  <div class="w-full overflow-hidden block min-h-[310px] " >
                `+(data.Poster === 'N/A' ?`<img src="dist/img/No-Image-Placeholder.svg" max-height="20px" alt="" class="p-0" />`:`<img  src="${data.Poster}"   alt="" class="p-0 scale-y-100" />`)+`
                       </div>
                    
                <h5 class="px-2 truncate text-md" title="`+data.Title+`">${data.Title}</h5>
                <h5 class="px-2 text-sm py-2 mb-2">${data.Year}</h5>
                <a href="#ex1" rel="modal:open" class="mx-2 text-primary lihat-detil hover:underline p-2" data-modal-toggle="defaultModal" data-id="${data.imdbID}">Detil Film</a>
                </div>`);
            });
        $("#cari").val("");
      } else {
        $("#daftar-film").removeClass();
        $("#daftar-film").html(`
                <div class="grid grid-cols-1 w-full text-center text-bold text-4xl">
                <h1 class="" >Film tidak ditemukan! ( ${result.Error})</h1>
                </div>
                `);
      }
    },
  });
}

$("#tombol-cari").on("click", function () {
  cariFilm();
});

$('#cari').on('keyup', function(e){
  if(e.keyCode === 13) {
    cariFilm();
  }
});

$('#daftar-film').on('click','.lihat-detil', function(){

  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    datatype: "json",
    data: {
      apikey: "918abb42",
      i: $(this).data('id'),
    },
    success: (movie) => {
      if(movie.Response === 'True'){
     
        $('#ex1').html(`
        <div class="min-h-full w-fit flex flex-row">
          <div class="basis-1/3">
               `+(movie.Poster === 'N/A' ?'<img src="dist/img/No-Image-Placeholder.svg" max-height="20px" alt="" class="p-0" />':`<img  src="${movie.Poster}"   alt="" class="p-0 scale-y-100" />`)+`
          </div>
          <div class="basis-2/3">
              <h3 class="text-xl mb-2">${movie.Title}</h3>
              <h4 class="text-base mb-2">Released : <span class="text-slate-500">${movie.Released}</span></h4>
              <p class="text-base mb-2">Genre : <span class="text-slate-500"> ${movie.Genre}</span></p>
              <p class="text-base mb-2">Sutradara : <span class="text-slate-500"> ${movie.Director}</span></p>
              <p class="text-base mb-2">Aktor : <span class="text-slate-500"> ${movie.Actors}</span></p>
              <p class="text-base mb-2">Sinopsis : <span class="text-slate-500"> ${movie.Plot}</span></p>
          </div>
        </div>
        `)
      }
    }
})
});