
async function handleUpdatePassword() {
    var username = document.getElementById('username').value;
    var oldpassword = document.getElementById('oldpassword').value;
    var newpassword = document.getElementById('newpassword').value;
    if (username.trim() === '' || oldpassword.trim() === '' || newpassword.trim() === '') {
        alert('Please fill in all required fields.');
        return false;
      }
    let response;
    try {
        response = await fetch('http://localhost:3000/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: username, oldpassword: oldpassword , newpassword:newpassword})
        });
        if (response.status === 409) {
            alert("User already exists");
        }
        else if (response.status === 427) {
            alert("passwords should not match");
            
        }else if (response.status === 200) {
            alert("password has been changed sucessfully");
            window.location.href = "index.html";
        }
        console.log('Signup - Username:', username, 'Signup - Password:', password);
    } catch (error) {
        console.log(error);
    }
}



const displayUsers = document.getElementById("update-btn");
if (displayUsers) {
    displayUsers.addEventListener("click", handleUpdatePassword);
}