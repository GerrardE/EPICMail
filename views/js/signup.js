const signup = (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch('http://localhost:5000/api/v2/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName, lastName, email, password
    })
  })
    .then(res => res.json())
    .then((data) => {
      let message = '';
      console.log(data);
      // return some error messages
      message = 'First name field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'First name field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'First name must be a string';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'First name should be 4 to 50 aplhabets long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'First name accepts only alphabets';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Last name field is required';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Last name field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Last name must be a string';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Last name should be 4 to 50 aplhabets long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Last name accepts only alphabets';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: email field is required';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: email cannot be empty.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: email cannot include space.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: email should be a string';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: email format is invalid';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: email should be 10 to 30 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: password field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }

      message = 'Error: password field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }

      message = 'Error: password cannot contain spaces';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }

      message = 'Error: password should be a string';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }

      message = 'Your account creation failed. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 4, 'red');
        return;
      }
      
      if (data.message === 'Success: User created successfully!') {
        Handler.alertMessage(data.data, 4, 'green');
        alert(data.credentials);
        window.location.assign('/');
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('createUser').addEventListener('submit', signup);