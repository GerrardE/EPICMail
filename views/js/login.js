const login = (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch('https://epic-m.herokuapp.com/api/v2/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  })
    .then(res => res.json())
    .then((data) => {
      let message = '';
      console.log('connected')
      // return some error messages
      message = 'Error: email field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email cannot include space.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email format is invalid';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email should be 10 to 30 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }
              
      message = 'Error: password field cannot be empty'
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: password cannot contain spaces';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: password should be a string';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Authentication failed. Try again';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: Invalid credentials';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      window.localStorage.setItem('token', data.token);
      if (data.message === 'Success: login successful!') {
        Handler.alertMessage(data.message, 2, 'green');
        alert(`${data.message}`);
        window.location.assign('/inbox.html');
        return;
      }

    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('loginUser').addEventListener('submit', login);
