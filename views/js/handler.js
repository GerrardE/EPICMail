class Handler {
  static alertMessage(message, fieldIndex, color) {
    const alert = document.getElementsByClassName('alert')[fieldIndex];
    alert.innerHTML = message;
    alert.style.color = color;
    setInterval(() => {
      alert.innerHTML = '';
    }, (6400));   
  }

  static clearAlert() {
    const alert = document.getElementsByClassName('alert');
    alert.style.display = 'none';
  }

  static clearSignup() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  }
}

