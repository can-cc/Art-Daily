(function() {
    aloha.dom.query('#editor', document).forEach(aloha);
    $('#big-bad-bold-button').on('click', aloha.ui.command(aloha.ui.commands.bold))

    $('#ulbutton').on('click', function(event) {
        event.preventDefault()
        var file = $('#file')[0].files[0]

        var data = new FormData()
        data.append(file.name, file)
        $.ajax({
            url: '/admin/ulimg/',
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            success: function(data) {
                alert('success')
            },
            error: function(data) {
                alert('error!')
            }
        })
    })

    $('.upload-cover').click(function () {
        $('#myModal').modal()
    })

    $('.cover-upload-button').click(function (event) {
        event.preventDefault()
        var file = $('#cover-img-file')[0].files[0]

        var data = new FormData()
        data.append(file.name, file)
        $.ajax({
            url: '/admin/ulimg/',
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            success: function(data) {
                //$('<img src="/' + data.src + '" class="img-responsive" alt="Responsive image">').appendTo('body')
                $('.cover-field').css('height', 'auto')
                $('.cover-img-container').html($('<img src="/' + data.src + '" class="img-responsive center-block cover-img" alt="Responsive image">'))
                //$('<img src="/' + data.src + '" class="img-responsive" alt="Responsive image">').appendTo('.cover-img')
               // $('body').append($('<img src="' + data.src + '" class="img-responsive" alt="Responsive image">'))
            },
            error: function(data) {
                alert('error!')
            }
        })
    })
}())
