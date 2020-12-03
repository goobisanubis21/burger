$(function(){
    $.ajax('/burgers', {
        type: 'GET'
    }).then(function(data){
        const uneaten = $('#uneaten');
        const eaten = $('#eaten')
        const burger = data.burgers;
        const len = burger.length;
        for (var i = 0; i < len; i++) {
            var newEl = '<li class= "notEaten">' + burger[i].id + '. ' + burger[i].burger + '<button class = devour>Devour</button></li>';
            uneaten.append(newEl)
        }
    })
})