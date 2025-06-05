const userList = document.getElementById("userList");
const errorMessage = document.getElementById("errorMessage");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userList.innerHTML = "";
  errorMessage.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const users = await response.json();

    users.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city} - ${user.address.zipcode}</p>
      `;

      userList.appendChild(card);
    });
  } catch (error) {
    errorMessage.textContent = "⚠️ Error: " + error.message;
  }
}

// Load users on page load
window.addEventListener("DOMContentLoaded", fetchUsers);

// Reload users on button click
reloadBtn.addEventListener("click", fetchUsers);

document.getElementById("searchInput").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".user-card");

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(keyword) ? "block" : "none";
  });
});

