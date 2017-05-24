$(document).ready(function(){
    
    $("#entrarbtn").on("click",function(){
        var pass = $("#pass").val();
        var mail = $("#mail").val();
        var datosLogin = {
            email: mail,
            password: pass
        };
        
     var funcionAjax = $.ajax({
        url: "http://localhost:1337/login", 
        type: "post",
        data: JSON.stringify(datosLogin)
    });

    funcionAjax.done(function(retorno) {
       
		if(retorno.autenticado == "si")
        {
           localStorage.setItem("email",mail);
		   localStorage.setItem("preferencias",retorno.preferencias);
           window.location.replace("inicio.html");
        } 

        });
    });

    var Usr = localStorage.getItem("email");
    $("#UsrIcon").html(Usr);
    

    $("#post").on("click", function(){

        $("#mostrarmodal").modal("show");
        
    });

    $("#guardar").on("click", function(){
        
        $("#mostrarmodal").modal("hide");
        $("#carga").modal("show");
        var title = $("#titleTxt").val();
        var header = $("#headerTxt").val();
        var text = $("#postText").val();
        var autor = localStorage.getItem("email");
        var preferencias = localStorage.getItem("preferencias");
        
        var datosPost =
        {
            title: title,
            header: header,
            posttext: text,
            author: autor
        };

        var funcionAjax = $.ajax({
            url: "http://localhost:1337/postearNuevaEntrada", 
            type: "post",
            data: JSON.stringify(datosPost)
        
        });

        funcionAjax.done(function(retorno) { 
        
            $("#carga").modal("hide");
            
            $("#content").after("<div id='publicacion' style='background-color: white;'class='col-xs-12 col-sm-6 col-md-4 col-lg-3'>" +
                "<header><h2>" + retorno.title + "</h2></header>" +
                "<header><h3>" + retorno.header+ "</h3></header>" +
                "<p><h4>" + retorno.posttext + "</h4><h5>Por :" + retorno.author + "-" + retorno.date + "</h5></p>" +
                "</div>");
        });
    });
});