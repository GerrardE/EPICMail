const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

const id = window.localStorage.getItem('id');

const editGroup = () => {
  const targetUrl = `https://epic-m.herokuapp.com/api/v2/groups/${id}/name`;
  const name = document.getElementById('groupName').value.trim();

  fetch(targetUrl, {
    method: 'PATCH',
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
      console.log('connected');
      let message = '';

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

      message = 'Error: group not found';
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

      if (data.message === 'Success: group edited successfully!') {
        Handler.alertMessage(data.message, 0, 'green');
        alert(data.message);
        window.location.assign('admin.html');
      }

      console.log(data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.getElementById('editGroup').addEventListener('click', editGroup);
