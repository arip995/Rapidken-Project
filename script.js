// Employee registration form submit event
document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const about = document.getElementById('about').value;
  const joiningDate = document.getElementById('joining_date').value;

  // Save employee details to browser storage
  const employee = {
    name,
    position,
    about,
    joiningDate,
  };

  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  employees.push(employee);
  localStorage.setItem('employees', JSON.stringify(employees));

  //Clear the form
  document.getElementById("registrationForm").reset();

  //Display employees
  displayEmployeesPerPage();

  // Redirect to the listing page
  document.getElementById("employeeListing").style.display = "block";
  document.getElementById("employeeRegistration").style.display = "none";
  
  console.log(employees)
});

const navbarToggle = document.getElementById('navbarToggle');
const navMenu = document.getElementById('navMenu');

navbarToggle.addEventListener('click', () => {
  navMenu.classList.toggle('nav-active');
});

// Function to display employees in the table
function displayEmployees(employees) {
  const tableBody = document.getElementById('employeeList');
  tableBody.innerHTML = '';

  employees.forEach((employee, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.about}</td>
      <td>${employee.joiningDate}</td>
      <td><button style="background-color:#db3434;" onclick="removeEmployee('${employee.name}')">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to remove an employee
function removeEmployee(name) {
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  const updatedEmployees = employees.filter(emp => emp.name !== name);
  localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  displayEmployees(updatedEmployees);
  displayEmployeesPerPage();
}

// Pagination
const employeesPerPage = 5;
let currentPage = 1;

document.getElementById('prevBtn').addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage--;
    displayEmployeesPerPage();
  }
});

document.getElementById('nextBtn').addEventListener('click', function () {
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  if (currentPage < Math.ceil(employees.length / employeesPerPage)) {
    currentPage++;
    displayEmployeesPerPage();
  }
});

function displayEmployeesPerPage() {
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const employeesToDisplay = employees.slice(startIndex, endIndex);
  displayEmployees(employeesToDisplay);
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', function () {
  const searchValue = this.value.toLowerCase();
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(searchValue));
  displayEmployees(filteredEmployees);
});

document.getElementById('employeeListingTab').addEventListener('click', () => {
  document.getElementById("employeeListing").style.display = "block";
  document.getElementById("employeeRegistration").style.display = "none";
})
document.getElementById('employeeRegistrationTab').addEventListener('click', () => {
  document.getElementById("employeeListing").style.display = "none";
  document.getElementById("employeeRegistration").style.display = "block";
})

// On load, display employees with pagination
displayEmployeesPerPage();
