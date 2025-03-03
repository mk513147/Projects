let pName = document.getElementById("project");
let pLink = document.getElementById("fileOutput");
let pStatus = document.getElementById("status");
let tableBody = document.getElementById("tableBody");
let addBtn = document.getElementById("addButton");
let modal = document.getElementById('modal');
let closeModalBtn = document.getElementById('closeButton');
let openModalBtn = document.getElementById('openModal');
let fallbackMsg = document.querySelector('.failMsg')
let isEditing = false;

let projects = JSON.parse(localStorage.getItem("projects")) || [];

// Function to limit words in the project name
function enforceWordLimit(element, maxWords = 5, maxCharsPerWord = 10) {
  element.addEventListener("input", function () {
    let words = this.value.trim().split(/\s+/);

    words = words.map(word =>
      word.length > maxCharsPerWord ? word.slice(0, maxCharsPerWord) : word
    );

    if (words.length > maxWords) {
      words = words.slice(0, maxWords);
    }

    let cursorPosition = this.selectionStart;
    this.value = words.join(" ") + (this.value.endsWith(" ") ? " " : "");

    this.setSelectionRange(cursorPosition, cursorPosition);
  });
}

enforceWordLimit(pName, 3);


function toggleEdit(row, isEditing) {
  row.querySelector('.view-mode').classList.toggle('hidden', isEditing);
  row.querySelector('.edit-mode').classList.toggle('hidden', !isEditing);

  const nameCell = row.querySelector('td:nth-child(2) a');

  if (isEditing) {
    document.querySelectorAll(".edit-button, .delete-button").forEach((btn) => {
      if (!row.contains(btn)) btn.disabled = true;
    });
  
    const input = document.createElement("input");
    input.type = "text";
    input.value = nameCell.innerText;
    input.classList.add("border-b-2", "outline-0", "bg-gray-800", "rounded-lg", "p-2", "text-white", "w-full", "h-full");
    nameCell.classList.remove("hover:bg-gray-200/20");
    nameCell.innerHTML = "";
    nameCell.appendChild(input);
    input.focus();
  
    enforceWordLimit(input, 3);
  
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nameCell.innerText = input.value;
      }
    });

    input.addEventListener("blur", () => {
      nameCell.innerText = input.value;
    });


  } else {
    document.querySelectorAll(".edit-button, .delete-button").forEach((btn) => btn.disabled = false)
    nameCell.classList.add("hover:bg-gray-200/20");

  }
}

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
}

function displayProjects() {
  tableBody.innerHTML = projects
    .map((obj, index) => `
      <tr class="border-b-1 border-gray-400" data-id="${obj.id}">
        <td class="text-center p-2">${index + 1}.</td>
        <td class="text-center p-2 overflow-hidden max-w-[150px]">
          <a href="${obj.link}" class="p-2 w-36 h-15 hover:bg-gray-200/20 rounded-md cursor-pointer block w-full h-full font-semibold">
            ${obj.name}
          </a>
        </td>
       <td class="text-center w-36 p-2">
          <select
            class="status-select outline-0 bg-gray-900 rounded-lg p-2 text-white w-full"
            data-id="${obj.id}"
          >
            <option value="pending" ${obj.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="working" ${obj.status === "working" ? "selected" : ""}>In Progress</option>
            <option value="completed" ${obj.status === "completed" ? "selected" : ""}>Completed</option>
          </select>
        </td>
        <td class="flex justify-center items-center p-2">
  <div class="view-mode flex gap-2">
    <button type="button" class="edit-button cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#4ade80" class="flex items-center justify-center w-5 h-5">
    <path d="M18.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM16.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
    <path d="M4.25 5.25a3 3 0 0 0-3 3v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3V12.5a.75.75 0 0 0-1.5 0v4.25a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h4.25a.75.75 0 0 0 0-1.5H4.25Z" />
  </svg>
          </button>
    <button type="button" class="delete-button cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke-width="1.5" stroke="#f87171" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m12.74 7-.346 7m-3.788 0L7.26 7m8.968-2.71c.342.052.682.107 1.022.166m-1.022-.165L16.16 16.673a2.25 2.25 0 0 1-2.244 2.077H6.084a2.25 2.25 0 0 1-2.244-2.077L3.772 4.29m12.456 0a38.108 38.108 0 0 0-3.478-.297m-10 .462c.34-.059.68-.114 1.022-.165m0 0a38.11 38.11 0 0 1 3.478-.297m6.5 0v-.816c0-1.08-.91-1.964-2.09-2.001a41.964 41.964 0 0 0-3.32 0c-1.18.037-2.09.921-2.09 2.001v.816m6.5 0a38.667 38.667 0 0 0-6.5 0" />
      </svg>
    </button>
  </div>

  <div class="edit-mode hidden flex gap-2">
    <button type="button" class="save-button cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#4ade80" class="w-5 h-5">
        <path fill-rule="evenodd" d="M16.707 5.707a1 1 0 0 0-1.414-1.414L8 11.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8Z" clip-rule="evenodd" />
      </svg>
    </button>
    <button type="button" class="cancel-button cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#f87171" class="w-5 h-5">
        <path fill-rule="evenodd" d="M14.707 5.293a1 1 0 0 0-1.414 0L10 8.586 6.707 5.293a1 1 0 1 0-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 0 0 1.414 1.414L10 11.414l3.293 3.293a1 1 0 0 0 1.414-1.414L11.414 10l3.293-3.293a1 1 0 0 0 0-1.414Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</td>
      </tr>
    `)
    .join("");
}



// Function to update localStorage when status changes
function updateStatus(event) {
  const projectId = event.target.dataset.id;
  const newStatus = event.target.value;

  // Update projects array
  const projectIndex = projects.findIndex((p) => p.id == projectId);
  if (projectIndex !== -1) {
    projects[projectIndex].status = newStatus;
    saveProjects();
    displayProjects();
  }
}


//function to get link from the files input
document.getElementById("link").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    pLink.value = file.name;
  }
});

// function to add project
addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!pName.value || !pLink.value || !pStatus.value) {
    alert("Please fill all fields!");
    return;
  }

  let link = `./${toCamelCase(pName.value)}/${pLink.value}`;
  let obj = {
    id: Date.now(),
    name: pName.value,
    status: pStatus.value,
    link,
  };

  projects.push(obj);
  saveProjects();
  displayProjects();
  pName.value = "";
  pLink.value = "";
});

// functions to open/close modal;
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.style.display = "flex";
  setTimeout(() => {
    modal.classList.remove("opacity-0", "scale-90");
    modal.classList.add("opacity-100", "scale-100");
  }, 10);
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("opacity-100", "scale-100");
  modal.style.display = "none";
  modal.classList.add("opacity-0", "scale-90");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
});


//delete/edit function use event delegation as the table loads dynamically
document.addEventListener("DOMContentLoaded", () => {
  tableBody.addEventListener("click", (event) => {
    const row = event.target.closest("tr");
    if (!row) return;
    const projectId = Number(row.dataset.id);
    const project = projects.find((project) => project.id === projectId);
    if (!project) return;

    if (event.target.closest(".delete-button")) {
      projects = projects.filter((p) => p.id !== projectId);
      row.remove();
      saveProjects();
      displayProjects();
    }
    if (event.target.closest(".edit-button")) {
      toggleEdit(row, true);
      row.dataset.originalName = project.name;
    }
    if (event.target.closest(".cancel-button")) {
      toggleEdit(row, false);
      project.name = row.dataset.originalName;
      displayProjects();
    }
    if (event.target.closest(".save-button")) {
      const nameCell = row.querySelector('td:nth-child(2) a');
      const updatedName = nameCell.textContent.trim();

      project.name = updatedName;
      saveProjects();
      displayProjects();
      toggleEdit(row, false);

    }
  // **Event delegation for status changes**
  tableBody.addEventListener("change", (event) => {
    if (event.target.classList.contains("status-select")) {
      updateStatus(event);
    }
  });
  });
});


// function if online css fails
function loadFallback() {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "./fallback.css";
  document.head.appendChild(link);
  fallbackMsg.textContent = "Online CSS failed, loading fallback.css";
  setTimeout(() => {
    fallbackMsg.textContent = "";
  }, 3000)
}

// function when window loads
window.addEventListener("load", function () {

  const testElement = document.createElement("div");
  testElement.className = "hidden";
  document.body.appendChild(testElement);

  const isTailwindLoaded = getComputedStyle(testElement).display === "none";
  document.body.removeChild(testElement);

  if (!isTailwindLoaded) {
    loadFallback();
  }
  displayProjects();
});
