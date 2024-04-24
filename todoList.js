console.log("I am ready");

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //   console.log("farooq haider");
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `          
            <div class="card mx-2 my-2 noteCard" style="width: 20rem;">
                <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.Note}</p>
                    <div>

                        <button href="#" class="btn btn-danger delete" id="${index}" >Delete Note</button>
                        <button href="#" class="btn btn-primary update" id="${index}" >update Note</button>
                    </div>
                    
                </div>
            </div>

            `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    // notesElm.appendChild(html);
  } else {
    notesElm.innerHTML = "Noting to show";
  }
}
showNotes();

document.getElementById("addBtn").addEventListener("click", function () {
  let myText = document.getElementById("addTxt");
  let myTitle = document.getElementById("addTitle");

  console.log(myTitle);
  console.log(myText);

  let notes = localStorage.getItem("notes");
  console.log(notes);
  if (notes == null) {
    notesObj = [];
  } else {
    //  console.log("farooq");
    notesObj = JSON.parse(notes);
  }

  if (myText.value != "") {
    let node = {
      title: myTitle.value,
      Note: myText.value,
    };
    notesObj.push(node);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    myText.value = "";
    myTitle.value = "";

    showNotes();
  }
});

//for delete a particular note
document.addEventListener("click", (e) => {
  let x = e.target;

  console.log(x);

  if (x.classList.contains("delete")) {
    let notes = localStorage.getItem("notes");
    notesObj = [];
    notesObj = JSON.parse(notes);

    notesObj.splice(x.id, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
});

/// update
document.addEventListener("click", (e) => {
  let x = e.target;

  if (x.classList.contains("update")) {
    let grandParent = x.parentElement.parentElement;
    let grandGrandParent = grandParent.parentElement;
    console.log(grandGrandParent, "dfad parent");
    let nodeTitle = grandParent.getElementsByTagName("h5")[0];

    let nodeText = grandParent.getElementsByTagName("p")[0];

    let html = `  <div class="card-title">
            <h5>Update note</h5>
            <textarea name="" id="title" cols="30" rows="1"></textarea>
        </div>
        <div class="card-note">
            <h5>Update note</h5>
            <textarea name="" id="message" cols="30" rows="2"></textarea>
        </div>

        <button href="#" class="col-7 mt-2 mb-1 mx-auto btn btn-primary" id="confirm">Confirm update</button>`;

    console.log(grandGrandParent);
    grandGrandParent.innerHTML = html;

    disableNotes();

    document.getElementById("title").value = nodeTitle.innerText;
    document.getElementById("message").value = nodeText.innerText;

    document.getElementById("confirm").addEventListener("click", function () {
      let title = document.getElementById("title");
      let message = document.getElementById("message");
      let node = {
        title: title.value,
        Note: message.value,
      };
      let notes = localStorage.getItem("notes");
      let notesObj = [];
      notesObj = JSON.parse(notes);
      notesObj.splice(e.target.id, 1, node);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
    });
  }
});

function disableNotes() {
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach((element) => {
    let cardText = element.firstElementChild;

    if (cardText.classList.contains("card-body")) {
      let cardText = element.firstElementChild;
      buttons = cardText.querySelector("div");
      button1 = buttons.getElementsByTagName("button")[0];
      button2 = buttons.getElementsByTagName("button")[1];
      button1.disabled = true;
      button2.disabled = true;
    }
  });
}
