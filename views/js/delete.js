
const deleteMessage = (id) => {
  const userConfirm = confirm('Are you sure you want to delete this mail?')
  const targetUrl = `http://localhost:5000/api/v2/messages/${id}`;
  
  if (userConfirm === true) {
    fetch(targetUrl, {
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

        message = 'Error: mail not found';
        if (data.message === message) {
          Handler.alertMessage(data.message, 0, 'red');
          return;
        }

        message = 'Error: server not responding. Please try again.';
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
