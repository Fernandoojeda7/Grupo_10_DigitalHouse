window.addEventListener('load', function() {
    console.log('hola');
        let imagenPermitida =  /(.jpg|.jpeg|.png|.gif)$/i;
        let nombre = document.querySelector('#name');
        nombre.focus();
        
        let form = document.querySelector('#form');
        form.addEventListener('submit', (e)=> {
        
        nombre = document.querySelector('#name');
            if(nombre.value == ''){
                e.preventDefault();
                alert('Campo Nombre del Producto es Obligatorio');
                
            }
            if(nombre.value.length < 5){
                e.preventDefault();
                alert('El nombre del producto debe contener más de 5 caracteres');
                
             }
            let descripcion = document.querySelector('#description');
            if(descripcion.value == ''){
                e.preventDefault();
                alert('El campo descripción es Obligatorio');
                
            }
            if(descripcion.value.length < 20){
                e.preventDefault();
                alert('Descripción debe contener más de 20 caracteres');
                
            }
           let imagen = document.querySelector('#imagen');
            if(imagen.vulue == ''){
                e.preventDefault();
                alert('Debes tener imagen de Perfil');
            }
            if (!imagenPermitida.test(imagen.value)) {
                e.preventDefault();
                alert('El formato de la imagen no es valido');
            }
          
          
        });
    
            
        })