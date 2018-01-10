console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click


  $('#viewKoalas').on('click','.markReady', markReady);
  $('#viewKoalas').on('click','.deleteKoala', deleteKoala);

}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      displayKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function displayKoalas(data) {

  $('#viewKoalas').empty();

  for (let i = 0; i < data.length; i++) {
    let newRow = $('<tr>');
    newRow.append('<td>' + data[i].name + '</td>');
    newRow.append('<td>' + data[i].gender + '</td>');
    newRow.append('<td>' + data[i].age + '</td>');
    newRow.append('<td>' + data[i].ready_to_transfer + '</td>');
    newRow.append('<td>' + data[i].notes + '</td>');
    if (data[i].ready_to_transfer === 'N') {
      newRow.append('<td><button type="button" class="markReady btn btn-primary" value="' + data[i].id + '">Ready for Transfer</button></td>');
    } else {
      newRow.append('<td></td>');
    }
    newRow.append('<td><button type="button" class="deleteKoala btn btn-danger" value="' + data[i].id + '">Delete</button></td>')

    $('#viewKoalas').append(newRow);
  }
}

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( response ){
      console.log( 'got some koalas: ', response );
      getKoalas();
    } // end success
  }); //end ajax
}

function markReady() {
  let koalaId = $(this).val();
  $.ajax({
    type: 'PUT',
    url: '/koalas/' + koalaId,
    data: { ready_to_transfer: 'Y' },
    success: function( response) {
      console.log('response',response);
      getKoalas();
    }
  });
}

function deleteKoala() {
  let koalaId = $(this).val();
  $.ajax({
    type: 'DELETE',
    url: '/koalas/' + koalaId,
    success: function( response) {
      console.log('response',response);
      getKoalas();
    }
  });
}