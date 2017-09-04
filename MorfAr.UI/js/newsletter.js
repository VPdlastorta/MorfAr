/**
 * Created by lucho on 16/01/17.
 */
var Newsletter = {};

Newsletter.init = function(){
    $('body').on('click', '#add-contact', this.addContact);
}

Newsletter.isEmail = function(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

Newsletter.addContact = function(e){    
    e.preventDefault();
    var newsletterResult = $('#newsletter-result');
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var email = $('#email').val();
    
    if(!regex.test(email)) {
        newsletterResult.text('Por favor, escribí una dirección de correo válida.');
    } else {
    
        var $this = $(this);
        var url = '/newsletter/add/' + email; 
        var spinner = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i>';
        $this.html(spinner);

        $.ajax({
            url: url,
            type: 'POST',
            success: function(response){            
                if(response.error === false) $('#email').val('');
                newsletterResult.text(response.message);
                $this.find('i').remove();
                $this.text('¡Quiero recibirlos!');
            },
            error: function(response){
                newsletterResult.text('No hemos podido agregar tu email a nuestra base de datos. Por favor intenta más tarde.');
                console.log(response);
            }
        });
    
    }
}