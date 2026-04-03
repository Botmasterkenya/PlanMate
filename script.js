// PlanMate JavaScript

// RSVP button interaction
const rsvpButtons = document.querySelectorAll(".event-card button");

rsvpButtons.forEach(button => {
  button.addEventListener("click", () => {
    alert("You have successfully RSVP'd for this event!");
  });
});

// Contact form submission
const contactForm = document.querySelector(".contact-form form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    contactForm.reset();
  });
}

// Register form validation
const registerForm = document.querySelector(".register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    const password = registerForm.querySelector(".password").value;
    const confirmPassword = registerForm.querySelector(".confirm-password").value;

    if (password !== confirmPassword) {
      e.preventDefault();
      alert("Passwords do not match!");
    }
  });
}

// Task form functionality
const taskForm = document.getElementById("taskForm");
const taskTable = document.querySelector("#taskTable tbody");

if (taskForm && taskTable) {
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const assignedTo = document.getElementById("assignedTo").value;
    const deadline = document.getElementById("deadline").value;
    const status = document.getElementById("status").value;

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
      <td>${taskName}</td>
      <td>${assignedTo}</td>
      <td>${deadline}</td>
      <td>${status}</td>
    `;

    taskTable.appendChild(newRow);

    alert("Task added successfully!");
    taskForm.reset();
  });
}