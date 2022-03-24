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
  let emptyList
  let empty 
 async function run(){
  await db.collection('Lists').get().then((r)=> r.empty).then((r)=>{emptyList = r})
  
  }
  let userx = null;

  let createlist = `<section>
  <details>
    <summary id="lista">${namelist.value}</summary>
    <section id='${userx}' class="filmesSelected">
      
    </section>
  </details>
</section>`

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    searchMovie()

  })


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
  

       function crialistax(){
      let a
      //create model list
      
//   let createlist = `<section>
//   <details>
//     <summary id="lista">${namelist.value}</summary>
//     <section id='${userx}' class="filmesSelected">
      
//     </section>
//   </details>
// </section>`

      //If is not login
      if(!userx){
        alert('please Login',userx)
        return
      }//If not puut a name
      if(!namelist.value){
        alert('please choose a List Name')
        return
      }//if list not exist
      
     
     
     

      
      run()
      if(emptyList){

       db.collection('Lists').add({
          listadefilme: createlist,
          user: userx
          
        })
        console.log('lista criada')
        return

      }else{  a = 0
              b = 0
      
         db.collection("Lists").onSnapshot((qS) => {
           qS.forEach((doc) => { 
            a += 1
           if(`${doc.data().user}` === userx){
             alert('You already have a list!')
            b =  1
            
           
           return
           }if(a!==0 && b ===0 ){
           db.collection('Lists').add({
              listadefilme: createlist,
              user: userx,
              listname: namelist,
              
            })
          }
           
          })
            
      })
      
    }
      
  }
      
   

          
    
      
  
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


function displayLists(){
db.collection("Lists")
        .onSnapshot(
      (querySnapshot) => {
        let output = '';
        const putLists = document.getElementById('AllLists')

        querySnapshot.forEach((doc) => {
          console.log("doc.data do forEach", doc.data())
          if(`${doc.data().user}` === userx){
          output += `${doc.data().listadefilme}`;
          //get userID
          
            
          }
          putLists.innerHTML = output;
          // console.log("doc.id", doc.id)
        });
        
        
        // console.log("output",output)
      },
      (error) => {
        console.log(error)
      }

    );
    
      document.getElementById('AllLists').innerHTML += createlist;
    }
    displayLists()
 
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