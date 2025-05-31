var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3005/api/todos',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: '{\r\n    "task":"Tarea dummy"\r\n    "dueDate":"20/05/2025"\r\n}'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
