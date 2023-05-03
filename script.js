// GET URL

function getWebsite() {
let site
    document.getElementById('save').addEventListener('click',()=>{
        // get website
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        site = tabs[0].url
        console.log("site1 ", site)
        document.getElementById('url').innerText = site
      
     
        // afficher comment et website pour après les afficher sur ma_liste
        const comment = document.getElementById('comment').value
        console.log(comment)
        console.log(site)
      })
    })
return site
}
getWebsite()






