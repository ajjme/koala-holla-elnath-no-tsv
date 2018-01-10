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
      name: 'testName',
      age: 1,
      gender: 'M',
      ready_to_transfer: 'Y',
      notes: 'test Notes',
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
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
