
async function handleDeleteAccount() {
    var username = document.getElementById('deleteUsername').value;
    var password = document.getElementById('deletePassword').value;
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all required fields.');
        return false;
      }
    let response;
    try {
        response = await fetch('http://localhost:3000/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: username, password:password})
        });
        if (response.status === 409) {
            alert("User does not exists");
        }else if (response.status === 200) {
            alert("Account has been deleted sucessfully");
            window.location.href = "index.html";
        }
        console.log('Delete - Username:', username, 'Delete - Password:', password);
    } catch (error) {
        console.log(error);
    }
}



const displayUsers = document.getElementById("delete-btn");
if (displayUsers) {
    displayUsers.addEventListener("click", handleDeleteAccount);
}