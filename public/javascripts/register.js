let email = document.getElementById('userEmail');
let repEmail = document.getElementById('confirmEmail');
let password = document.getElementById('password');
let confPassword = document.getElementById('repeatPass');

let fieldsNotMatched = false;
let emailNotValid = false;

function compareFields(a, b) {
    if(a.value !== b.value) {
        if(a.classList.contains('uEmail')) {          
            fieldsNotMatched = true;
            let nonValidEmail = document.getElementsByClassName('misMatchEmail');
            for(let n of nonValidEmail) {      
                n.style.display = 'block';
            }            
            b.classList.add('invalidField');
            return;
        }
        fieldsNotMatched = true;
        b.classList.add('invalidField');
        b.nextElementSibling.classList.remove('invalidMsgHidden');
    } else {
        if(a.classList.contains('uEmail')) {          
            fieldsNotMatched = false;
            let nonValidEmail = document.getElementsByClassName('misMatchEmail');
            for(let n of nonValidEmail) {      
                n.style.display = 'none';
            }            
            b.classList.remove('invalidField');
            return;
        }
        fieldsNotMatched = false;
        b.classList.remove('invalidField');
        b.nextElementSibling.classList.add('invalidMsgHidden');
    }
}

// Checking that both email fields looks like real emails
[email, repEmail].forEach( field => {
    field.addEventListener('blur', () => {
        if(!isEmail(field)) {
            field.classList.add('invalidField');
            emailNotValid = true;
        } else {
            emailNotValid = false;
            field.classList.remove('invalidField');
        }
    });
});

function isEmail(field) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(field.value);
}

// Checks that the email confirmation field matches the first email
repEmail.addEventListener('blur', () => {
    compareFields(email, repEmail);
});

// Checks if both passwords match

confPassword.addEventListener('blur', () => {
    compareFields(password, confPassword);
});