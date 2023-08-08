document.addEventListener('DOMContentLoaded', function () {
    const addStudentFormEl = document.getElementById('addStudentForm');
    console.log(addStudentFormEl);
    addStudentFormEl.addEventListener('submit', async function (event) {
        event.preventDefault();
        const usnInput = document.getElementById('usn');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const genderInputs = document.querySelectorAll('[name="gender"]');
        let selectedGender = '';

        genderInputs.forEach(input => {
            if (input.checked) {
                selectedGender = input.value;
            }
        });

     

        const formData = {
            usn: usnInput.value,
            name: nameInput.value,
            phone: phoneInput.value,
            gender: selectedGender,
            teacher_id : '1',
        };
        console.log(formData);
        try {
            const response = await fetch(`http://localhost:3000/api/student/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message);
                window.location.href="student.html";
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.error);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
});