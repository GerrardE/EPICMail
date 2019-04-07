if (!token) {
  window.location.assign('index.html');
  alert('Please login');
}

const targetUrl = 'https://epic-m.herokuapp.com/api/v2/groups';

const getGroups = () => {
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
        <li class="group">${res.name}<span class="close">DEL</span><a class="add" href="addusers.html">ADD-USER</a></li>`;
      });

      document.getElementById('myUL').innerHTML = output;
      console.log('groups retrieved');
    })
    .catch((err) => {
      console.log(err);
    });
};

getGroups();
