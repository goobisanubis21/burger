$(function () {
    $.ajax('/burgers', {
        type: 'GET'
    }).then(function (data) {
        const uneaten = $('#uneaten');
        const burger = data.burgers;
        const len = burger.length;
        for (var i = 0; i < len; i++) {
            var newEl = '<li class= "notEaten">' + burger[i].id + '. ' + burger[i].burger + '<button class = devour>Devour</button></li>';
            uneaten.append(newEl)
        }
    })

    $(document).on('click', '#subBtn', function (event) {
        event.preventDefault();
        var title = $('#inputTxt').val().trim()
        var newBurger = {
            burger: title,
            devoured: false
        }
        $.ajax('/burgers', {
            type: 'POST',
            data: JSON.stringify(newBurger),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function (data) {
            console.log('New Burger Created!');
            location.reload()
        })
    })
})