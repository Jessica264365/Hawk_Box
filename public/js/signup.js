$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var userInput = $("input#user-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the user and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      user: userInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.user || !userData.password) {
      return;
    }
    // If we have an user and password, run the signUpUser function
    signUpUser(userData.user, userData.password);
    userInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(user, password) {
    $.post("/api/signup", {
      user: user,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
