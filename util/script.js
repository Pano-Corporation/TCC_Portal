
function handleLogin(event) {
    event.preventDefault();
    const inputID = document.getElementById('idNumber').value.trim();
    let found = false;

    student_details.forEach((student, studentIndex) => {
        if (student.IDNumber === inputID) {
            found = true;
            document.getElementById('student_name').innerText = student.name;
            document.getElementById('student_course').innerText = student.course;
            document.getElementById('student_idNumber').innerText = student.IDNumber;

            let enrolledInfoHTML = '';

            student.info.forEach((info, index) => {
                enrolledInfoHTML += `
                    <div class="row mb-2">
                        <div class="col-3 fw-bold">${info.sy}</div>
                        <div class="col-3 fw-bold">${info.sem}</div>
                        <div class="col-3 fw-bold">${info.status}</div>
                        <div class="col-3">
                            <button class="btn btn-danger" onclick="displaySemestralGrades(${studentIndex}, ${index})">View</button>
                        </div>
                    </div>
                `;
            });

            document.querySelector('.fetched_semester_data').innerHTML = enrolledInfoHTML;
            document.getElementById('logInPage').style.display = 'none';
            document.getElementById('account_ui').style.display = 'block';
        }
    });

    if (!found) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger mt-3';
        alertDiv.role = 'alert';
        alertDiv.innerText = 'Invalid ID, try again!.';
        
        const formGroup = document.querySelector('.form-group');
        
        formGroup.appendChild(alertDiv);
    
        setTimeout(() => {
            alertDiv.remove();
        }, 2000);
    }
    
}

function displaySemestralGrades(studentIndex, semesterIndex) {
    const student = student_details[studentIndex];

    document.getElementById('logInPage').style.display = 'none';
    document.getElementById('account_ui').style.display = 'none';
    document.getElementById('semestral_grade_ui').style.display = 'block';

    const semestralGrades = document.getElementById('semestral_grade_ui');
    semestralGrades.innerHTML = `
        <h2 class="text-center mt-5">Semester Grade</h2>
        <div class="container shadow mb-5 mt-2 pt-3 pb-2 text-start" id="semester_details">
            <p>School Year: <b>${student.info[semesterIndex].sy}</b></p>
            <p>Year Level: <b>${student.info[semesterIndex].level}</b></p>
            <p>Semester: <b>${student.info[semesterIndex].sem}</b></p>
        </div>

        <h3>Grades</h3>
        <div class="container text-center mt-2 shadow-lg rounded px-2 py-3" style="overflow: auto;">
            <div class="row">
                <div class="col-2"><strong>Subject Code</strong></div>
                <div class="col-4"><strong>Description</strong></div>
                <div class="col-2"><strong>Midterm Grade</strong></div>
                <div class="col-2"><strong>Final Grade</strong></div>
                <div class="col-2"><strong>Status</strong></div>
            </div>
            <hr>
            ${student.info[semesterIndex].subjects.map(subject => {
                const status = (parseFloat(subject.mid) + parseFloat(subject.fin)) / 2 <= 3.0;
                const status_color = status ? 'success' : 'danger';
                const status_text = status ? 'Passed' : 'Failed';

                return `
                    <div class="row mb-2">
                        <div class="col-2">${subject.code}</div>
                        <div class="col-4 text-start">${subject.desc}</div>
                        <div class="col-2">${subject.mid}</div>
                        <div class="col-2">${subject.fin}</div>
                        <div class="col-2 text-${status_color}">${status_text}</div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="directionButtons my-2">
            <button class="btn btn-primary" onclick="alert('Feature coming soon!')">Print</button>
            <button class="btn btn-warning" onclick="alert('Contact the Developer!')">Request Edit</button>
            <button class="btn btn-secondary" onclick="ui_account()">Go Back</button>
        </div>
    `;
}

function ui_login() {
    document.getElementById('logInPage').style.display = 'block';
    document.getElementById('account_ui').style.display = 'none';
    document.getElementById('semestral_grade_ui').style.display = 'none';
}

function ui_account() {
    document.getElementById('logInPage').style.display = 'none';
    document.getElementById('account_ui').style.display = 'block';
    document.getElementById('semestral_grade_ui').style.display = 'none';
}

function ui_semgrade() {
    document.getElementById('logInPage').style.display = 'none';
    document.getElementById('account_ui').style.display = 'none';
    document.getElementById('semestral_grade_ui').style.display = 'block';
}
