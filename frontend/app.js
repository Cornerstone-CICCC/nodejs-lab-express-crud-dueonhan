const API_URL = "http://localhost:4000/employees";

const getEmployees = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Failed to get employees: ${res.statusText}`);
  return await res.json();
};

const addEmployee = async (firstname, lastname, age, isMarried) => {
  console.log("API_URL", API_URL);
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });
  if (!res.ok) throw new Error(`Failed to add employee: ${res.statusText}`);
  return await res.json();
};

const updateEmployee = async (id, firstname, lastname, age, isMarried) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });
  if (!res.ok) throw new Error(`Failed to update employee: ${res.statusText}`);
  return await res.json();
};

const deleteEmployee = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete employee: ${res.statusText}`);
  return true;
};

const searchEmployees = async (keyword) => {
  const res = await fetch(`${API_URL}/search?keyword=${keyword}`);
  if (!res.ok) throw new Error(`Failed to search employees: ${res.statusText}`);
  return await res.json();
};

const renderEmployees = (employees) => {
  const ul = document.getElementById("employees");
  ul.innerHTML = "";

  employees.forEach((emp) => {
    const li = document.createElement("li");
    li.textContent = `${emp.firstname} ${emp.lastname} - ${emp.age} yrs`;

    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View";
    viewBtn.onclick = () => alert(JSON.stringify(emp, null, 2));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => fillEditForm(emp);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      if (confirm("Are you sure you want to delete this employee?")) {
        await deleteEmployee(emp.id);
        loadEmployees();
      }
    };

    li.append(viewBtn, editBtn, delBtn);
    ul.appendChild(li);
  });
};

const fillEditForm = (emp) => {
  document.getElementById("editId").value = emp.id;
  document.getElementById("editFirstname").value = emp.firstname;
  document.getElementById("editLastname").value = emp.lastname;
  document.getElementById("editAge").value = emp.age;
  document.getElementById("editIsMarried").checked = emp.isMarried;
};

document.addEventListener("DOMContentLoaded", () => {
  loadEmployees();

  document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const age = parseInt(document.getElementById("age").value);
    const isMarried = document.getElementById("isMarried").checked;

    await addEmployee(firstname, lastname, age, isMarried);
    e.target.reset();
    loadEmployees();
  });

  document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const firstname = document.getElementById("editFirstname").value;
    const lastname = document.getElementById("editLastname").value;
    const age = parseInt(document.getElementById("editAge").value);
    const isMarried = document.getElementById("editIsMarried").checked;

    await updateEmployee(id, firstname, lastname, age, isMarried);
    e.target.reset();
    loadEmployees();
  });

  document.getElementById("searchBtn").addEventListener("click", async () => {
    const keyword = document.getElementById("searchKeyword").value.trim();
    if (!keyword) {
      loadEmployees();
      return;
    }
    const results = await searchEmployees(keyword);
    renderEmployees(results);
  });
});

const loadEmployees = async () => {
  const employees = await getEmployees();
  renderEmployees(employees);
};

const renderEmployeeInfo = (emp) => {
  const ul = document.getElementById("employeeInfo");
  ul.innerHTML = "";

  const liId = document.createElement("li");
  liId.textContent = `ID: ${emp.id}`;

  const liName = document.createElement("li");
  liName.textContent = `Name: ${emp.firstname} ${emp.lastname}`;

  const liAge = document.createElement("li");
  liAge.textContent = `Age: ${emp.age}`;

  const liMarried = document.createElement("li");
  liMarried.textContent = `Married: ${emp.isMarried ? "Yes" : "No"}`;

  ul.append(liId, liName, liAge, liMarried);
};
