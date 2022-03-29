function check(element) {
  const db = firebase.firestore();

//Select movie card
  const selected = element.parentElement;
  const Pselected = selected.parentElement;
  console.log("selected", selected)
  if(userx === Pselected.getAttribute('id')){
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
  db.collection(userx).add({
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
} 
}