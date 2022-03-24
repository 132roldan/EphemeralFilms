// let nameList
// let createlist = `<section>
//   <details>
//     <summary id="lista">${namelist_}</summary>
//     <section id='${userx}' class="filmesSelected">
      
//     </section>
//   </details>
// </section>`

const AllLists = document.getElementById('AllLists')
let output = '';
let secData_ = document.querySelector(`#${userx}`)
async function test(){
 await firebase.firestore().collection('Lists').get().then((r)=>(r.docs)).then((r)=>r.forEach((doc)=>{
  let user = (doc.data().user);
  let listname_ = (doc.data().listname);
   firebase.firestore().collection(`${user}`)
  .orderBy("timestamp").onSnapshot((qS)=>
    
    qS.forEach((doc)=>{debugger
    
   output += `<li id='${doc.id}' >${doc.data().movie}</li>`;
  console.log("doc.id", doc.id)

  }))
  AllLists.innerHTML += `<section>
  <details>
    <summary id="lista">${listname_}</summary>
    <section id='${userx}' class="filmesSelected">
      
    </section>
  </details>
</section>`
console.log('output: ',output)
  secData.innerHTML = output

}))
  
}   test()
  

