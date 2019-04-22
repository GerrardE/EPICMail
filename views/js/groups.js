if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

// To delete a certain group
const deleteGroup = (groupid) => {
  const token = localStorage.getItem('token');
  const targetLink = `https://epic-m.herokuapp.com/api/v2/groups/${groupid}`;
  const userConfirm = confirm('Are you sure you want to delete this group?');

  if (userConfirm === true) {
    fetch(targetLink, {
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

const getGroups = () => {
  const token = localStorage.getItem('token');
  const targetUrl = 'https://epic-m.herokuapp.com/api/v2/groups';
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
      const result = data.retrievedGroups;
      
      let output = '';
      result.forEach((res) => {
        output += `
        <li class="group">${res.name}<a href="editgroup.html" class="edit" onclick="Handler.saveId(${res.id})">EDIT</a><span class="close" onclick="deleteGroup(${res.id})">DEL</span><a class="mail" onclick="Handler.saveId(${res.id})" href="groupmail.html">MAIL</a><a class="add" onclick="Handler.saveId(${res.id})" href="addusers.html">USERS</a></li>`;
      });

      document.getElementById('myUL').innerHTML = output;
      console.log('groups retrieved');
    })
    .catch((err) => {
      console.log(err);
    });
};

getGroups();
