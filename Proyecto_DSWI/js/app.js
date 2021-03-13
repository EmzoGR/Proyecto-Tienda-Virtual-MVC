$(document).ready(function(){
    
    $('#ingresar').click(function (e) {
        var usuario=$('#usuario').val();
        var contraseña=$('#password').val();
        
        if(usuario=="deyvis" && contraseña =="1234"){
            console.log("ir");
            window.location.href = "Principal";
           
        }
        else if (usuario == "admin" && contraseña == "1234") {
            console.log("ir");
            window.location.href = "Producto/CrudProducto";

        }

        else {
            alert("usuario Incorrecto")
        }
            
        e.preventDefault();
        
    });
   
   
        
    
    
   
});

cargarItem();
function cargarItem() {
    var cantidad = document.getElementById("sesion");
    var cantidad2 = document.getElementById("sesion2");

    fetch("/VentaProducto/ListaItem").
        then(response => response.json()).
        then(response => {

            var longitud = 0;
            console.log(response);
            for (let i in response) {
                longitud += 1;


            }


            cantidad.innerHTML = longitud;
            cantidad2.innerHTML = longitud;
        })
}




    // NAVBAR ANTES DE HACER SCROLL
window.addEventListener("scroll",function() {

    var header = document.querySelector("nav");
     
    var a=document.getElementById("titulo");
    var itemsA=document.getElementById("carrito");
    var itemsB=document.getElementById("cuenta");
    //var itemsC=document.getElementById("itemsC");
    var flecha =document.getElementById("flecha");
    header.classList.toggle("sticky",window.scrollY > 0);
    a.classList.toggle("text-light",window.scrollY>0);
    itemsA.classList.toggle("text-light",window.scrollY>0);
    itemsB.classList.toggle("text-light",window.scrollY>0);
    flecha.classList.toggle("text-light",window.scrollY>0);
    
  
})


  