const token = window.localStorage.getItem('token');

const targetUrl = 'http://localhost:5000/api/v2/messages/sent';

const getSentMessages = () => {
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

      let output = '';
      result.forEach((datum) => {
        output += `
               <div class="container-chat">
                  <div class="top">
                     <span class="time-right">${datum.createdon}</span>
                  </div>
                  <p class="lead">Sent to: ${datum.email}</p>
                  <p class="para">${datum.subject}</p>
                  <a href="view.html" type="submit" class="viewbtn">VIEW</a>
                  <a type="submit" class="deletebtn" id="delete" onclick="deleteMessage(${datum.id})">CANCEL</a>
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
