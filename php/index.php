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


if(isset($_POST['delete_playlist'])) {
    $delete = mysqli_query($conn, "DELETE FROM `playlists` WHERE `playlist_id` = '{$_POST['delete_playlist']}'");
    print json_encode("Playlist Deleted Successfully");
}

if(isset($_GET['addSong'])) {
    $songs_array = $_POST['songs_array'];
    $new_playlist = $_POST['new_playlist'];
    
    }

//playlist image
if(isset($_GET['playlist_image'])){
    $imageQuery = mysqli_query($conn, "SELECT `playlist_url` FROM `playlists` WHERE `playlist_id` = '{$_POST['playlist_id']}';");
    $image = mysqli_fetch_assoc($imageQuery);
    print json_encode($image);
}
    //get specific playlist songs
if(isset($_POST['playlist_id'])) {
    $getSongs = mysqli_query($conn, "SELECT * FROM `playlist_songs` WHERE `playlist_id` = '{$_POST['playlist_id']}';");
    print_r($getSongs);
    $the_songs_array = [];
    while ($iterator = mysqli_fetch_assoc($getSongs)) {
        $the_songs_array[] = $iterator;
    }
    if(count($the_songs_array) > 0) {
        foreach ($the_songs_array as $song) {
            $songsSelector = mysqli_query($conn, "SELECT * FROM `songs` WHERE `song_id` = '{$song['song_id']}';");
            
        }
    }
}