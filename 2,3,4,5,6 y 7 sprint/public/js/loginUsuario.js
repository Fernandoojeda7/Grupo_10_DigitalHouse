window.addEventListener('load', function() {
 console.log('hola');
    let emailValido = /\w+@\w+\.+[a-z]/;
    let email = document.querySelector('#email');
    let contraseña = document.querySelector('#contraseña');
    let form = document.querySelector('#form');

     email.focus();
     
     form.addEventListener('submit', (e)=> {

         if(email.value == ''){
             e.preventDefault();
             alert('Debes completar el campo Email');
         
          }
         if(emailValido.test(email)){
             e.preventDefault();
             alert('El Email debe ser valido');
             
         }
         if(contraseña.value == ''){
             e.preventDefault();
             alert('Debes completar la Contraseña');
           
         }
         if(contraseña.value.length < 3){
             e.preventDefault();
             alert('Contraseña debe contener 4 caracteres minimos');
             
         }
       
     });
 
         
     })