function crialistax(){
let NL = namelist.value
//create model list
let createlist = `<section>
<details>
<summary id="lista">${NL}</summary>
<section id='${userx}' class="filmesSelected">

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
}

