let empty 
async function run(){
  await db.collection('Lists').get().then((r)=> r.empty).then((r)=>{emptyList = r})
  
  }run()

function crialistax(){
let NL = namelist.value
//create model list
let createlist = `<section>
<details>
<summary id='${userx}'>${NL}</summary>
<section class="filmesSelected">

</section>
</details>
</section>`

if(!userx){
 alert('please Login',userx)
 return
}//If not puut a name 
if(!NL){
 alert('please choose a List Name')
 return
}//if list not exist
putLists.innerHTML = createlist;
debugger
db.collection('Lists').add({
  
  listadefilme: createlist,
  user: userx,
  listname: NL,
})
}

