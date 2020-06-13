$(document).ready(function() {
    
    var $firstName = $("#firstName");
    var $lastName = $("#lastName");
    var $roleAdmin = $("#roleAdmin");
    var $adminemail = $("#adminemail");
    var $password = $("#password");


    $(document).on("submit", "#adminregisterform", insertNewAdmin);

    function insertNewAdmin(event) {
        event.preventDefault();
        var insertAdmin = {
            first_name: $firstName.val().trim(),
            last_name: $lastName.val().trim(),
            role: $roleAdmin.val().trim(),
            email: $adminemail.val().trim(),
            password: $password.val().trim()
        };

        $.post("/registeradmin", insertAdmin)
        .then(getLoginPage);
        $firstName.val("");
        $lastName.val("");
        $roleAdmin.val("");
        $adminemail.val("");
        $password.val("");
    }

    function getLoginPage() {
        $.get("/login", function(){
            window.location.replace("/login");
        })
        .catch(function(err) {
            console.log(err);
        });
      }
});