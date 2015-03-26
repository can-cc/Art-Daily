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
                alert(data)
            },
            error: function(data) {
                alert('error!')
            }
        })
    })
}())
