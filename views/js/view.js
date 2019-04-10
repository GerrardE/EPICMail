
const viewMessage = () => {
  let urlId = window.localStorage.getItem('id');
  const token = window.localStorage.getItem('token');
  if (!token) {
    window.location.assign('index.html');
    alert('Please login');
  }

  const targetUrl = `https://epic-m.herokuapp.com/api/v2/messages/${urlId}`;
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
      console.log(data)
      let message = '';
      console.log('connected');
      const result = data.retrievedMessage[0];
      
      let output = `
      <h2 class="lead-title">${result.subject}</h2>
      <div class="timeline">
          <div class="container-chat">
              <span class="time-right">${result.createdon}</span>
              <p>${result.subject} From ${result.email}</p>
              <p class="para">${result.message}</p>
          </div>
          <div class="container-chat">
              <span class="time-right">11:02 22 Jan 2018</span>
              <p>Sweet! So, what do you wanna do today?</p>
      
              <p class="para"> Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, 
                      sem quam semper libero, sit amet adipiscing sem neque sed ipsum. 
                      Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. 
                      Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut 
                      libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget 
                      eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. 
                      Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, 
                      augue velit cursus nunc,</p>
          </div>
          <div class="container-chat">
              <a type="submit" class="deletebtn" id="delete" onclick="deleteMessage(${result.id})">DELETE</a>
          </div>
      </div>`;
      
      message = 'Error: mail not found.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      document.getElementById('main').innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
  
};

viewMessage();