// document.addEventListener("DOMContentLoaded", function (){

src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"

  const db = firebase.firestore();
  const searchInput = document.querySelector('#search')
  const secData = document.querySelector('.filmesSelected')
  const form = document.querySelector('form')
  const select = document.getElementsByClassName('select')
  const filmList = document.getElementById('filmeList')
  const crialista = document.getElementById('CreatList')
  const namelist = document.getElementById('ListName')
  
  let userx = null;


  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    searchMovie()

  })


  //get user-UID
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      userx = user.uid;
      console.log('usuarioID',userx)
    }else{
      return
    }
    
    })

  //CRIA LISTA
  

    function crialistax(){
      //No blank namelist-fail
      if(!namelist){
        console.log('preencha o campo')
        return
      }
      
        
      

      let createlist = `<section>
    <details>
      <summary >${namelist.value}</summary>
      <section id='${userx}' class="filmesSelected">
        
      </section>
    </details>
  </section>`  

      if(userx){
        //CREATE DB LIST
        db.collection('Lists').add({
          listadefilme: createlist
        }).then(function(doc){
          console.log(doc.id)
        }).catch(err=>console.log("err", err))

        
    
    
    console.log("cria section")

      }    
    }
      
  
  function removeElement() {
    const chk = document.querySelectorAll(".uncheck");
    chk.forEach((item) => {
      item.remove()
    })
  }
  // function check(element) {
  //   element.parentElement.classList.toggle('uncheck')
  //   console.log(element)

  // }

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



function check(element) {
  const db = firebase.firestore();
debugger
//Select movie card
  const selected = element.parentElement;
  console.log("selected", selected)
  
  // selected.classList.toggle('uncheck')
  if(element.getAttribute('class') === 'delet'){
    element.innerHTML = "SELECT";
    element.removeAttribute('class', 'delet')
    element.setAttribute('class', 'choose')

    let getid = selected.getAttribute('id')
    console.log('esse eh o getid', getid)
    db.collection(`${userx}`).doc(`${getid}`).delete()
  }else{
  const colocar = document.querySelector('.filmesSelected')
  

  element.innerText = "Delete"
  element.setAttribute('class', "delet")
 //
 
 //
//  let userx = firebase.auth().currentUser
  db.collection(`${userx}`).add({
    movie: selected.innerHTML,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    

  }).then(function (doc) {
    console.log('Document written with id:', doc.id);
    selected.setAttribute("id", doc.id)
    selected = '';



  }).catch(function (err) {
    console.log(error, err)
  })
}
    showMovies()  
}
//LOAD FILM LIST
function showMovies(){
  db.collection(userx)
    .orderBy("timestamp")
    .onSnapshot(
      (querySnapshot) => {
        let output = '';
        const secData = document.querySelector('.filmesSelected')

        querySnapshot.forEach((doc) => {
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


showMovies()


function displayLists(){
db.collection("Lists")
        .onSnapshot(
      (querySnapshot) => {
        let output = '';
        const putLists = document.getElementById('AllLists')

        querySnapshot.forEach((doc) => {
          console.log("doc.data do forEach", doc.data())
          output += `${doc.data().listadefilme}`;
          //get userID
          let userListId = output.slice(43,71)
          if(userx===userListId){
            console.log('userlistId',userListId)
            console.log('userx',userx)
          }
          
          // console.log("doc.id", doc.id)
        });
        
        putLists.innerHTML = output;
        // console.log("output",output)
      },
      (error) => {
        console.log(error)
      }

    );
    
      document.getElementById('AllLists').innerHTML += createlist;
    }
    displayLists()
  // })
  // firebase.firestore().collection('usuario3').add({nome:'ronaldo',sobrenome:'farias',}).then(function(qq){
  //   console.log(qq)
  getuser()