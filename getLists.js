// let nameList
// let createlist = `<section>
//   <details>
//     <summary id="lista">${namelist_}</summary>
//     <section id='${userx}' class="filmesSelected">
      
//     </section>
//   </details>
// </section>`
let listname_
function dbLenght(db){
  let l = 0
  firebase.firestore().collection(db).onSnapshot((r)=>l = r.docs.length)
  console.log('valor de l ',l)
  return l
}

// const AllLists = document.getElementById('AllLists')
// let output = '';
// let secData_ = document.querySelector(`#${userx}`)
async function test(){
  
 await firebase.firestore().collection('Lists').onSnapshot((qS)=>qS.forEach((doc)=>{ debugger
  const AllLists = document.getElementById('AllLists')
  let user = (doc.data().user);
  console.log('usuario',user)
  let listname_ = (doc.data().listname); 
  console.log('lista', listname_) 
   AllLists.innerHTML += listname_;
 

let output = '';
let secData_ = document.querySelector(`#${userx}`)
   
  
  
  let l = dbLenght(user); 
  let i = 0;


   firebase.firestore().collection(user)
  .orderBy("timestamp").onSnapshot((qS)=>
    
    qS.forEach((doc)=>{
    
   output += `<li id='${doc.id}' >${doc.data().movie}</li>`;
  console.log("doc.id", doc.id)
  
      i ++
      if(i > l){
        
        
console.log('output: ',output)
  secData.innerHTML = output

      }
  }))
  
  
}))
  
}   test()
  

