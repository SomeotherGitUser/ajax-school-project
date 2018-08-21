//Load all albums
$(document).ready(function () {
    var playlist_names = '';
    $.ajax({
        url: "http://localhost/ajax_project2/index.php",
        method: "POST",
        data: { everything: 1 },
        datatype: 'json',
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                playlist_names += '<div class="col-4">' + data[i].playlist_name + "<div class='playlist_buttons'><button class='playlist-play btn btn-link' name='playlist_id'><i class='fas fa-play' id=" + data[i].playlist_id + "></i></button></div><img class = 'playlist_image img-thumbnail' src=" + data[i].playlist_url + " placeholder = 'http://via.placeholder.com/150x150' id=" + data[i].playlist_id +"/></div>";
            }
            $(".fullList").html(playlist_names);
            
        },
        error: function(error) {
            console.log("An error has occurred:" +error);
            
        }
        
    }); 
});
// load all albums end

// Play an album
$("body").on("click", ".playlist-play", function() {
    var currentPlaylist = event.target.id;    
    var playlist = '';
    var currentSong = 0;
    var playlistImage = '';
    $(".delete-playlist").attr('id', currentPlaylist);
    $.ajax({
      url: "http://localhost/ajax_project2/index.php",
      method: "POST",
        data: { playlist_id: currentPlaylist },
      datatype: "json",
      success: function (data) {
          console.log("first ajax call "+data);
          $.ajax ({
              url: "http://localhost/ajax_project2/index.php?playlist_image",
              method: "POST",
              data: {
                  playlist_id: currentPlaylist
              },
              dataType: "json",
              success: function (image) {
                  console.log("second ajax call "+image);
                  
                  playlistImage = image.playlist_url;
                  $(".playlistImage").attr("src", playlistImage);
              },
              error: function (error) {
                  console.log("second ajax call error " + error);
              }
          });
          for (var i = 0; i < data.length; i++) {              
              playlist += '<li><a href="' + data[i].song_url + '">' + data[i].song_name + '</a></li>';
          }
          $("#playlist").html(playlist);
          $(".theMusicPlayerDiv").css('display', 'inherit');
          $("#myMusicPlayer")[0].src = $("#playlist li a")[0];
          $("#myMusicPlayer")[0].play();
          $("#playlist li a").click(function (e) {
              e.preventDefault();
              $("#myMusicPlayer")[0].src = this;
              $("#myMusicPlayer")[0].play();
              $("#playlist li").removeClass("current-song");
              currentSong = $(this)
                  .parent()
                  .index();
              $(this)
                  .parent()
                  .addClass("current-song");
          });

          $("#myMusicPlayer")[0].addEventListener("ended", function () {
              console.log("song has ended");

              currentSong++;
              if (currentSong == $("#playlist li a").length) {
                  currentSong = 0;
              }
              $("#playlist li").removeClass("current-song");
              $("#playlist li:eq(" + currentSong + ")").addClass("current-song");
              $("#myMusicPlayer")[0].src = $("#playlist li a")[currentSong].href;
              $("#myMusicPlayer")[0].play();
          });
      },
      error: function (error) {
          console.log("first ajax call error" + error);
          myMusicPlayer.pause();
          $("#playlist").html('');
          $("#myMusicPlayer").src = '';
          $(".theMusicPlayerDiv").css("display", "none");
      }
    });
});
// play an album end

// delete existing album
    $(".delete-playlist").click( function () {
        var playlist_to_delete = this.id;
        console.log(playlist_to_delete);
    const userAction = confirm("Confirm playlist deletion");
    if (userAction == true) {
        $.ajax({
                url: "http://localhost/ajax_project2/index.php",
                method: "POST",
                data: { delete_playlist: playlist_to_delete },
                datatype: "json",
                success: function (data) {
                    alert("Playlist Deleted successfully");
                },
                error: function (error) {
                    alert("Something went wrong, try again later");
                }
            });
        
    } else {
        console.log("cancel was clickeddddd");
        
    }
    });


// delete existing album end


// add new album dynamic modal

// TO-DO: ADD FIELDS. ADD SECOND SONGS MODAL. BIND TO EVENTS. FIELD VERIFICATION. 
$(".addModal").click(function () {
    $.confirm({
        backgroundDismiss: false,
        backgroundDismissAnimation: 'glow',
        columnClass: 'xl',
        theme: 'dark',
        title: "Add new test!",
        content:
            "" +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            "<label>New Playlist Image URL</label>" +
            '<input type="text" placeholder="image url..." class="url form-control" required />' +
            "</div>" +
            '<div class="form-group">' +
            "<label>New Playlist Name</label>" +
            '<input type="text" placeholder="playlist name..." class="name form-control" required />' +
            "</div>" +
            "</form>",
        buttons: {
            formSubmit: {
            text: "Submit", //adding new PLAYLIST
            btnClass: "btn-blue",
            action: function() {
                var new_playlist_url = this.$content.find(".url").val();
                var new_playlist_name = this.$content.find(".name").val();
                var new_playlist = { playlsit_name: new_playlist_name, playlist_url: new_playlist_url  };
                if (!new_playlist_url || !new_playlist_name) {
                    $.alert("There are missing params!");
                    return false;
                }
                this.close();
                $.confirm({
                  backgroundDismiss: false,
                  backgroundDismissAnimation: "glow",
                  columnClass: "xl",
                  theme: "dark",
                  title: "Continue this test!",
                  content: //THIS IS A FORM
                    "" +
                    '<form class="formName">' +
                    '<div class="form-group songsDiv" >' +
                    "<label>Song URL</label>" +
                    '<input type="text" placeholder="song url..." class="song_url form-control new_song" name="song_url" required />' +
                    "</div>" +
                    '<div class="form-group">' +
                    "<label>Song Name</label>" +
                    '<input type="text" placeholder="song name..." class="song_name form-control new_song" name="song_name" required />' +
                    "</div>" +
                    "</div>" +
                    "<div id='songs_content'></div>"+
                    "</form>",
                  buttons: {
                    formSubmit: {
                      text: "Submit", //adding new SONGS
                      btnClass: "btn-blue",
                      action: function() {
                          var new_song = {};
                          if (!$("input[name=song_url]").val() || !$("input[name=song_name]").val()) {
                            $.alert("You're missing some content!");
                            return false;
                          }
                            let songs_array = [];
                          $.each($("input[name=song_url]"), function (index, value) {
                              let songurl = $("input[name=song_url]:eq("+index+")").val();
                              new_song = {
                                  name: $("input[name=song_name]:eq("+index+")").val(),
                                 url: songurl
                              };
                              songs_array.push(new_song);
                              
                          });
                          console.log(songs_array);
                          $.ajax({
                            url:
                              "http://localhost/ajax_project2/index.php?addSong=1",
                            method: "POST",
                              data: { songs_array: songs_array, new_playlist: new_playlist},
                              dataType: "json",
                            //   beforeSend: function(x) {
                            //       if (x && x.overrideMimeType) {
                            //           x.overrideMimeType("application/j-son;charset=UTF-8");
                            //       }
                            //   },
                              success: function (data) {
                                  console.log("Success" + data);
                                  
                              },
                              error: function (error) {
                                  console.log(error);     
                              }
                            
                          });
                          return false;
                          //   $.ajax({
                        //       url:
                        //           "http://localhost/ajax_project2/index.php",
                        //       method: "POST",
                        //       data: { new_playlist_url: playlist_url, new_playlist_name: playlist_name, },
                        //       datatype: "json",
                        //       success: function (data) {
                        //         $.ajax({
                        //           url:
                        //             "http://localhost/ajax_project2/index.php",
                        //             method: "POST",
                        //             data: { song_name: song_name, song_url: song_url },
                        //         });
                        //           console.log("submitted!");
                        //       },
                        //       error: function (error) {
                        //           console.log("not submitted!");
                        //       }
                        //   });
                      }
                    },
                    MoreInput: {
                      text: "Add fields",
                      btnClass: "far fa-plus-square btn-info",
                      action: function() {
                          this.$content.find("div").setContentAppend("<label>Song URL</label>" +
                              '<input type="text" placeholder="song url..." class="song_url form-control new_song" name="song_url" required />' +
                              "</div>" + "<label>Song Name</label>" +
                              '<input type="text" placeholder="song name..." class="song_name form-control new_song" name="song_name" required />' +
                              "</div>");
                        return false;
                      }
                    },
                    LessInput: {
                      text: "Fewer Fields",
                      btnClass: "fas fa-minus-circle",
                      action: function () {
                          console.log(this.$content.find(".formName").last());
                          this.$content
                            .find("form")
                            .last()
                            .detach();
                          return false;
                      }
                    },
                    cancel: function() {
                      //close
                    }
                  }
                }); 
            }
            },
            cancel: function() {
            //close
            }
        },
        onContentReady: function() {
            // bind to events
            var jc = this;
            this.$content.find("form").on("submit", function(e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger("click"); // reference the button and click it
        });
      }
    });
})
