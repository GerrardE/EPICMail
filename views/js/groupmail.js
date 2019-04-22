const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

const id = localStorage.getItem('id');

const send = (e) => {
  e.preventDefault();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = 'sent';

  const targetUrl = `https://epic-m.herokuapp.com/api/v2/groups/${id}/messages`;

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      subject, message, status
    })
  })
    .then(res => res.json())
    .then((data) => {
      let message = '';
      console.log('connected');

      // return some error messages
      message = 'Error: subject field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: message field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: group does not exist.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: no member found on the group.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message =  'Error: message not sent. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server taking too long to respond. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server could not respond. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server not responding. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Success: group message sent successfully!';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'green');
        alert(`${data.message}`);
        window.location.assign('sent.html');
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
  const status = 'draft';

  const targetUrl = `https://epic-m.herokuapp.com/api/v2/groups/${id}/messages`;

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      subject, message, status
    })
  })
    .then(res => res.json())
    .then((data) => {
      let message = '';
      console.log('connected');
      // return some error messages
      message = 'Error: subject field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: message field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 1, 'red');
        return;
      }

      message = 'Error: group does not exist.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: no member found on the group.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message =  'Error: message not sent. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server taking too long to respond. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server could not respond. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server not responding. Try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Success: group message sent successfully!';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'green');
        alert(`${data.message}`);
        window.location.assign('sent.html');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('sendMail').addEventListener('click', send);
document.getElementById('saveDraft').addEventListener('click', draft);
