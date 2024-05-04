async function handleLogin() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all required fields.');
        return false;
      }
    console.log('Login - Username:', username, 'Password:', password);
    let response;
    try {
        response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: username, password: password})
        });
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            window.location.href = "home.html";
        } else {
            console.error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
    
}

async function handleSignup() {
    var username = document.getElementById('signupUsername').value;
    var password = document.getElementById('signupPassword').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all required fields.');
        return false;
      }
    let response;
    try {
        response = await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: username, password: password})
        });
        if (response.status === 409) {
            alert("User already exists");
        } else if (response.status === 200) {
            alert("User created");
            window.location.href = "index.html";
        }
        console.log('Signup - Username:', username, 'Signup - Password:', password);
    } catch (error) {
        console.log(error);
    }
}




async function showAllUsers(event) {
    event.preventDefault();
    try {
        let response = await fetch('http://localhost:3000/user/allusers');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        var tableBody = document.getElementById('tableBody');

        data.users.forEach(user => {
            var row = document.createElement('tr');
        
            var idCell = document.createElement('td');
            idCell.textContent = user._id;
        
            var usernameCell = document.createElement('td');
            usernameCell.textContent = user.user;
        
            row.appendChild(idCell);
            row.appendChild(usernameCell);
        
            tableBody.appendChild(row);
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

async function goToHomePage(){
    window.location.href='index.html';
}

const loginButton = document.getElementById("login-btn");
if (loginButton) {
    loginButton.addEventListener("click", handleLogin);
}

const signupButton = document.getElementById("signup-btn");
if (signupButton) {
    signupButton.addEventListener("click", handleSignup);
}

const displayUsers = document.getElementById("displayButton");
if (displayUsers) {
    displayUsers.addEventListener("click", showAllUsers);
}

const dissapear  =  document.getElementById("displayButton");
if(dissapear){
    dissapear.addEventListener("click", function() {
    this.style.display = "none";
    });
}

const goBack = document.getElementById("goBack");
if (goBack) {
    goBack.addEventListener("click", goToHomePage);
}