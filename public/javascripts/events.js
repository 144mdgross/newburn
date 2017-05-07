$(document).ready(() => {
  $('.carousel').carousel();
  $(".button-collapse").sideNav();

  let counter = 2
  let update = 2

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
        Materialize.toast('An error occured. Please try again.', 4000)
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
        location.assign('/videos')
      },
      error: err => {
        Materialize.toast('An error occured. Please try again.', 4000)
      }
    })
  })

  $('#logout').click(e => {

    $.ajax({
      method: 'DELETE',
      url: `/videos`,
      success: goodbye => {
        location.assign('/')
      },
      error: stayForever => {
        Materialize.toast('An error occured. Please try again.', 4000)
      }
    })
  })

  $('#hideButton').click(e => {
    counter += 1
    if(counter % 2 === 0) {
      $('#hideForm').show()
      $(e.target).text('hide form')
      $('#videoTitle').text('Add to Collection')
    } else {
      $('#hideForm').hide()
      $(e.target).text('show form')
      $('#videoTitle').text('Browse Collection')
    }
  })

  $('#hideUpdate').click(e => {
    update += 1
    if(update % 2 === 0) {
      $('#updateForm').show()
      $(e.target).text('hide form')
    } else {
      $('#updateForm').hide()
      $(e.target).text('show form')
    }
  })

})
