$(function(){
    $.ajax('/burger', {
        type: 'GET'
    }).then(function(data){
        const uneaten = $('#uneaten');
        const burger = data.burger
    })
})