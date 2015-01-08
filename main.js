var fb = new Firebase("https://helloworldjs.firebaseio.com/");
$('#messageInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var name = $('#nameInput').val();
    var message = $('#messageInput').val();
    fb.push({name: name, message: message });
    $('#messageInput').val('');
    $('#nameInput').val(''); 
  }
});

$('#passwordInput').keypress(function (e) {
  if(e.keyCode == 13) {
    var username = $('#usernameInput').val();
    var password = $('#passwordInput').val();
    fb.createUser({
      email: username,
      password: password
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log('Email already taken');
            break;
          case "INVALID_EMAIL":
            console.log('Invalid email');
            break;
          default:
            console.log('Something went wrong', error);
        }
      } else {
        console.log('User account created!');
      }
    });
    $('#usernameInput').val('');
    $('#passwordInput').val('');
  }
});

$('#passInput').keypress(function (e) {
  if (e.keyCode == 13) {
    var username = $('#loginInput').val();
    var password = $('#passInput').val();
    fb.authWithPassword({
      'email': username,
      'password': password
    }, function(error, authData) {
      if (error) {
        console.log('Login failed!', authData);
      } else {
        console.log('Login Successful!', authData);
      }
    }
    );
    $('#loginInput').val('');
    $('#passInput').val('');
  }
});

fb.on('child_added', function(snap) {
  var message = snap.val();
  displayChatMessage(message.name, message.message);
});

function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
  $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};