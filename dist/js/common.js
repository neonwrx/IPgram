firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $('.login-cover').hide();

    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    if (dialog.open) {
      dialog.close();
      location.reload();
    }

  } else {
    // No user is signed in.
    $('.login-cover').show();

    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

  }
});

/* LOGIN PROCESS */

$("#loginBtn").click(
  function(){

    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if (email !="" && password != "") {

      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        $("#loginError").show().text(error.message);

        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);

/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.


    }, function(error) {
      // An error happened.
      alert(error.message);

    });

  }
);

$(function() {
  // $('body').fadeOut();
  $('#data-table').dataTable({
    'initComplete': DTinitComplete
  });

  var items = firebase.database().ref().child("Items");

  items.on("child_added", snap => {

    var title = snap.child("Title").val();
    var primary = snap.child("Primary").val();
    var secondary = snap.child("Secondary").val();
    var brand = snap.child("Brand").val();
    var created = snap.child("Created").val();
    var status = snap.child("Status").val();
    var uId = snap.child("uId").val();

    $("#data-table > tbody").append("<tr id='Item_" + uId + "' data-id='"+ uId +"'><td>" + title + "</td><td class='text-center'>" + primary + "</td><td class='text-center'>" + secondary + "</td><td class='text-center'>" + brand + "</td><td class='text-center'>" + created + "</td><td class='text-center'>" + status + "</td><td class='text-center'><a href='#' class='pbtn-action pbtn-action--hregular'><i class='material-icons no-margin'>border_color</i></a></td><td class='text-center'><a href='#' class='pbtn-action pbtn-action--hregular'><i class='material-icons no-margin'>print</i></a></td><td class='text-center'><a href='#' class='pbtn-action pbtn-action--regular pbtn-action--hregular guideline_approve'><i class='material-icons no-margin'>playlist_add_check</i></a></td><td class='text-center'><a href='#' data-toggle='modal' data-target='#EditorCreateModal' class='pbtn-action pbtn-action--hregular'><i class='material-icons no-margin'>content_copy</i></a></td><td class='text-center'><a href='#' data-toggle='modal' data-target='#EditorUpdateModal' id='go' class='pbtn-action pbtn-action--hregular'><i class='material-icons no-margin'>edit</i></a></td><td class='text-center'><a href='#' onclick='deleteRow2(this)' class='pbtn-action pbtn-action--danger'><i class='material-icons no-margin'>delete_forever</i></a></td></tr>");

  });

  items.on("child_changed", snap => {
    var title = snap.child("Title").val();
    var primary = snap.child("Primary").val();
    var secondary = snap.child("Secondary").val();
    var brand = snap.child("Brand").val();
    var uId = snap.child("uId").val();
    var row = document.getElementById("Item_" + uId);
    var cell = row.getElementsByTagName("td");

    cell[0].innerHTML = title;
    cell[1].innerHTML = primary;
    cell[2].innerHTML = secondary;
    cell[3].innerHTML = brand;
  });

  items.on("child_removed", snap => {
    var uId = snap.child("uId").val();
    $("#Item_" + uId).remove();
  });
});

function DTinitComplete(){
  $("#dropdown-filter").text('');
  this.api().columns([1]).every( function () {
      var column = this;
      var select = $('<select class="select2" id="region_select"></select>')
              .on( 'change', function () {
                  var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                  );

                  column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
              } );
      select.append( '<option value="">All primaries</option>' );
      column.data().unique().sort().each( function ( d, j ) {
          if (d) {
              select.append('<option value="' + d + '">' + d + '</option>');
          }
      } );
      $('#dropdown-filter').append($('<div class="select-wrap">'+$(column.header()).text()+':</div>').append($('<div class="select-custom">' + '</div>').append(select)));
  } );
  this.api().columns([2]).every( function () {
      var column = this;
      var select = $('<select class="select2" id="region_select"></select>')
              .on( 'change', function () {
                  var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                  );

                  column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
              } );
      select.append( '<option value="">All secondaries</option>' );
      column.data().unique().sort().each( function ( d, j ) {
          if (d) {
              select.append('<option value="' + d + '">' + d + '</option>');
          }
      } );
      $('#dropdown-filter').append($('<div class="select-wrap">'+$(column.header()).text()+':</div>').append($('<div class="select-custom">' + '</div>').append(select)));
  } );
  this.api().columns([3]).every( function () {
      var column = this;
      var select = $('<select class="select2" id="region_select"></select>')
              .on( 'change', function () {
                  var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                  );

                  column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
              } );
      select.append( '<option value="">All brands</option>' );
      column.data().unique().sort().each( function ( d, j ) {
          if (d) {
              select.append('<option value="' + d + '">' + d + '</option>');
          }
      } );
      $('#dropdown-filter').append($('<div class="select-wrap">'+$(column.header()).text()+':</div>').append($('<div class="select-custom">' + '</div>').append(select)));
  } );
  this.api().columns([5]).every( function () {
      var column = this;
      var select = $('<select class="select2" id="region_select"></select>')
              .on( 'change', function () {
                  var val = $.fn.dataTable.util.escapeRegex(
                          $(this).val()
                  );

                  column
                          .search( val ? '^'+val+'$' : '', true, false )
                          .draw();
              } );
      select.append( '<option value="">All statuses</option>' );
      column.data().unique().sort().each( function ( d, j ) {
          if (d) {
              select.append('<option value="' + d + '">' + d + '</option>');
          }
      } );
      $('#dropdown-filter').append($('<div class="select-wrap">'+$(column.header()).text()+':</div>').append($('<div class="select-custom">' + '</div>').append(select)));
  } );
}

function writeItemData(itemId, title, primary, secondary, brand, created, status) {
  firebase.database().ref('Items/Item_' + itemId).set({
    uId: itemId,
    Title: title,
    Primary: primary,
    Secondary: secondary,
    Brand: brand,
    Created: created,
    Status: status
  });
}

function updateItemData(itemId, title, primary, secondary, brand) {
  firebase.database().ref('Items/Item_' + itemId).update({
    Title: title,
    Primary: primary,
    Secondary: secondary,
    Brand: brand
  });
}

function deleteItemData(delItemId) {
  firebase.database().ref('Items/' + delItemId).remove();
}

function deleteRow2(row) {
  var id = row.parentNode.parentNode.id;
  deleteItemData(id);
}

$("#create_new_modal_btn").click(
  function () {

    var name = $("#id_name").val();
    var primaryName = $("#id_primary_name option:selected").text();
    var secondaryName = $("#id_secondary_name option:selected").text();
    var brand = $("#id_brand option:selected").text();
    var newItemId = Math.round(Math.random()*1000);
    var d = new Date();

    writeItemData(newItemId, name, primaryName, secondaryName, brand, formatDate(d), "editable");

  }
);

function formatDate (date) {
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var yy = date.getFullYear();
  var hh = date.getHours();
  var mm = date.getMinutes();

  return dd + ' ' + month[date.getMonth()] + ' ' + yy + ' | ' + hh + ':' + mm;
}
var itemId;

$('#EditorUpdateModal').on('show.bs.modal', function (event) {
  var row = $(event.relatedTarget).parent().parent();
  var title = row.find('td:eq(0)').html();
  var primary = row.find('td:eq(1)').html();
  var secondary = row.find('td:eq(2)').html();
  var brand = row.find('td:eq(3)').html();
  var modal = $(this);
  modal.find('select').children().removeAttr("selected");
  itemId = row.data("id");
  console.log(primary);
  modal.find('#id_name').val(title);
  function select(a,b) {
    modal.find(a).each(function() {
      var sel = $(this).text();
      if (b == sel) {
        $(this).attr('selected', 'selected');
      }
    });
  }
  select('#id_primary_name option', primary);
  select('#id_secondary_name option', secondary);
  select('#id_brand option', brand);

  modal.find('#id_primary_name :selected').html(primary);
  modal.find('#id_secondary_name :selected').html(secondary);
  modal.find('#id_brand :selected').html(brand);

  modal.find('#update_modal_btn').on('click', function() {
    var t = modal.find('#id_name').val();
    var p = modal.find('#id_primary_name :selected').html();
    var s = modal.find('#id_secondary_name :selected').html();
    var b = modal.find('#id_brand :selected').html();

    // console.log(itemId, p, s, b);
    console.log(itemId);
    updateItemData(itemId, t, p, s, b);
    modal.modal('hide');
  });
});
