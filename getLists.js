//  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"
//      src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"
//       src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"
    
//        const firebaseConfig = {
//   apiKey: "AIzaSyDwuhBt0XH_UOZEYZIZcLzjdvuvyvgWk7E",
//   authDomain: "ephemeral-films.firebaseapp.com",
//   projectId: "ephemeral-films",
//   storageBucket: "ephemeral-films.appspot.com",
//   messagingSenderId: "619401059069",
//   appId: "1:619401059069:web:f15b1c3ca1d44b97073c94"
// }

firebase.firestore().collection('Lists').get().then((r)=>(r.docs)).then((r)=>r.forEach((doc)=>{
  let user = (doc.data().user);
  firebase.firestore().collection(`${user}`)
  .orderBy("timestamp").onSnapshot((qS)=>qS.forEach((doc)=>{
    
  output += `<li id='${doc.id}' >${doc.data().movie}</li>`;
  console.log("doc.id", doc.id)

  }))

}))
  
    
  

