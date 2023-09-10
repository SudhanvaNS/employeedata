document.addEventListener("DOMContentLoaded", async () => {
  // alert("hi");
      const loginForm = document.getElementById("loginForm");
  
      const passworderror=document.querySelector('.password.error');
      // emailerror.textContent="";
      passworderror.textContent="";
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value;

        const password = document.getElementById("loginPassword").value;
        // const ID = username;
        const api='http://localhost:3000/'
        try {
          const response = await fetch(`${api}teacher/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ teacher_id: username, password: password }),
          });
          // console.log("hi");
          const responseData = await response.json();
    
          if (response.ok) {  
            sessionStorage.setItem('Username',username);
            window.location.href = "teacher";      
           
          } else {  
            passworderror.textContent=responseData.error;            
          }
        } catch (error) {
          console.log(error);
          // Handle other errors here if needed
        }
      });
    });