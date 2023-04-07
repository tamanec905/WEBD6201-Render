"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
(function(){


    function AuthGuard() : void{
        let protected_routes = [
            "contact-list",
            "edit"
        ];
        if (protected_routes.indexOf(location.pathname) > -1){
            if (!sessionStorage.getItem("user")){
                location.href = "login";
            }
        }
    }

    /**
     * Instantiates a contact and stores in local storage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    function AddContact(fullName : string, contactNumber : string, emailAddress : string){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    function Display404Page(){
        console.log("404 Page");
    }

    function DisplayHomePage(){
        console.log("Home Page Called!!")

        $("#AboutUsBtn").on("click", () => {
               location.href = "about";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph!</p>`);

        $("main").append(`<article>
                            <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p> </article>`);


    }



    function DisplayProductsPage(){
        console.log("Products Page Called!!")
    }

    function DisplayServicesPage(){
        console.log("Services Page Called!!")
    }

    function DisplayAboutUsPage(){
        console.log("About Us Page Called!!");
    }



    /**
     * This function will validate an input provided based on a given regular expression
     * @param {string} input_field_id
     * @param {RegEx} regular_expression
     * @param {string} error_message
     */
    function validateField(input_field_id : string, regular_expression : RegExp, error_message : string){
        let messageArea = $("#messageArea");

        $(input_field_id).on("blur", function() {

            let fullNameText = $(this).val() as string;
            if(!regular_expression.test(fullNameText)){
                //fail validation
                $(this).trigger("focus").trigger("select");

                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }

        });
    }

    function ContactFormValidation(){
        validateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid first and last name (ex: Bruce Wayne)");
        validateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number (ex: 416-555-2039)" );
        validateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address (ex: username@isp.com)" );
    }

    function DisplayContactPage() {
        console.log("Contact Page Called")
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function(){
            location.href = "contact-list";
        })

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckBox = document.getElementById("subscribeCheckbox") as HTMLInputElement;
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckBox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize() as string);
                }
            }
        });
    }

    function DisplayContactListPage(){
        console.log("Contact List Page Called!!")

        $("a.delete").on("click", function(event){
            if (!confirm("Are you sure?")){
                event.preventDefault();
                location.href = "contact-list";
            }
        });

    }

    function DisplayEditPage(){
        console.log("Edit Page");

        ContactFormValidation();


    }

    function DisplayLoginPage(){
        console.log("Login Page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function() {

            let success = false;
            let newUser = new core.User();

            $.get("../data/user.json", function (data) {

                for (const u of data.user) {


                    let username = document.forms[0].username.value
                    let password = document.forms[0].password.value


                    if (username === u.Username && password === u.Password) {
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();


                    location.href = "contact-list";
                } else {
                    //Failed Authentication
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger")
                        .text("ERROR: Invalid Credentials").show();
                }
            });
        });

            $("#cancelButton").on("click", function(){
                document.forms[0].reset();
                location.href = "home";
            });

    }

    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#">
                                                <i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $("#logout").on("click", function(){
                sessionStorage.clear();
                $("#login").html(`<a class="nav-link" data="login">
                                                <i class="fas fa-sign-in-alt"></i> Login</a>`);

                location.href = "login";
            });
        }

    }

    function DisplayRegisterPage(): void{
        console.log("Register Page");
    }



    function Start()
    {
        const pageId = document.querySelector('body')?.getAttribute('id');
        CheckLogin();

        switch(pageId){
            case "home" : DisplayHomePage(); break;
            case "about" : DisplayAboutUsPage(); break;
            case "services" : DisplayServicesPage(); break;
            case "contact" : DisplayContactPage(); break;
            case "contact-list" : DisplayContactListPage(); break;
            case "products" : DisplayProductsPage(); break;
            case "register" : DisplayRegisterPage(); break;
            case "login" : DisplayLoginPage(); break;
            case "edit" : DisplayEditPage(); break;
            case "add" : DisplayEditPage(); break;
            case "404" : Display404Page(); break;
            default:
                console.error("Error: callback does not exist" + router.ActiveLink);
                break;
        }

    }
    window.addEventListener("load", Start);
    

})()