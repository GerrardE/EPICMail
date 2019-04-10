const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

const send = (e) => {
  e.preventDefault();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const toEmail = document.getElementById('toEmail').value.trim();
  const status = 'sent';

  const targetUrl = 'https://epic-m.herokuapp.com/api/v2/messages';

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      subject, message, toEmail, status
    })
  })
    .then(res => res.json())
    .then((data) => {
      let message = '';
      console.log('connected');

      // return some error messages
      message = 'Error: email field cannot be empty.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email format is invalid';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email should be 2 to 100 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email does not exist.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: Oops! looks like you tried to email yourself.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: subject field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: message field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: message sending failed.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }

      if (data.message === 'Success: message sent successfully!') {
        Handler.alertMessage(data.message, 0, 'green');
        alert(`${data.message}`)
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const draft = (e) => {
  e.preventDefault();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const toEmail = document.getElementById('toEmail').value.trim();
  const status = 'draft';

  const targetUrl = 'https://epic-m.herokuapp.com/api/v2/messages';

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      subject, message, toEmail, status
    })
  })
    .then(res => res.json())
    .then((data) => {
      let message = '';
      console.log('connected');
      // return some error messages
      message = 'Error: email field cannot be empty.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email format is invalid';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email should be 2 to 100 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: email does not exist.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: subject field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: message field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 2, 'red');
        return;
      }

      message = 'Error: message sending failed.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 3, 'red');
        return;
      }

      if (data.message === 'Success: message sent successfully!') {
        alert('Draft saved');
        window.location.assign('/inbox.html');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('sendMail').addEventListener('click', send);
document.getElementById('saveDraft').addEventListener('click', draft);
