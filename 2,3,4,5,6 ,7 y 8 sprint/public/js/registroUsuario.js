window.addEventListener('load', function() {

       let emailValido = /\w+@\w+\.+[a-z]/;
       let imagenPermitida =  /(.JPG|.JPEG|.PNG|.GIF)$/i;
       let apellido = document.querySelector('#apellido');
       let contraseña = document.querySelector('#contraseña');
       let imagen = document.querySelector('#imagen');
       let email = document.querySelector('#email');
       let form = document.querySelector('#form');
        let nombre = document.querySelector('#nombre');

        nombre.focus();
       
        form.addEventListener('submit', (e)=> {
        
        nombre = document.querySelector('#nombre');
            if(nombre.value == ''){
                e.preventDefault();
                alert('Campo Nombre es Obligatorio');
            }
            if(nombre.value.length < 2){
                e.preventDefault();
                alert('Nombre debe contener más de 2 caracteres');
             }
            if(apellido.value == ''){
                e.preventDefault();
                alert('Campo Apellido es Obligatorio');
            }
            if(apellido.value.length < 2){
                e.preventDefault();
                alert('Apellido debe contener más de 2 caracteres');
            }
            if(email.value == ''){
                e.preventDefault();
                alert('Debes completar el campo Email');
             }
            if(emailValido.test(email)){
                e.preventDefault();
                alert('El Email debe ser valido');
            }
            if(imagen.vulue == ''){
                e.preventDefault();
                alert('Debes tener imagen de Perfil');
            }
            if(!imagenPermitida.test(imagen.value)) {
                e.preventDefault();
                alert('El formato de la imagen no es valido');
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