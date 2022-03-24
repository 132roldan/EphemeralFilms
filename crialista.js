function crialistax(){
      
  if(!userx){
    alert('please Login',userx)
    return
  }
  if(!namelist.value){
    alert('please choose a List Name')
    return
  }
   db.collection("Lists")
    .onSnapshot(
  (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log('esse eh?', doc.data().user)
      if(`${doc.data().user}` === userx){
        console.log(' eh igual')
      return
      
      }else{
        
      }
    })
  })  
  

  let createlist = `<section>
<details>
  <summary >${namelist.value}</summary>
  <section id='${userx}' class="filmesSelected">
    
  </section>
</details>
</section>`
console.log('lista criada')  

  if(userx){
    //CREATE DB LIST
    db.collection('Lists').add({
      listadefilme: createlist,
      user: userx
    }).then(function(doc){
      console.log(doc.id)
    }).catch(err=>console.log("err", err))

    


console.log("cria section")

  }    
}