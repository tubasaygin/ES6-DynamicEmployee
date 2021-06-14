class Employee{
    constructor(fullname, dateOfBirth, department, salary, image){
        this.fullname = fullname;
        this.dateOfBirth = dateOfBirth;
        this.department = department;
        this.salary = salary;
        this.image = image;
    }
}
function search(){
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

class Storage{
    static getEmployees(){
        let employees;
        if(localStorage.getItem('employees')===null){
            employees = [];
        }else{
            courses = JSON.parse(localStorage.getItem('employees'));
        }

        return employees;
    
    }

    static displayEmployees(){
        const employees = Storage.getEmployees();

        employees.forEach(employee => {
            addList(employee);
        })
    }

    static addEmployee(){
        const employees = Storage.getEmployees();
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));
    }
    static deleteEmployees(){
        /*
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');
        
            const courses = Storage.getCourses();

            courses.forEach((course,index)=>{
                if(course.courseId == id){
                    courses.splice(index,1);
                }
            });

            localStorage.setItem('courses',JSON.stringify(courses));
        }
        */
    }
}

function warningMessage(message, color){
    const messageAdd = document.getElementById('message');
    var alert = `
         <div class="alert alert-${color}">
            ${message}
         </div>    
        `;
    
    
    messageAdd.innerHTML = alert;

    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000);
}

function deleteBtn(){
    
    const li = document.getElementById("liste");
    li.remove();

    //remove from localStorage:
    //localStorage.deleteEmployees();

    warningMessage("Employee removed from list", 'danger');
}
function addList(employee){
    var ul = document.getElementById("list")

    var html = `
        <li id = "liste" style = "list-style-type: none;">
            <div class="card border-success mb-3" style="max-width: 36rem;">
                <div class="card-header" style="color:red; font-size:25px">${employee.fullname}
                <button onclick="deleteBtn()" id = "deleteButton"  type="button" class="btn btn-danger delete">Delete

                </button>
           
                </div>
                <div class="card-body text-success">
                    <h5 class="card-title">${employee.department}</h5>
                    <hr>
                    <p class="card-text">Date of Birth : ${employee.dateOfBirth}</p>
                    <p class="card-text">Salary : ${employee.salary}</p>
                </div>
            </div>
        
        </li>
    
    `;
    
    ul.innerHTML += html;
    
    warningMessage("Employee added to list ", 'success');

}

document.addEventListener('DOMContentLoaded',Storage.displayEmployees);
const formSubmit = document.querySelector('#formsubmit');

//What will happen when the button is clicked?
formSubmit.addEventListener('click', function(e){
    var employee = new Employee();
    employee.fullname = document.getElementById("fullname").value;
    employee.dateOfBirth = document.getElementById("dateOfBirth").value;
    employee.department = document.getElementById("department").value
    employee.salary = document.getElementById("salary").value;
    employee.image = document.getElementById("image").value;
    
    if(employee.fullname === "" || employee.salary === ""){
        alert("Please fill in the required fields");
    }else{
        addList(employee);

        //add to localStorage:
        localStorage.addEmployees(employee);
    }


    e.preventDefault();
    
})



