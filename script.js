// GET URL

function getWebsite() {
  let site;
  // if current url = */ma_liste.html alors
  if ((document.url = "*/ma_liste.html")) {
    displayList();
    //deleteItem();
  }

  document.getElementById("save").addEventListener("click", () => {
    // get website
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      site = tabs[0].url;
      console.log("site1 ", site);
      document.getElementById("saved").innerText = "Saved !";

      // afficher comment et website pour après les afficher sur ma_liste
      const comment = document.getElementById("comment").value;

      chrome.storage.local.get(["tabCollection"]).then((result) => {
        let newItem = { comm: comment, link: site };
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

    if (result.tabCollection == null) {
      const empty = document.createElement("p");
      empty.innerText = "Votre liste est vide";
      document.getElementById("collection").appendChild(empty);
    } 
    else {
      for (let i = 0; i < result.tabCollection.length; i++) {
        const newItem = document.createElement("ul");
        const newComment = document.createElement("li");
        const newDeleteButton = document.createElement("button");
        newItem.setAttribute('id', `ul_number${i}`);
        newDeleteButton.setAttribute('id', `delete_button${i}`);
        newComment.setAttribute('id','item_comment');
        const newURL = document.createElement("li");
        newComment.innerText = result.tabCollection[i].comm;
        newURL.innerHTML += `<a target="_blank" href="${result.tabCollection[i].link}">Lien vers l'article</a>`;
        newDeleteButton.innerHTML += `<img src="images/bin.png" alt="delete_icon" />`;
        newItem.appendChild(newComment);
        newItem.appendChild(newURL);
        newItem.appendChild(newDeleteButton);
        document.getElementById("collection").appendChild(newItem);
        document.getElementById(`delete_button${i}`).addEventListener("click", () => {
          //addeventlistener pour dire qu'on clique sur le bouton delete de telle ul
          //if le bouton est cliqué, supprimer le ul à cet index du tableau tabCollection
          //idem supprimer du local storage chrome
          //document.getElementById(`'ul_number${i}'`).remove()
          // chrome.storage.local.remove("tabCollection[i]")
          // const ul = event.target.parentElement
          document.getElementById(`ul_number${i}`).remove()
          console.log("tabcollection",result.tabCollection[i])
          //chrome.storage.local.remove(result.tabCollection[i])
          // this.newItem.style.display = 'none';
          alert("Ca a marché")
          
        })
      }
    }
  });
    
}

// function deleteItem () {
    
// }
