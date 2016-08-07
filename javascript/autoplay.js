

window.onload = function() {
    // autoplay when finished
    var audio_track = document.getElementById("track");
    var autoplay_button = document.getElementById("autoplay");
    var autoplay = getQueryParams().autoplay == "true";
    var volume_string = getQueryParams().volume;
    function next_autoplay_location() {
        var volume = audio_track ? "&volume=" + audio_track.volume : ( volume_string ? "&volume=" + volume_string : "" );
        return next_post_url + "?autoplay=true" + volume;
    }
    if (audio_track) {
        audio_track.onended = function () {
            if ((!autoplay_button || autoplay_button.checked) && next_post_url) {
                document.location = next_autoplay_location();
            }
        }
        if (autoplay) {
            audio_track.play()
        }
        if (volume_string) {
            audio_track.volume = parseFloat(volume_string);
        }
    } else if (autoplay && next_post_url) {
        // skip if there is nothing to play
        document.location = next_autoplay_location();
    }
    if (autoplay_button) {
        autoplay_button.checked = autoplay;
    }
}

