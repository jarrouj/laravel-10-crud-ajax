$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function () {
  // create post
  $('#create-post-btn').click(function() {
      $('.error').remove();
      $('#postId').remove();
      $('#postModal #modalTitle').text('Create Post');
      $('#postForm')[0].reset();
      $('#postModal').modal('toggle');
  });

   // form validate and submit
    $('#postForm').validate({
        rules: {
            title: 'required',
            description: 'required',
        },
        messages: {
            title: 'Please enter the title',
            description: 'Please enter the description',
        },

        submitHandler: function(form) {
            const id = $('input[name=postId]').val();
            const formData = $(form).serializeArray();

            $.ajax({
                url: 'posts',
                type: 'POST',
                data: formData,
                success: function(response) {
                    if (response && response.status === 'success') {

                        // clear form
                        $('#postForm')[0].reset();

                        // toggle modal
                        $('#postModal').modal('toggle');

                        $('#postsTable p').empty();

                        const data = response.data;

                        if (id) {
                            $("#post_"+id+" td:nth-child(2)").html(data.title);
                            $("#post_"+id+" td:nth-child(3)").html(data.description);
                        }

                        else {
                            $('#postsTable').prepend(`<tr id=${'post_'+data.id}><td>${data.id}</td><td>${data.title}</td><td>${data.description}</td><td>
                            <a href="javascript:void(0)" data-id=${data.id} title="Edit" class="btn btn-sm btn-success btn-edit"> Edit </a>
                            <a href="javascript:void(0)" data-id=${data.id} title="Delete" class="btn btn-sm btn-danger btn-delete"> Delete </a></td></tr>`);
                        }
                    }
                }
            });
        }
    })
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $(document).ready(function () {
      // create post
      $('#create-post-btn').click(function() {
          $('.error').remove();
          $('#postId').remove();
          $('#postModal #modalTitle').text('Create Post');
          $('#postForm')[0].reset();
          $('#postModal').modal('toggle');
      });

       // form validate and submit
        $('#postForm').validate({
            rules: {
                title: 'required',
                description: 'required',
            },
            messages: {
                title: 'Please enter the title',
                description: 'Please enter the description',
            },

            submitHandler: function(form) {
                const id = $('input[name=postId]').val();
                const formData = $(form).serializeArray();

                $.ajax({
                    url: 'posts',
                    type: 'POST',
                    data: formData,
                    success: function(response) {
                        if (response && response.status === 'success') {

                            // clear form
                            $('#postForm')[0].reset();

                            // toggle modal
                            $('#postModal').modal('toggle');

                            $('#postsTable p').empty();

                            const data = response.data;

                            if (id) {
                                $("#post_"+id+" td:nth-child(2)").html(data.title);
                                $("#post_"+id+" td:nth-child(3)").html(data.description);
                            }

                            else {
                                $('#postsTable').prepend(`<tr id=${'post_'+data.id}><td>${data.id}</td><td>${data.title}</td><td>${data.description}</td><td>
                                <a href="javascript:void(0)" data-id=${data.id} title="Edit" class="btn btn-sm btn-success btn-edit"> Edit </a>
                                <a href="javascript:void(0)" data-id=${data.id} title="Delete" class="btn btn-sm btn-danger btn-delete"> Delete </a></td></tr>`);
                            }
                        }
                    }
                });
            }
        })





  });




 // edit button click
 $(document).on('click', '.btn-edit', function() {
    const id = $(this).data('id');
    $('label.error').remove();
    $('input[name=title]').removeClass('error');
    $('input[name=title]').after('<input type="hidden" name="postId" value="'+id+'" />')
    $('textarea[name=description]').removeClass('error');
    $('input[name=title]').removeAttr('disabled');
    $('textarea[name=description]').removeAttr('disabled');
    $('#postModal button[type=submit]').removeClass('d-none');

    $.ajax({
        url: `posts/${id}`,
        type: 'GET',
        success: function(response) {
            if (response && response.status === 'success') {
                const data = response.data;
                $('#postModal #modalTitle').text('Update Post');
                $('#postModal input[name=title]').val(data.title);
                $('#postModal textarea[name=description]').val(data.description);
                $('#postModal').modal('toggle');
            }
        }
    })
});

// delete button click
$(document).on('click', '.btn-delete', function() {
    const id = $(this).data('id');

    if (id) {
        const result = window.confirm('Do you want to delete?');
        if (result) {
            $.ajax({
                url: `posts/${id}`,
                type: 'DELETE',
                success: function(response) {
                    if (response && response.status === 'success') {
                        const data = response.data;
                        $(`#post_${data.id}`).remove();
                    }
                }
            });
        }
        else {
            console.log('error', 'Post not found');
        }
    }
});


});
