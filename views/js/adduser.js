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

      if (data.message === 'Group member added successfully!') {
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

document.getElementById('addUser').addEventListener('click', addUser);
