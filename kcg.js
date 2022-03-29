function crialistax(){
           let NL = namelist.value
        let a
         
        //If is not login
        if(!userx){
          alert('please Login',userx)
          return
        }//If not puut a name
        if(!NL){
          alert('please choose a List Name')
          return
        }//if list not exist
        
       
        run()
        if(emptyList){
  
         db.collection('Lists').add({
           
            listadefilme: createlist,
            user: userx,
            listname: NL,
            
          })
          console.log('lista criada')
          debugger
          displayLists()
  
        }else{  
          a = 0
          let i = 0;
           db.collection("Lists").onSnapshot((qS) => {
             qS.forEach((doc) => {
              debugger
              let user = (doc.data().user) 
              let l = dbLenght("Lists"); 
              
              
              
               
              i++
             if(user === userx && a!==1){
               a = 1
               alert('You already have a list!')
              
               }
              
             
             
             if(i > l && a === 0 ){
              debugger
             db.collection('Lists').add({
                listadefilme: createlist,
                user: userx,
                listname: NL,
                
              })
              
              displayLists()
              a = 1
  
            }
             
            })
              
        })
        
      }
        
    }