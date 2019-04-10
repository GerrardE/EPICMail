const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

// To create a new group
const newGroup = () => {
  const name = document.getElementById('groupName').value.trim();

  const targetUrl = 'https://epic-m.herokuapp.com/api/v2/groups';

  fetch(targetUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      name
    })
}) 
    .then(res => res.json())
    .then((data) => {
      let message = '';
      console.log('connected');
     
      // return some error messages
      message = 'Error: name field cannot be empty';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }
      
      message = 'Error: name cannot include space.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }
      
      message = 'Error: name should be over 2 characters long';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }
      
      message = 'Error: this name is taken. Please try again';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server did not respond. Please try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      message = 'Error: server not responding. Please try again.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      if (data.message === 'Success: group created successfully!') {
        Handler.alertMessage(data.message, 0, 'green');
        alert(data.message);
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// To delete a certain group
const deleteGroup = (id) => {
  const userConfirm = confirm('Are you sure you want to delete this group?')
  const targetUrl = `https://epic-mail.herokuapp.com/api/v2/groups/${id}`;

  if (userConfirm === true) {
    fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token
      },
    })
      .then(res => res.json())
      .then((data) => {
        let message = '';

        message = 'Error: server not responding. Try again';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: group could not be deleted. Try again';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Success: group deleted successfully!';
        if (data.message === message) {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    window.location.reload();
  }
};