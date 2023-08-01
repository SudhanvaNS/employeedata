document.addEventListener("DOMContentLoaded", async () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("/api/teacher/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacher_id: username, password: password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Authentication successful
        loginMessage.className = "alert alert-success";
        loginMessage.textContent = responseData.message;
        loginMessage.style.display = "block";

        // Redirect to the desired page after successful login
        window.location.href = "/employeedata/Templates/index.html";
      } else {
        // Authentication failed
        loginMessage.className = "alert alert-danger";
        loginMessage.textContent = responseData.error;
        loginMessage.style.display = "block";
      }
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle other errors here if needed
    }
  });
});
