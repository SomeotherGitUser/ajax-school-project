<?php

$conn = mysqli_connect("localhost", "root", "", "ajax_project");

 $counter = [];
    $myArray = $_POST['songs_array'];
    foreach ($myArray as $value) {
     $insertQuery = mysqli_query($conn, "INSERT INTO `songs` (`song_name`,`song_url`) VALUES ('{$value['name']}', '{$value['url']}');");
        if($insertQuery){
            $selectQuery = mysqli_query($conn, "SELECT `song_id` FROM `songs` WHERE `song_name` = '{$value['name']}' AND `song_url` = '{$value['url']}';");
            while ($row = mysqli_fetch_array($selectQuery)) {
        $counter[] = $row;
    }
            
        }
}
    if(count($counter) > 0) {
       $playlist = $_POST['new_playlist'];
        $playlist_songs =[];
        for($i = 0; $i < count($counter); $i++) {
            $playlist_songs[] = $counter[$i];
        }
        var_dump($playlist_songs);
//        $playlistAdd = mysqli_query($conn, "INSERT INTO `playlists` (`playlist_name`,`playlist_url`,`playlist_songs`) VALUES ('{$playlist['playlist_name']}','{$playlist['playlist_url']}','{}');");
    }

        $playlistQuery = mysqli_fetch_array(mysqli_query($conn, "SELECT MAX(`playlist_id`) FROM `playlists`;"));
        var_dump($playlistQuery);