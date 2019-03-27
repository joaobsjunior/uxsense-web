UXSenseWebManager.filter('phone', function(){
   return function(phone){
       
       var ddd = phone.substr(2,2);
       var telefone = phone.substr(4);
       var nonoDigito = phone.substr(4,1);
       
       telefone = telefone.substr(1,4) + '-'+ telefone.substr(5); // telefone sem 0 nono digito
       
       if( nonoDigito != "0"){ // adicionando espaço após primeiro digito
           telefone = nonoDigito + ' ' + telefone;
       }
       
       
       return '(' + ddd + ') ' +  telefone;
   } 
});