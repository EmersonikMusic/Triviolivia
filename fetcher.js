fetch('http://trivioliv.herokuapp.com/api/questions/?')
  .then(response => response.text())
  .then(html => console.log(html))
  .catch(error => console.error(error));
