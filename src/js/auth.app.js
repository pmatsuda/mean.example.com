var authApp = (function() {

    function loginForm(){
      let app = document.getElementById('app');
  
      let form =  `
        <div class="card login-form">
          <form id="loginForm" class="card-body">
            <h1 class="card-title text-center">Please Sign In</h1>
            <div id="formMsg" class="alert alert-danger text-center">Invalid username or password</div>
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" class="form-control">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" class="form-control">
            </div>
            <div>
              <input type="submit" value="Sign In" class="btn btn-lg btn-primary btn-block">
            </div>
          </form>
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
            console.log(data);
          }
        });
      }
 
    return {
      load: function(){
        loginForm();
        postRequest('loginForm', '/api/auth/login');
      }
    }
  
  })();
  
  authApp.load();