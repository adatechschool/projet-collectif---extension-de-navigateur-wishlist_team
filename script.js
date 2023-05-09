// GET URL

function getWebsite() {
  let site;
  // if current url = */ma_liste.html alors
  if ((document.url = "*/ma_liste.html")) {
    displayList();
  }

  document.getElementById("save").addEventListener("click", () => {
    // get website
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      site = tabs[0].url;
      console.log("site1 ", site);
      document.getElementById("saved").innerText = "Saved !";

      // afficher comment et website pour après les afficher sur ma_liste
      const comment = document.getElementById("comment").value;
      const title_item=document.getElementById('title_item').value;

      chrome.storage.local.get(["tabCollection"]).then((result) => {
        let newItem = { title:title_item, comm: comment, link: site };
        let collection = result.tabCollection;
        if (collection == null) {
          collection = [];
        }
        console.log("get", collection);
        collection.push(newItem);
        chrome.storage.local.set({ tabCollection: collection }).then(() => {
          console.log("commentaire : ", comment);
          console.log("url is " + site);
          console.log("collection ", collection);
        });
      }); // ferme local storage
    }); // ferme query
  }); // ferme add event listener
  return site;
}
getWebsite();


function displayList() {
  // afficher dans l'onglet ma liste le commentaire et l'url de l'article

  chrome.storage.local.get(["tabCollection"]).then((result) => {
    console.log("result", result);

    if (result.tabCollection == 0) {
      const empty = document.createElement("p");
      empty.innerText = "Your wishlist is empty 😥";
      document.getElementById("collection").appendChild(empty);
    } 
    else {
      for (let i = 0; i < result.tabCollection.length; i++) {
        const newItem = document.createElement("ul");
        const newComment = document.createElement("li");
        const newDeleteButton = document.createElement("button");
        const newTitle = document.createElement("h3")
        const newURL = document.createElement("li");
        newItem.setAttribute('id', `ul_number${i}`);
        newDeleteButton.setAttribute('id', `delete_button ${i}`);
        newComment.setAttribute('id','item_comment');
        newTitle.setAttribute('id','title_item')
        
        newComment.innerText = result.tabCollection[i].comm;
        newURL.innerHTML += `<a target="_blank" href="${result.tabCollection[i].link}">Lien vers l'article</a>`;
        newDeleteButton.innerHTML += `<img src="images/bin.png" alt="delete_icon" />`;
        newTitle.innerText =result.tabCollection[i].title;
        newItem.appendChild(newTitle)
        newItem.appendChild(newComment);
        newItem.appendChild(newURL);
        newItem.appendChild(newDeleteButton);
        document.getElementById("collection").appendChild(newItem);
        document.getElementById(`delete_button ${i}`).addEventListener("click", () => {
      
          //remove element de l'affichage
          document.getElementById(`ul_number${i}`).remove()
          console.log("tabcollection",result.tabCollection[i])

          // remove element du tableau storage
          let deletedItem=result.tabCollection.splice(i,1);
          console.log(deletedItem)

            // set nouveau resultat (avec élément supprimé)
          chrome.storage.local.set({tabCollection:result.tabCollection}).then(() => {
            console.log("resultat",result.tabCollection)
            
          });
          
        })
      }
    }
  });
  // récuperation nouveau tableau (avec élement supprimé)
  chrome.storage.local.get(["tabCollection"]).then((result)=>{
    console.log("newTab",result)
  }); 
}

