var usersApp = (function () {

  function viewUsers() {

    let uri = `${window.location.origin}/api/users`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function () {
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let users = data.users;
      let table = '';
      let rows = '';

      //Loop each user record into it's own HTML table row, each user should
      //have a link a user view
      for (let i = 0; i < users.length; i++) {
        rows = rows + `<tr>
          <td>
            <a href="#view-${users[i]['_id']}">${users[i]['last_name']}, ${users[i]['first_name']}</a>
          </td>
          <td>${users[i]['username']}</td>
          <td>${users[i]['email']}</td>
        </tr>`;
      }

      //Create a users panel, add a table to the panel, inject the rows into the
      //table
      table = `<div class="card">
        <div class="card-header clearfix">
          <h2 class="h3 float-left">Users</h2>
          <div class="float-right">
            <a href="#create" class="btn btn-primary">New User</a>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <td>Name</td>
                <td>Username</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;

      //Append the HTML to the #app
      app.innerHTML = table;
    }

    // xhr.onload = function () {
    //   let data = JSON.parse(xhr.response);
    //   console.log(data);
    // }
  }

  return {
    load: function () {
      alert('LOADED');
      viewUsers();
    }
  }

})();

usersApp.load();