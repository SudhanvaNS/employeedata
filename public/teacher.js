document.addEventListener("DOMContentLoaded", () => {
    var Username = sessionStorage.getItem('Username');
    fetch(`${apiUrl}student/getall/${Username}`)
        .then(response => response.json())
        .then(data => loadHTMLTable(data))
        .catch(error => {
            console.error("Error fetching data:", error);
            // Handle error, e.g., display an error message on the page.
        });
});
const logoutbtn=document.getElementById("logout");
logoutbtn.addEventListener("click", ()=>{
    fetch(`http://localhost:3000/teacher/logout`)
    .then(response=>response.json())
    .then(location.reload())
    .catch(error=>{
        console.error("error logging out",error);
    });
    location.reload
})
var Username = sessionStorage.getItem('Username');

function loadHTMLTable(data) {
    const table = document.querySelector('#table');
    console.log(data);
    const clothSize = data;
    if (clothSize.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4'>No Data </td></tr>";
        return;
    }
    console.log(data);
    clothSize.forEach(item => {
        const newRow = document.createElement("tr");
        newRow.className = "datarow";
        newRow.innerHTML = `
            <td>${item.usn}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.gender}</td>
            <td><button class="delete-row-btn" data-id=${item.usn}>Delete</td>
            <td><button class="edit-row-btn" data-id=${item.usn}>Edit</td>
        `;

        const deleteButton = newRow.querySelector(".delete-row-btn");
        deleteButton.addEventListener("click", () => {
            const usn = deleteButton.getAttribute("data-id");
            deleteClothSize(usn);
        });
        const editButton = newRow.querySelector(".edit-row-btn");
        editButton.addEventListener("click", () => {
            const usn = editButton.getAttribute("data-id");
            handleEditRow(usn)
        });
        table.appendChild(newRow);
    });
}

const formel = document.querySelector('#add-form')
formel.addEventListener("submit", async (event) => {
    event.preventDefault();
    const USN = document.getElementById('USN').value;
    const Name = document.getElementById('Name').value;
    const PHONE = document.getElementById('PHONE').value;
    const Gender = document.getElementById('Gender').value;
    createClothSize(USN, Name,PHONE,Gender,Username);
    
    document.getElementById('USN').value = ""
    document.getElementById('Name').value = ""
    document.getElementById('PHONE').value = ""
    document.getElementById('Gender').value = ""

});

const apiUrl = "http://localhost:3000/";
async function createClothSize(usn, name,phone,gender,teacher_id) {
    try {
        const response = await fetch(`${apiUrl}student/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usn,name,phone,gender,teacher_id }),
        })
        // console.log(response.json())
        if (response.ok) {
            location.reload()
        } else {
            alert(error("Error creating student", response.statusText));
        }
    } catch (error) {
        console.error("Error creating student", error);
    }
}

async function deleteClothSize(usn) {
    try {
        const response = await fetch(`${apiUrl}student/delete/${usn}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            location.reload();
        } else {
            console.error("Error deleting student:", response.statusText);
        }
    } catch (error) {
        console.error("Error deleting student:", error);
    }
}

function handleEditRow(usn) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    const btn = document.querySelector("#update-row-btn");

    btn.addEventListener("click", (event) => {
        event.preventDefault(); 
        const teacher_id = document.querySelector("#update-student-teacher").value;
     
        updateClothSize(usn, teacher_id);
        document.querySelector("#update-student-teacher").value = "";
    });
}

async function updateClothSize(usn, teacher_id) {
    try {
        const response = await fetch(`${apiUrl}student/put/${usn}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ teacher_id }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            alert("operation updated succesfully")
            location.reload();
        } else {
            console.error("Error updating stydent:", response.statusText);
        }
    } catch (error) {
        console.error("Error updating student:", error);
    }
}