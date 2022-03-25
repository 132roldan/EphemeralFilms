function displayLists(){
  db.collection("Lists")
          .onSnapshot(
        (qS) => {
          let Io = '';
          const putLists = document.getElementById('AllLists')
  
          qS.forEach((doc) => {
            //check if is the current user
            if(`${doc.data().user}` === userx){
            Io += `${doc.data().listadefilme}`;
            //get userID
                         
            }
            putLists.innerHTML = Io;
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