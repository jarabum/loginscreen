const information = document.getElementById("information");
const nameBox = document.getElementById("name");
const passBox = document.getElementById("password");

const information2 = document.getElementById("information2");
const nameBox2 = document.getElementById("name2");
const passBox2 = document.getElementById("password2");

const api = "http://localhost:8080"

information.textContent = "";
information2.textContent = "";

function signUp() {
  const name = nameBox.value;
  const password = passBox.value;

  fetch(`${api}/createuser`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "name": name, "password": password })
  })
    .then(response => {
      return response.json().then(data => {
        information.textContent = data.message || `HTTP error: ${response.status}`
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        console.log(response);
        return response;
      })
    })
}

function login() {
  const name = nameBox2.value;
  const password = passBox2.value;

  fetch(`${api}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "name": name, "password": password })
  })
    .then(response => {
      return response.json().then(data => {
        information2.textContent = data.message || `HTTP error: ${response.status}`
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        console.log(response);
        return response;
      })
    })
}
