function AddNote() {
    location.href = "addnote.html";
}

function SaveNote() {
    let contact = document.getElementById("floatingTextarea1").value;
    let title = document.getElementById("floatingTextarea2").value;

    // اجلب الملاحظات القديمة من localStorage أو أنشئ مصفوفة جديدة
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // أضف الملاحظة الجديدة
    notes.push({ title, contact });

    // خزنها مجددًا
    localStorage.setItem("notes", JSON.stringify(notes));

    // روح للصفحة الرئيسية
    location.href = "index.html";
}


function AddNote() {
    location.href = "addnote.html";
}

function SaveNote() {
    // تصحيح ترتيب الحقول: العنوان أولاً ثم المحتوى
    let title = document.getElementById("floatingTextarea1").value;
    let contact = document.getElementById("floatingTextarea2").value;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, contact });
    localStorage.setItem("notes", JSON.stringify(notes));
    location.href = "index.html";
}

function viewNote(index) {
    localStorage.setItem("viewNoteIndex", index);
    location.href = "viewnote.html";
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    location.reload();
}

window.onload = function () {
    if (window.location.pathname.includes("index.html")) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const MainCard = document.getElementById("MainCard");

        notes.forEach((note, index) => {
            const card = document.createElement("div");
            card.className = "card-body d-flex";
            card.style.alignItems = "center";
            MainCard.appendChild(card);

            const cardTitle = document.createElement("h5");
            cardTitle.textContent = note.title;
            cardTitle.className = "text fs-5 text-secondary";
            card.appendChild(cardTitle);

            // زر View
            const viewButton = document.createElement("button");
            viewButton.className = "btn btn-secondary ms-auto me-2";
            viewButton.textContent = "View";
            viewButton.onclick = function() {
                viewNote(index);
            };
            card.appendChild(viewButton);

            // زر Delete
            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger";
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                deleteNote(index);
            };
            card.appendChild(deleteButton);
        });
    }
    
    if (window.location.pathname.includes("viewnote.html")) {
        const viewNoteIndex = localStorage.getItem("viewNoteIndex");
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        
        if (viewNoteIndex !== null && notes[viewNoteIndex]) {
            const note = notes[viewNoteIndex];
            document.getElementById("ViewTitle").textContent = note.title;
            document.getElementById("ContactView").textContent = note.contact;
        } else {
            document.getElementById("ViewTitle").textContent = "Note not found";
            document.getElementById("ContactView").textContent = "Redirecting back...";
            setTimeout(() => {
                location.href = "index.html";
            }, 2000);
        }
    }
}