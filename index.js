document.addEventListener("DOMContentLoaded", renderNotes);

function renderNotes() {
  console.log("calling renderNotes();");

  sortedNotes.forEach((note) => {
    renderNoteEntry(note);
  });
}

function renderNoteEntry(note) {
  var noteEntryDiv = document.createElement("div");
  noteEntryDiv.classList.add("note-entry");

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

function saveNote() {
  console.log("saveNote() triggered");

  // 1. Get the values directly
  var titleValue = document.getElementById("title-input").value;
  var contentValue = document.getElementById("content-input").value;

  // 2. Check for empty strings (not null)
  if (titleValue.trim() === "" || contentValue.trim() === "") {
    alert("Bitte Titel und Inhalt eingeben!");
    return; // Stop the function here if empty
  }

  // 3. Create the object using the variables directly
  var currentNote = {
    id: Math.random(),
    title: titleValue, // No .nodeValue needed here!
    content: contentValue, // No .nodeValue needed here!
    lastUpdated: new Date().getTime(), // getTime() gives a full timestamp
  };

  console.log("New Note:", currentNote);

  // 4. Use .push() to add to your array (assuming your array is 'notes')
  notes.push(currentNote);

  // 5. Refresh the UI
  renderNotes();

  // 6. Optional: Clear the inputs after saving
  document.getElementById("title-input").value = "";
  document.getElementById("content-input").value = "";
}
