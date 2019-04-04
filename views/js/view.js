const url = window.localStorage.getItem('url')
const token = window.localStorage.getItem('token');

const getMessage = () => {
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
      const result = data.retrievedMessage;

      message = 'Error: mail not found.';
      if (data.message === message) {
        Handler.alertMessage(data.message, 0, 'red');
        return;
      }

      let output = `
      <h2 class="lead-title">${result.subject}</h2>
      <div class="timeline">
          <div class="container-chat">
              <span class="time-right">${result.createdon}/span>
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
              <a type="submit" class="deletebtn">DELETE</a>
          </div>
      </div>`;
      });

      document.getElementById('main').innerHTML = output;
      window.localStorage.removeItem('url')
      console.log(data.message);
    })
    .catch((err) => {
      console.log(err);
    });
};

getMessage();
