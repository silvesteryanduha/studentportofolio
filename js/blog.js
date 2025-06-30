let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
let editingIndex = null;

function renderBlogs() {
  const list = document.getElementById("portfolioList");
  const search = document.getElementById("searchInput").value.toLowerCase();
  list.innerHTML = "";

  blogs.filter(p => p.title.toLowerCase().includes(search)).forEach((proj, i) => {
    const card = `<div class="card">
      <h3>${proj.title}</h3>
      <p>${proj.desc}</p>
      <button onclick="editBlog(${i})"><i class="fas fa-edit"></i></button>
      <button onclick="deleteBlog(${i})"><i class="fas fa-trash"></i></button>
    </div>`;
    list.innerHTML += card;
  });
}

function addBlog() {
  editingIndex = null;
  document.getElementById("blogForm").style.display = "block";
  document.getElementById("blogTitle").value = "";
  document.getElementById("blogDesc").value = "";
}

function editBlog(index) {
  editingIndex = index;
  const proj = blogs[index];
  document.getElementById("blogTitle").value = proj.title;
  document.getElementById("blogDesc").value = proj.desc;
  document.getElementById("blogForm").style.display = "block";
}

function deleteBlog(index) {
  if (confirm("Yakin ingin menghapus proyek ini?")) {
    blogs.splice(index, 1);
    saveToStorage();
  }
}

function saveBlog() {
  const title = document.getElementById("blogTitle").value;
  const desc = document.getElementById("blogDesc").value;
  if (editingIndex !== null) {
    blogs[editingIndex] = { title, desc };
  } else {
    blogs.push({ title, desc });
  }
  saveToStorage();
}

function cancel() {
  document.getElementById("blogForm").style.display = "none";
}

function saveToStorage() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderBlogs();
  cancel();
}

document.getElementById("searchInput").addEventListener("input", renderBlogs);
renderBlogs();