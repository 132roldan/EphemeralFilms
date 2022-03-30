const db = firebase.firestore()
let count = 0
let n = ''

function getUserUid() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            userx = user.uid;
            console.log('usuarioID', userx)
        } else {
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

function displaylists() {

    db.collection("Lists").onSnapshot((qS) => {
        //get Users
        qS.forEach((doc) => {

            let user = (doc.data().user)
            let listaFilme = (doc.data().listadefilme)
            let _listaname = (doc.data().listname)

            AllLists.innerHTML += listaFilme

            db.collection('Lists').doc(user).collection(user).onSnapshot((qS) => {

                let output = '';
                const secData = document.querySelector(`#${user}`)
                secData.innerHTML = output;
                //get movies
                qS.forEach((doc) => {
                    console.log(doc.data().movie)

                    output += `<li id='${doc.id}' >${doc.data().movie}</li>`
                    secData.innerHTML = output;
                })


            })

        })

    })
}
displaylists()



function check(element) {
    const db = firebase.firestore();

    //Select movie card
    const selected = element.parentElement;

    if (element.getAttribute('class') === 'delet') {
        element.innerHTML = "SELECT";
        element.removeAttribute('class', 'delet')
        element.setAttribute('class', 'choose')

        let getid = selected.getAttribute('id')
        console.log('esse eh o getid', getid)
        db.collection(`Lists`).doc(userx).collection(`${userx}`).doc(`${getid}`).delete()

    } else {

        const colocar = document.querySelector('.filmesSelected')


        element.innerText = "Delete"
        element.setAttribute('class', "delet")
            //

        //
        //  let userx = firebase.auth().currentUser
        db.collection('Lists').doc(userx).collection(userx).add({
            movie: selected.innerHTML,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),


        }).then(function(doc) {
            console.log('Document written with id:', doc.id);
            selected.setAttribute("id", doc.id)
            selected = '';
            contagem()


        }).catch(function(err) {
            console.log(error, err)
        })
    }

}

function contagem() {
    db.collection(`Lists`).doc(userx).collection(userx).onSnapshot((qs) => {
        let i = 0
        qs.forEach((r) => i++)
        count = i

        db.collection('Lists').doc(userx).get().then((r) => n = r.data().listname).then((r) => db.collection('Lists').doc(userx).update({

            listadefilme: `<section>
        <details>
        <summary id="lista">${n}(${count})</summary>
        <section id='${userx}' class="filmesSelected">
        
        </section>
        </details>
        </section>`,
        }))

    })
}

function showProfilePic() {
    var profilePic = document.getElementById("profile-pic");
    setTimeout(
        function() {
            try {
                let photoURL = firebase.auth().currentUser.photoURL
                if (photoURL)
                    profilePic.src = photoURL;
                else
                    profilePic.src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

            } catch {
                profilePic.src = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
            }
        },
        1000
    )

}
showProfilePic()


document.addEventListener('click', function() { contagem() })