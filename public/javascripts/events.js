$(document).ready(() => {
  $('.carousel').carousel();

  let counter = 2

  $('#update').click(e => {
    let title = document.getElementById('title').value
    let director = document.getElementById('director').value
    let duration = document.getElementById('duration').value
    let id = +$(e.target).attr('data-id')

    $.ajax({
      method: 'PATCH',
      url: `/videos/${id}`,
      dataType: 'json',
      data: {
        id,
        title,
        director,
        duration
      },
      success: (video) => {
        location.reload(true)
      },
      error: (err) => {
        console.log(err)
      }
    })
  })

  $('#delete').click(e => {
    let id = +$(e.target).attr('data-id')

    $.ajax({
      method: 'DELETE',
      url: `/videos/${id}`,
      dataType: 'json',
      data: {
        id
      },
      success: gone => {
        location.reload(true)
        alert("it's gone and you're happy right?")
      },
      error: err => {
        console.log(err);
      }
    })
  })

  $('#logout').click(e => {

    $.ajax({
      method: 'DELETE',
      url: `/videos`,
      success: goodbye => {
        location.assign('/')
        console.log("bye");
      },
      error: stayForever => {
        console.log(err);
      }
    })
  })

  $('#hideButton').click(e => {
    console.log('click?');
    counter += 1
    if(counter % 2 === 0) {
      console.log('in show?');
      $('#hideForm').show()
      $(e.target).text('hide form')
    } else {
      $('#hideForm').hide()
      $(e.target).text('show form')
    }
  })

})
