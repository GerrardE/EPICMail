const token = window.localStorage.getItem('token');
if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

const retractMail = (id) => {
  const email = document.getElementById(`email-${id}`).innerHTML;
  const userConfirm = confirm('Are you sure you want to retract this message?')
  const targetUrl = `https://epic-m.herokuapp.com/api/v2/messages/${id}`;

  if (userConfirm === true) {
    fetch(targetUrl, {
      method: 'DELETE',
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
        let message = '';
        console.log('connected');

        // handle error messages
        message = 'Error: mail not found';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: mail not deleted';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: server not responding. Please try again.';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: problem retrieving email';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: server not responding, Try again later';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Success: mail retracted successfully!';
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

const getSentMessages = () => {
  const targetUrl = 'https://epic-m.herokuapp.com/api/v2/messages/sent';
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

      let output = '';
      result.forEach((datum) => {
        output += `
               <div class="container-chat">
               <span class="alert"></span>
                  <div class="top">
                     <span class="time-right">${datum.createdon}</span>
                  </div>
                  <p class="lead" id="email-${datum.id}">${datum.email}</p>
                  <p class="para">${datum.subject}</p>
                  <a href="view.html" type="submit" class="viewbtn" onclick="Handler.saveId(${datum.id})">VIEW</a>
                  <a type="submit" class="deletebtn" onclick="retractMail(${datum.id})">RETRACT</a>
               </div>`;
      });

      document.getElementById('sent').innerHTML = output;
      console.log('sent messages retrieved');
    })
    .catch((err) => {
      console.log(err);
    });
};
getSentMessages();
