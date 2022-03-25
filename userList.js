function userList(){
  db.collection("Lists")
.onSnapshot(
(querySnapshot) => {
let output = '';

const putLists = document.getElementById('AllLists')

querySnapshot.forEach((doc) => {
  let user = (doc.data().user)
  let listaFilme = (doc.data().listadefilme)
  console.log(listaFilme)
  let _listaname = (doc.data().listname) 
  
  if(user === userx){
  output += `${doc.data().listadefilme}`;
  debugger
    putLists.innerHTML = output
    
  }
})
})
showMovies()
}    userList()