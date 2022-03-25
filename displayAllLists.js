const db = firebase.firestore()
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
// function displayLists(){
//   firebase.firestore().collection("Lists")
//           .onSnapshot(
//         (qS) => {
//           let Io = '';
          
  
//           qS.forEach((doc) => {
//             //check if is the current user
//             console.log()
//             Io += `${doc.data().listadefilme}`;
//             //get userID
//                        debugger  
//             console.log(Io)
//             document.getElementById('AllLists').innerHTML = Io;
//             // console.log("doc.id", doc.id)
//           });
                    
//           // console.log("output",output)
//         },
//         (error) => {
//           console.log(error)
//         }
  
//       );
      
//         document.getElementById('AllLists').innerHTML += createlist;
//       }
//       displayLists()
const AllLists = document.getElementById('AllLists')

function displaylists(){
                   
           db.collection("Lists").onSnapshot((qS) => {
             //get Users
             qS.forEach((doc) => {
              debugger
              let user = (doc.data().user)
              let listaFilme = (doc.data().listadefilme)
              console.log(listaFilme)
              let _listaname = (doc.data().listname) 
              debugger
              AllLists.innerHTML += listaFilme
              db.collection(user).onSnapshot((qS) => {
                let output = '';
        const secData = document.querySelector(`#${user}`)
                //get movies
                qS.forEach((doc) => {
                  output += `<li id='${doc.id}' >${doc.data().movie}</li>`
                  secData.innerHTML = output;
                })
            
                          
            })
              
        })
        
      }) 
    }displaylists()
            

           
    