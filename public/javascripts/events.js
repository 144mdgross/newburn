$(document).ready(() => {
  $('.carousel').carousel();


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
})
