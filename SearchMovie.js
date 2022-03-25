function searchMovie() {
  let searchValue = searchInput.value
  
  
  
  console.log("searchValue", searchValue)

   fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${searchValue}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "0097e28d00msh520a86c687471ffp117aa3jsn587bc72f4bd7"
    }
  })
    .then(response => {
      response.json()
        .then(data => {
          const list = data.d

          removeElement()
          // document.querySelector('.uncheck').innerHTML = ""
          list.forEach((item) => {
            let id = item.id;
            if (id.slice(0, 2) === 'tt') {
              const name = item.l;

              const poster = item.i.imageUrl


              const movie = `<li class="uncheck"><h2>${name}</h2> <img src="${poster}"><button onclick="check(this)" class="choose">Select</button></li>`
              
              document.querySelector('.movies').innerHTML += movie;
            }
          })

        })
    })
    .catch(err => {
      console.error(err);
    })
    
    return 
}