$(function () {
    $.ajax('/burgers', {
        type: 'GET'
    }).then(function (data) {
        const uneaten = $('#uneaten');
        const eaten = $('#eaten');
        const burger = data.burgers;
        const len = burger.length;
        for (var i = 0; i < len; i++) {
            if (burger[i].devoured === 0) {
                var uneatenEl = '<li class= "notEaten">' + burger[i].id + '. ' + burger[i].burger + '<button class = devour>Devour</button></li>';
                uneaten.append(uneatenEl)
            } else {
                var eatenEl = '<li class= "eaten">' + burger[i].id + '. ' + burger[i].burger + '<button class = delete>Delete</button></li>';
                eaten.append(eatenEl)
            }
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
    $(document).on('click', '.devour', function () {
        let id = $(this).data('id');
        let eatenBurger = {
            devoured: true
        };
        $.ajax('/burgers/' + id, {
            type: 'PUT',
            data: JSON.stringify(eatenBurger),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function (data) {
            location.reload();
        })
    })
    $(document).on('click', '.delete', function () {
        let id = $(this).data('id')
        $.ajax('/burgers/' + id, {
            type: 'DELETE'
        }).then(function (data) {
            location.reload();
        })
    })
})