<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "ajax_project");


if(!$conn){
    die("Connection refused: " . mysqli_connect_error());
}

// initial page loader
if(isset($_POST['everything'])){
    $result = mysqli_query($conn, "SELECT * FROM `playlists`;");
$resultArray = [];

if(mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $resultArray[] = $row;
    }
} else {
    print "No results";
}

print json_encode($resultArray);
mysqli_close($conn);

}

// get playlist image
if(isset($_POST['playlist_image'])) {
    $result = mysqli_query($conn, "SELECT `playlist_url` FROM `playlists` WHERE `playlist_id` = '{$_POST['playlist_image']}' LIMIT 1;");
    print json_encode(mysqli_fetch_assoc($result));
}
// get specific playlist songs
if(isset($_POST['playlist_id'])) {
$result = mysqli_query($conn, "SELECT `playlist_songs` FROM `playlists` WHERE `playlist_id` = {$_POST['playlist_id']};");
while($rows = mysqli_fetch_array($result)) {
   $songs=explode(',', $rows['playlist_songs']); //turn the result from playlist songs to arrayS
   foreach($songs as $song) {
      $query = mysqli_query($conn, "SELECT * FROM `songs` WHERE `song_id` = {$song};");
       $songs_array[] = (mysqli_fetch_assoc($query));
   }
}
    print json_encode($songs_array);
    mysqli_close($conn);

}

if(isset($_POST['delete_playlist'])) {
    $delete = mysqli_query($conn, "DELETE FROM `playlists` WHERE `playlist_id` = '{$_POST['delete_playlist']}'");
    print json_encode("Playlist Deleted Successfully");
}





