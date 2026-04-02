document.addEventListener("DOMContentLoaded", renderNotes);

const notes = getNotes();

const createNewButton = document.querySelector(".create-new");
createNewButton.addEventListener("click", newNote);

const deleteNoteButton = document.querySelector(".delete-note");
deleteNoteButton.addEventListener("click", deleteButton);

var sortedNotes = notes.sort(
  (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
);

function applyListeners() {
  console.log("calling applyListeners();");

  const noteEntriesEl = document.querySelectorAll(".note-entry");
  console.log("value: " + noteEntriesEl);
  noteEntriesEl.forEach((noteEntry) => {
    console.log("test");
    noteEntry.addEventListener("click", () =>
      selectNote(noteEntry.getAttribute("data-id")),
    );
  });
}

function renderNotes() {
  console.log("calling renderNotes();");
  sortedNotes.forEach((note) => {
    renderNoteEntry(note);
  });
  applyListeners();
}

function renderNoteEntry(note) {
  var noteEntryDiv = document.createElement("div");
  noteEntryDiv.classList.add("note-entry");
  noteEntryDiv.setAttribute("data-id", note.id);
  var noteTitleDiv = document.createElement("div");
  noteTitleDiv.textContent = note.title;
  noteTitleDiv.classList.add("note-title");
  noteEntryDiv.appendChild(noteTitleDiv);

  var noteContentDiv = document.createElement("div");
  noteContentDiv.textContent = note.content;
  noteContentDiv.classList.add("note-content");
  noteEntryDiv.appendChild(noteContentDiv);

  var noteTimestampDiv = document.createElement("div");
  noteTimestampDiv.textContent = new Date(note.lastUpdated).toLocaleString(
    "de-DE",
  );
  noteTimestampDiv.classList.add("note-date");
  noteEntryDiv.appendChild(noteTimestampDiv);

  console.log(noteEntryDiv);
  if (noteEntryDiv) {
    document.getElementById("notes-list").appendChild(noteEntryDiv);
  }
}

function saveNoteButton() {
  console.log("saveNote() triggered");

  const titleValue = document.getElementById("title-input").value;
  const contentValue = document.getElementById("content-input").value;

  // 2. Check for empty strings (not null)
  if (titleValue === "" || contentValue === "") {
    alert("Bitte Titel und Inhalt eingeben!");
    return; // Stop the function here if empty
  }

  saveNote(titleValue, contentValue, Number(getCurrentlySelectedId()));

  // 3. Optional: Clear the inputs after saving
  document.getElementById("title-input").value = "";
  document.getElementById("content-input").value = "";
  renderNotes();
  applyListeners();
}

function selectNote(id) {
  const selectedNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);

  if (selectedNoteEl.classList.contains("selected-note")) return;

  removeSelectedClassFromAllNotes();
  selectedNoteEl.classList.add("selected-note");

  const notes = getNotes();

  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectedNote) return;

  document.getElementById("title-input").value = selectedNote.title;
  document.getElementById("content-input").value = selectedNote.content;
}

function newNote() {
  console.log("newNote() triggered");
  document.getElementById("title-input").value = "";
  document.getElementById("content-input").value = "";

  removeSelectedClassFromAllNotes();
}

function removeSelectedClassFromAllNotes() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });
}

function deleteButton() {
  const currentlySelectedId = getCurrentlySelectedId();
  if (!currentlySelectedId) return;

  deleteNote(currentlySelectedId);

  document.getElementById("title-input").value = "";
  document.getElementById("content-input").value = "";

  renderNotes();
  applyListeners();
}

function getCurrentlySelectedId() {
  let currrentId = undefined;

  const currentlySelectedNoteEl = document.querySelector(".selected-note");

  if (currentlySelectedNoteEl) {
    currrentId = currentlySelectedNoteEl.getAttribute("data-id");
  }
}
