let projects = JSON.parse(localStorage.getItem("projects")) || [];
let editingIndex = null;

function renderProjects() {
  const list = document.getElementById("portfolioList");
  const search = document.getElementById("searchInput").value.toLowerCase();
  list.innerHTML = "";

  projects.filter(p => p.title.toLowerCase().includes(search)).forEach((proj, i) => {
    const card = `<div class="card">
      <h3>${proj.title}</h3>
      <p>${proj.desc}</p>
      <button onclick="editProject(${i})"><i class="fas fa-edit"></i></button>
      <button onclick="deleteProject(${i})"><i class="fas fa-trash"></i></button>
    </div>`;
    list.innerHTML += card;
  });
}

function addProject() {
  editingIndex = null;
  document.getElementById("projectForm").style.display = "block";
  document.getElementById("projectTitle").value = "";
  document.getElementById("projectDesc").value = "";
}

function editProject(index) {
  editingIndex = index;
  const proj = projects[index];
  document.getElementById("projectTitle").value = proj.title;
  document.getElementById("projectDesc").value = proj.desc;
  document.getElementById("projectForm").style.display = "block";
}

function deleteProject(index) {
  if (confirm("Yakin ingin menghapus proyek ini?")) {
    projects.splice(index, 1);
    saveToStorage();
  }
}

function saveProject() {
  const title = document.getElementById("projectTitle").value;
  const desc = document.getElementById("projectDesc").value;
  if (editingIndex !== null) {
    projects[editingIndex] = { title, desc };
  } else {
    projects.push({ title, desc });
  }
  saveToStorage();
}

function cancel() {
  document.getElementById("projectForm").style.display = "none";
}

function saveToStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
  cancel();
}

document.getElementById("searchInput").addEventListener("input", renderProjects);
renderProjects();