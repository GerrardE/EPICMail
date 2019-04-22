const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

const id = window.localStorage.getItem('id');

const addUser = () => {
  const targetUrl = `https://epic-m.herokuapp.com/api/v2/groups/${id}/users`;
  const email = document.getElementById('userEmail').value.trim();

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      email
    })
  })
    .then(res => res.json())
    .then((data) => {
      console.log('connected');
      let message = '';

      // return some error messages
      message = 'Error: group does not exist. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email field cannot be empty.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email cannot include space.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email should be a string';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email format is invalid';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email should be at least 12 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: user does not exist. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: user not added. Try again';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }
      
      message = 'Error: server not responding. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Group member added successfully!';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'green');
        alert(data.message);
        window.location.reload();
      }

      console.log(data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUsers = () => {
  const targetUrl = `https://epic-m.herokuapp.com/api/v2/groups/${id}/users`;
  fetch(targetUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    }
  })
    .then(res => res.json())
    .then((data) => {
      console.log('connected');
      const result = data.returnedMembers;

      let output = '';
      result.forEach((res) => {
        output += `
        <li class="user">${res.email}<span class="close" onclick="deleteUser(${res.memberid})">DEL</span></li>`;
      });

      document.getElementById('userUL').innerHTML = output;
      console.log('groups retrieved');
    })
    .catch((err) => {
      console.log(err);
    });
};

// To delete a certain group user
const deleteUser = (memberid) => {
  const userConfirm = confirm('Are you sure you want to delete this user?')
  const targetUrl = `https://epic-m.herokuapp.com/api/v2/groups/${id}/users/${memberid}`;

  if (userConfirm === true) {
    fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token
      }
    })
      .then(res => res.json())
      .then((data) => {
        let message = '';

        message = 'Error: group member could not be deleted. Try again.';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: group does not exist';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Success: group member deleted successfully';
        if (data.message === message) {
          alert(data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.location.reload();
  }
};

document.getElementById('addUser').addEventListener('click', addUser);
getUsers();
