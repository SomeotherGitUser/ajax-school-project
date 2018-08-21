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
                 if (!new_playlist_url || !new_playlist_name) {
                     $.alert("There are missing params!");
                     return false;
                 }
                 fieldVerification(new_playlist_url);
                 this.close();
                 console.log(new_playlist_url);
                 console.log(new_playlist_name);
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
                     '<input type="text" placeholder="song url..." class="song_url form-control new_song" name="new_song" required />' +
                     "</div>" +
                     '<div class="form-group">' +
                     "<label>Song Name</label>" +
                     '<input type="text" placeholder="song name..." class="song_name form-control new_song" name="new_song" required />' +
                     "</div>" +
                     "<div id='songs_content'></div>"+
                     "</form>",
                   buttons: {
                     formSubmit: {
                       text: "Submit", //adding new SONGS
                       btnClass: "btn-blue",
                       action: function() {
                           var new_song_array = [];
                           console.log($(".formName").val());
                           var index = 0;
                           fieldVerification(new_song_array);
                           if (!$(".new_song").val()) {
                               $.alert(
                                   "You're missing some content!"
                               );
                               return false;
                           }
                           $(".new_song").each(function() {
                             new_song_array[index] = $(this).val();
                             index++;
                           });
                           console.log(new_song_array);
                           return false;
                       }
                     },
                     MoreInput: {
                       text: "Add fields",
                       btnClass: "far fa-plus-square btn-info",
                       action: function() {
                           jc.setContentAppend("<label>Song URL</label>" +
                               '<input type="text" placeholder="song url..." class="song_url form-control new_song" name="new_song" required />' +
                               "</div>" + "<label>Song Name</label>" +
                               '<input type="text" placeholder="song name..." class="song_name form-control new_song" name="new_song" required />' +
                               "</div>");
                         // $("#songs_content").append(
                         //   "<label>Song URL</label>" +
                         //     '<input type="text" placeholder="song url..." class="song_url form-control new_song" name="new_song" required />' +
                         //     "</div>" + "<label>Song Name</label>" +
                         //     '<input type="text" placeholder="song name..." class="song_name form-control new_song" name="new_song" required />' +
                         //     "</div>"
                         // );
                         return false;
                       }
                     },
                     LessInput: {
                       text: "Fewer Fields",
                       btnClass: "fas fa-minus-circle",
                       action: function () {
                           console.log($(".formName: last-child", this));
                           $(".formName: last-child", this).remove();
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