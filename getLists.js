// let nameList
// let createlist = `<section>
//   <details>
//     <summary id="lista">${namelist_}</summary>
//     <section id='${userx}' class="filmesSelected">
      
//     </section>
//   </details>
// </section>`
function dbLenght(db){
  let l = 0
  firebase.firestore().collection(db).get().then((r)=>l = r.docs.length)
  return l
}

const AllLists = document.getElementById('AllLists')
let output = '';
let secData_ = document.querySelector(`#${userx}`)
async function test(){
 await firebase.firestore().collection('Lists').onSnapshot((qS)=>qS.forEach((doc)=>{
   
  let user = (doc.data().user);
  let listname_ = (doc.data().listname);
  console.log('usuario',user)
  let l = dbLenght(user); 
  let i = 0;
   firebase.firestore().collection(user)
  .orderBy("timestamp").onSnapshot((qS)=>
    
    qS.forEach((doc)=>{
    
   output += `<li id='${doc.id}' >${doc.data().movie}</li>`;
  console.log("doc.id", doc.id)
  debugger
      i ++
      if(i > l){
        debugger
        AllLists.innerHTML += `<section>
  <details>
    <summary id="lista">${listname_}</summary>
    <section id='${userx}' class="filmesSelected">
      
    </section>
  </details>
</section>`
console.log('output: ',output)
  secData.innerHTML = output

      }
  }))
  
  
}))
  
}   test()
  

