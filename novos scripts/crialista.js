
    
      const email = document.getElementById('email')
      const nickname = document.getElementById('nickname')
      const password = document.getElementById('password')
      const submit = document.getElementById('submit')
      const loginGoogleBtn = document.getElementById('loginGoogleBtn')

      loginGoogleBtn.addEventListener('click', function(){
        // if(!nickname.value){
        //   console.error("preencher nickname!!")
        //   return
        // }
        console.log("test");
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(){
          const user = firebase.auth().currentUser;
          console.log("user", user);
          db.collection("Lists").doc(user).set({
            nickname: firebase.auth().currentUser.displayName,
            user: user,
            listadefilme: `<section>
            <details>
            <summary id="lista">${firebase.auth().currentUser.displayName + " 's List"}</summary>
            <section id='${user}' class="filmesSelected">
            
            </section>
            </details>
            </section>`,
          listname: firebase.auth().currentUser.displayName + " 's List", 
  
          })
        })

      })

      submit.addEventListener('click', function (){
        if(!email.value || !password.value || !nickname.value){ 
          console.log('preencher dados');
          return;
          }



          firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then(function (data){
        console.log('user created', data);
        const user = firebase.auth().currentUser;
        db.collection("Lists").doc(user).set({
          nickname:nickname.value,
          user: user,
          listadefilme: `<section>
          <details>
          <summary id="lista">${nickname.value}</summary>
          <section id='${user}' class="filmesSelected">
          
          </section>
          </details>
          </section>`,
          listname: nickname.value+"'s List",

        })
        

      }).catch((err)=> console.log('err', err));
        firebase.auth().onAuthStateChanged(function (user) {
          // if(user) window.location = "index.html"
        })
      })
    
      function userList(){
        db.collection("Lists")
      .onSnapshot(
    (querySnapshot) => {
      let output = '';
      
      const putLists = document.getElementById('AllLists')

      querySnapshot.forEach((doc) => {
        let user_ = (doc.data().user)
        // let listaFilme = (doc.data().listadefilme)
        // // console.log(listaFilme)
        // let _listaname = (doc.data().listname) 
        
        if(user_ === user){
        output += `${doc.data().listadefilme}`;
        
          putLists.innerHTML = output
          
        }
      })
    })
    showMovies()
  }    userList()
  document.addEventListener('click', function(){showMovies()})

