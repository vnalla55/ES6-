$('h3.heading').hide();

function getData(method, url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

getData("Get", "https://jsonplaceholder.typicode.com/todos")
    .then(function(data) {
        let todos = JSON.parse(data);
        let output = "";
        for (let todo of todos) {
            output += `
          <div>
               <h3>${todo.first_name}</h3>
               <p>Completed: ${todo.gender}</p>
          `;
        }
        document.getElementById("content").innerHTML = output;
    })
    .catch(function(err) {
        console.log(err);
    });