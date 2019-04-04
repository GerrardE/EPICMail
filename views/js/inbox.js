const token = window.localStorage.getItem('token');

const targetUrl = 'http://localhost:5000/api/v2/messages/unread';

const getMessages = () => {
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
                <span class="title">${datum.email}</span>
                <span class="time-right">${datum.createdon}</span>
            </div>
            <p class="para">${datum.subject}</p>
            <a href="${targetUrl}/${datum.id}" type="submit" class="viewbtn">VIEW</a>
            <a type="submit" class="deletebtn">DELETE</a>
        </div>`;
      });

      document.getElementById('inbox').innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
};

getMessages();
