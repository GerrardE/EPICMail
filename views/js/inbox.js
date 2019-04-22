const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

// delete a message
const deleteMessage = (id) => {
  const userConfirm = confirm('Are you sure you want to delete this mail?')
  const targetUrl = `https://epic-m.herokuapp.com/api/v2/messages/${id}/delete`;
  
  if (userConfirm === true) {
    fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: token
      }
    })
      .then(res => res.json())
      .then((data) => {
        let message = '';

        message = 'Error: mail not found';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: mail could not be deleted either because the mail was not found, or something bad happened. Please try again.';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Success: mail deleted successfully!';
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

const getUnread = () => {
  const targetUrl = 'https://epic-m.herokuapp.com/api/v2/messages/unread';
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
      let message = '';
      console.log('connected');
      const result = data.retrievedMessages;
      console.log('messages retrieved');

      let output = '';
      result.forEach((datum) => {
        output += `
        <div class="container-chat">
            <div class="top">
                <span class="lead">From: ${datum.email}</span>
                <span class="time-right">${datum.createdon}</span>
            </div>
            <p class="para">${datum.subject}</p>
            <a href="view.html" type="submit" class="viewbtn" onclick="Handler.saveId(${datum.id})">VIEW</a>
            <a type="submit" class="deletebtn" onclick="deleteMessage(${datum.id})">DELETE</a>
        </div>`;
      });

      document.getElementById('unread').innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
};

getUnread();

const getRead = () => {
  const targetUrl = 'https://epic-m.herokuapp.com/api/v2/messages/read';
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
      const result = data.retrievedMessages;
      console.log('messages retrieved');

      let output = '';
      result.forEach((datum) => {
        output += `
        <div class="container-chat darker">
            <div class="top">
                <span class="lead">From: ${datum.email}</span>
                <span class="time-right">${datum.createdon}</span>
            </div>
            <p class="para">${datum.subject}</p>
            <a href="view.html" type="submit" class="viewbtn" onclick="Handler.saveId(${datum.id})">VIEW</a>
            <a type="submit" class="deletebtn" onclick="deleteMessage(${datum.id})">DELETE</a>
        </div>`;
      });

      document.getElementById('read').innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
};

getRead();
