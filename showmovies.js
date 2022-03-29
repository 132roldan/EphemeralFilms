function showMovies(){
  if(document.getElementById('lista')){
  
  db.collection(`${userx}`)
    .orderBy("timestamp")
    .onSnapshot(
      (qS) => {
        let output = '';
        const secData = document.querySelector(`#${userx}`)

        qS.forEach((doc) => {
          console.log("doc.data do forEach", doc.data())
          output += `<li id='${doc.id}' >${doc.data().movie}</li>`;
          console.log("doc.id", doc.id)
        });
        //DISPLAY MOVIE LIST
        secData.innerHTML = output;
      },
      (error) => {
        console.log(error)
      }

    );
    }
  }

showMovies()