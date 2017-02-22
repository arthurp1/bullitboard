$(document).ready(function(){

    $('#message_form').on('submit', function(e){
      // e.preventDefault()
      var $user = $('#first_name').val()
      var $title = $('#title').val()
      var $body = $('#textarea').val()
      var formInput = {
        user: $user,
        title: $title,
        body: $body
      }
      console.log(formInput)
      $.post({
        url: '/form',
        data: formInput,
        success: (data) => {console.log(data)}
        })

    })

      $('#login_form').on('submit', function(e){

        e.preventDefault()
        var $user = $('#first_name').val()
        var $password = $('#password').val()
        console.log('request send')
        var formInput = {
          user: $user,
          password: $password,
        }
        console.log(formInput)
        $.post({
          url: '/login',
          data: formInput,
          success: (data) => {console.log(data)}
          })

      })
})
