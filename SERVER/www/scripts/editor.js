(function() {
    
    aloha.dom.query('#editor', document).forEach(aloha);

   

    //todo
    $(document).ready(function() {
        var ctrlDown = false;
        var ctrlKey = 17,
            vKey = 86,
            cKey = 67;

        $(document).keydown(function(e) {
            if (e.keyCode == ctrlKey) ctrlDown = true
        }).keyup(function(e) {
            if (e.keyCode == ctrlKey) ctrlDown = false
        })

        $(document).keydown(function(e) {
            if (ctrlDown && (e.keyCode == vKey)) {}
        })
    })

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

    $('.upload-cover').click(function() {
        $('#myModal').modal()
    })

    $('.upload-img-icon').click(function() {
        $('#upload-img-modal').modal()
    })

    $('.cover-upload-button').click(function(event) {
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
                $('.cover-field').css('height', 'auto')
                $('.cover-img-container').html($('<img src="/' + data.src + '" class="img-responsive center-block cover-img" alt="Responsive image">'))
            },
            error: function(data) {
                alert('error!')
            }
        })
    })

    //upload img append to context
    $('.img-upload-button').click(function(event) {
        event.preventDefault()
        var file = $('#upload-img-file')[0].files[0]

        var data = new FormData()
        data.append(file.name, file)
        $.ajax({
            url: '/admin/ulimg/',
            type: 'POST',
            processData: false,
            contentType: false,
            data: data,
            success: function(data) {

                // $('.cover-field').css('height', 'auto')
                $('#editor').append($('<img src="/' + data.src + '" class="img-responsive center-block" alt="Responsive image">'))


            },
            error: function(data) {
                alert('error!')
            }
        })
    })
    
    $('.submit-icon').click(function (event) {
        var title = $('.title-input').val()
        var cover_src = $('.cover-img').attr('src')
        var context = $('#editor').html()
        if(!title) {
            $('.error-info').html($('<div class="alert alert-danger" role="alert">Must write title!</div>'))   
        }
        if(!cover_src) {
            $('.error-info').html($('<div class="alert alert-danger" role="alert">Must upload cover image!</div>'))
        }
        alert( title && cover_src && context )
        if( title && cover_src && context ){
            $.ajax({
                url: '/admin/article',
                method: 'POST',
                data: {
                    title: title,
                    cover_src: cover_src,
                    context: context
                },
                success: function(data) {
                    if(data.success)
                        alert('success')
                },
                error: function (){
                    
                }
            })
        }

    }) 



}())
