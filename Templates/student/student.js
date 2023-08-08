document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:3000/api/student/getAll';

    function createDeleteButton() {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'Delete';
        return deleteButton;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('tbody');
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.usn}</td>
                    <td>${student.name}</td>
                    <td>${student.phone}</td>
                    <td>${student.gender}</td>
                    <td>
                        <button class="btn btn-primary">Edit</button>
                        <button class="btn btn-danger delete-button">Delete</button>
                    </td>
                `;

                const deleteButton = row.querySelector('.delete-button');
                deleteButton.addEventListener('click', async () => {
                    const confirmDelete = confirm('Are you sure you want to delete this student?');
                    if (confirmDelete) {
                        try {
                            const response = await fetch(`http://localhost:3000/api/student/delete/${student.usn}`, {
                                method: 'DELETE'
                            });

                            if (response.ok) {
                                row.remove(); // Remove the deleted row from the table
                            } else {
                                console.error('Error deleting student:', response.statusText);
                            }
                        } catch (error) {
                            console.error('Error deleting student:', error);
                        }
                    }
                });

                tableBody.appendChild(row);
            });

            const addStudentRow = document.createElement('tr');
            addStudentRow.innerHTML = `
                <td colspan="5" class="text-center">
                    <a href="addStudent.html" style="margin-top: 3%" class="btn btn-warning">Add Student</a>
                </td>
            `;
            tableBody.appendChild(addStudentRow);
        })
        .catch(error => console.error('Error fetching data:', error));
});

