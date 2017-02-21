$(document).ready(function(){
  //
  // $('#post_btn').on('click', function(e) {
  //   console.log('button pressed')
  //   $.post('/form', function(data, status){
  //       console.log("data: " + data + 'whatever' + status)
  //     })
  //   })

    $('#signup').on('submit', function(e){
      formInput = $('#signup').serialize()
      console.log('input: ' + formInput)
      e.preventDefault()
      // e.preventDefault()
      $.post({
        url: '/form',
        data: formInput,
        success: function(data) {console.log('res: ' + data)}
      })
    })
})

  //
  // post on button click
  // $('#searchSubmit').on('click', function(e){
  //   query = $('input')
  //   e.preventDefault()
  //   $.post({
  //     url: '/searchresult',
  //     data: query,
  //     success: function (data) {
  //       $('div.results').html(data)
  //     }
  //   })
  // })

// })
