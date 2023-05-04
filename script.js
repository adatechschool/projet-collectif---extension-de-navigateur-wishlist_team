// GET URL

function getWebsite() {
let site
    // if current url = */ma_liste.html alors
    if (document.url= "*/ma_liste.html") {
        displayList() 
    }

    document.getElementById('save').addEventListener('click',()=>{
        // get website
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        site = tabs[0].url
        console.log("site1 ", site)
        document.getElementById('url').innerText = site
      
     
        // afficher comment et website pour après les afficher sur ma_liste
        const comment = document.getElementById('comment').value
        

        chrome.storage.local.set({comm : comment, link: site}).then(() => {
            console.log("commentaire : ",comment);
            console.log("url is " + site)
        }) // ferme local storage
        }) // ferme query
        }) // ferme add event listener
return site
}
getWebsite()


function displayList (){
// afficher dans l'onglet ma liste le commentaire et l'url de l'article
chrome.storage.local.get(["comm","link"]).then((result) => {
    const newItem = document.createElement('ul')
    const newComment = document.createElement('li')
    const newURL = document.createElement('li')
    
    newComment.innerText = result.comm
    newURL.innerHTML += `<a href="${result.link}">Lien vers l'article</a>`

    newItem.appendChild(newComment)
    newItem.appendChild(newURL)

    document.getElementById('collection').appendChild(newItem)

});

}



