function displayLists(){
  db.collection("Lists")
          .onSnapshot(
        (querySnapshot) => {
          let output = '';
          const putLists = document.getElementById('AllLists')
  
          querySnapshot.forEach((doc) => {
            console.log("doc.data do forEach", doc.data())
            if(`${doc.data().user}` === userx){
            output += `${doc.data().listadefilme}`;
            //get userID
            
              
            }
            putLists.innerHTML = output;
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