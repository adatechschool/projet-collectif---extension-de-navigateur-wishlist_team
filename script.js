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
    } else {
      for (let i = 0; i < result.tabCollection.length; i++) {
        const newItem = document.createElement("ul");
        const newComment = document.createElement("li");
        newComment.setAttribute('id','item_comment')
        const newURL = document.createElement("li");
        newComment.innerText = result.tabCollection[i].comm;
        newURL.innerHTML += `<a target="_blank" href="${result.tabCollection[i].link}">Lien vers l'article</a>`;
        newItem.appendChild(newComment);
        newItem.appendChild(newURL);
        document.getElementById("collection").appendChild(newItem);
      }
    }
  });

}
