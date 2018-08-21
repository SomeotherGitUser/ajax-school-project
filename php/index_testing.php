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

//get specific playlist songs
if(isset($_POST['playlist_id'])) {
        $image = mysqli_query($conn, "SELECT `playlist_url` FROM `playlists` WHERE `playlist_id` = '{$_POST['playlist_id']}' LIMIT 1;");
        $playing_playlist[] = mysqli_fetch_assoc($image);
        $songs = mysqli_query($conn, "SELECT `song_id` FROM `playlist_songs` WHERE `playlist_id` = {$_POST['playlist_id']};");
        $songs = mysqli_fetch_assoc($songs);
        var_dump($songs);
// foreach($songs as $song) {
//     $playlistQuery = mysqli_query($conn, "SELECT * FROM `songs` WHERE `song_id` = '{$song}';");
//     $playing_playlist[] = mysqli_fetch_assoc($playlistQuery);
    
// }
    // var_dump($playing_playlist);

}

if(isset($_POST['delete_playlist'])) {
    $delete = mysqli_query($conn, "DELETE FROM `playlists` WHERE `playlist_id` = '{$_POST['delete_playlist']}'");
    print json_encode("Playlist Deleted Successfully");
}

if(isset($_GET['addSong'])) {
    $songs_array = $_POST['songs_array'];
    $new_playlist = $_POST['new_playlist'];
    
    }




