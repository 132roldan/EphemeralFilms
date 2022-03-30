// document.addEventListener("DOMContentLoaded", function(){
  console.log("ready!");
src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"

  const db = firebase.firestore();
  const searchInput = document.querySelector('#search')
  const secData = document.querySelector('.filmesSelected')
  const form = document.querySelector('form')
  const select = document.getElementsByClassName('select')
  const filmList = document.getElementById('filmeList')
  const crialista = document.getElementById('CreatList')
  const namelist = document.getElementById('ListName')
  const putLists = document.getElementById('AllLists')
  let count =0
  let n= ''

  let userx = null;

  function contagem(){
    db.collection(`Lists`).doc(userx).collection(userx).onSnapshot((qs)=>{
      let i = 0
      qs.forEach((r)=> i ++ )
     count = i
     
     db.collection('Lists').doc(userx).get().then((r)=>n = r.data().listname).then((r)=>db.collection('Lists').doc(userx).update({
                
      listadefilme: `<section>
      <details>
      <summary id="lista">${n}(${count})</summary>
      <section id='${userx}' class="filmesSelected">
      
      </section>
      </details>
      </section>`,
    }) )     
     
  })
}
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    searchMovie()
    showMovies()

  })
  let l
//check how many Docs in DB
let a
  
    a = firebase.firestore().collection('Lists').get().then((r)=>r.docs.length)
      
    
  a.then((r)=>l=r)


  //get user-UID
  function getUserUid(){firebase.auth().onAuthStateChanged(user => {
    if(user){
      userx = user.uid;
      console.log('usuarioID',userx)
    }else{
      return
    }
    
    })
  }
  getUserUid()
  //CRIA LISTA
 
      
  
  function removeElement() {
    const chk = document.querySelectorAll(".uncheck");
    chk.forEach((item) => {
      item.remove()
    })
  }
  

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
  
  //Select movie card
    const selected = element.parentElement;
   
    if(element.getAttribute('class') === 'delet'){
      element.innerHTML = "SELECT";
      element.removeAttribute('class', 'delet')
      element.setAttribute('class', 'choose')
  
      let getid = selected.getAttribute('id')
      console.log('esse eh o getid', getid)
      db.collection(`Lists`).doc(userx).collection(`${userx}`).doc(`${getid}`).delete()
      
    }else{

    const colocar = document.querySelector('.filmesSelected')
    
  
    element.innerText = "Delete"
    element.setAttribute('class', "delet")
   //
   
   //
  //  let userx = firebase.auth().currentUser
    db.collection('Lists').doc(userx).collection(userx).add({
      movie: selected.innerHTML,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
  
    }).then(function (doc) {
      console.log('Document written with id:', doc.id);
      selected.setAttribute("id", doc.id)
      selected = '';
      contagem()
  
  
    }).catch(function (err) {
      console.log(error, err)
    })
  }
   showMovies()
  }
//LOAD FILM LIST
function showMovies(){
  // debugger
  if(document.getElementById('lista')){
    let output=''
  db.collection('Lists').doc(userx).collection(`${userx}`)
    .orderBy("timestamp")
    .onSnapshot(
      (qS) => {
        
        let output = '';
        const secData = document.querySelector(`#${userx}`)

        qS.forEach((doc) =>{ 
          
          
          output += `<li id='${doc.id}'>${doc.data().movie}</li>`
      }
        );
        //DISPLAY MOVIE LIST
        secData.innerHTML = output;
      }    

    );
    }
  }

showMovies()



 
   function logoff(){
    firebase.auth().onAuthStateChanged(function (user){
      if (user) firebase.auth().signOut()
      console.log('user logout')
    })
  }
// }) 

async function isEmpty(){
  await (db.collection('Lists').get().then((r)=> r.empty).then((r)=>empty = r))
  console.log(empty)
return empty
}
isEmpty()


//       }displayList()
      function updateList(){
              if(count === 0){
             db.collection('Lists').doc(userx).update({
                
              listadefilme: `<section>
              <details>
              <summary id="lista">${namelist.value}</summary>
              <section id='${userx}' class="filmesSelected">
              
              </section>
              </details>
              </section>`,
              listname: namelist.value,                 
              })
              
            }else{
                db.collection('Lists').doc(userx).update({
                
                  listadefilme: `<section>
                  <details>
                  <summary id="lista">${namelist.value}(${count})</summary>
                  <section id='${userx}' class="filmesSelected">
                  
                  </section>
                  </details>
                  </section>`,
                  listname: namelist.value, 
              })
            } 
              userList()
        

}





        function userList(){
          db.collection("Lists")
        .onSnapshot(
      (querySnapshot) => {
        let output = '';
        
        const putLists = document.getElementById('AllLists')

        querySnapshot.forEach((doc) => {
          
          let user = (doc.data().user)
                   
          if(user === userx){
          output += `${doc.data().listadefilme}`;
          
            putLists.innerHTML = output
            
          }
        })
      })
      showMovies()
    }    userList()
    document.addEventListener('click', function(){contagem()})
    document.addEventListener('click', function(){showMovies()})
    