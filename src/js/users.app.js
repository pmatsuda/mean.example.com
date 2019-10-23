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

    function createUser(){
      var app = document.getElementById('app');
    
      var form =  `
          <div class="card">
            <div class="card-header clearfix">
              <h2 class="h3 float-left">Create a New User</h2>
              <div class="float-right">
                <a href="#" class="btn btn-primary">Cancel</a>
              </div>
            </div>
            <div class="card-body">
              <form id="registrationForm" class="card-body">
              <form id="createUser" class="card-body">
                <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
    
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" class="form-control" required>
                  </div>
    
                  <div class="form-group col-md-6">
                    <label for="last_name">Last Name</label>
                    <input type="text" id="last_name" name="last_name" class="form-control" required>
                  </div>
                </div>
    
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" class="form-control" required>
                  </div>
    
                  <div class="form-group col-md-6">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                  </div>
                </div>
    
                <div class="text-right">
                  <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                </div>
              </form>
            </div>
          </div>
      `;
    
      app.innerHTML=form;
    }

    function postRequest(formId, url){
      let form = document.getElementById(formId);
      form.addEventListener('submit', function(e){
        e.preventDefault();
  
        let formData = new FormData(form);
        let uri = `${window.location.origin}${url}`;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', uri);
  
        xhr.setRequestHeader(
          'Content-Type',
          'application/json; charset=UTF-8'
        );
  
        let object = {};
        formData.forEach(function(value, key){
          object[key]=value;
        });
  
        xhr.send(JSON.stringify(object));
        xhr.onload = function(){
          let data = JSON.parse(xhr.response);
          if(data.success===true){
            window.location.href = '/';
          }else{
            document.getElementById('formMsg').style.display='block';
          }
        }
      });
    }
    // xhr.onload = function () {
    //   let data = JSON.parse(xhr.response);
    //   console.log(data);
    // }
  }

  return {
    load: function(){
      //viewUsers();
      let hash = window.location.hash;
      let hashArray = hash.split('-');

      switch(hashArray[0]){
        case '#create':
          createUser();
          postRequest('createUser', '/api/users');
          break;

        case '#view':
          console.log('VIEW');
          break;

        case '#edit':
          console.log('EDIT');
          break;

        case '#delete':
          console.log('DELETE');
          break;

        default:
          viewUsers();
          break;
      }
    }
  }
})();

usersApp.load();