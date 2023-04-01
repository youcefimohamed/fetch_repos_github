
let theinput = document.querySelector(".get-repos input")
let getbutton = document.querySelector(".get-repos .get-button")
let reposData =  document.querySelector(".show-data")

getbutton.onclick = function(){
   
   getrepos()

}


function getrepos(){

   if(theinput.value ==""){
      
      reposData.innerHTML = "<span>Please Write GitHub UserName</span>";
      
   }else{

      fetch(`https://api.github.com/users/${theinput.value}/repos`)
      .then((response)=> {
         return response.json()
      })
      .then((repos) => {
         if(repos.message == "Not Found"){
            reposData.innerHTML = `" ${theinput.value} "  not found Donner un autre UserName`
         }else{
         reposData.innerHTML = "";
         repos.forEach((data,index) => {

            let mydiv = document.createElement("div")
            let divtext = document.createTextNode(`${index+1} -)  ${data["name"]}`)
            mydiv.appendChild(divtext)
            
            
            let theurl = document.createElement("a")
            let theurltext = document.createTextNode("Visit")
            theurl.setAttribute("target","_blank")
            theurl.href = `https://github.com/${theinput.value}/${data.name}`

            theurl.appendChild(theurltext)
            
            let Starsspan = document.createElement("span")
            let Starstext = document.createTextNode(`Stars ${data.stargazers_count}`)

            Starsspan.appendChild(Starstext)

            mydiv.appendChild(Starsspan)
            mydiv.appendChild(theurl)
            reposData.appendChild(mydiv)
            
         });
      }
      })
}

}
