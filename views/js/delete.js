
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
