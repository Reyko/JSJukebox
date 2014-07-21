$(document).ready(function(){
  SC.initialize({
    client_id: '8bbefc4c2937df96f51c71f029e885a2'
  });
});

function popUp(){
 var info = document.getElementById("container");
 info.setAttribute("class","display")
} 


function doSearch() {
  var searchTerm = document.getElementById('search').value;
  // Encode spaces
  searchTerm = searchTerm.replace(" ", "+");
  // Search soundcloud for artists
  SC.get('/tracks', { q: searchTerm, license: 'cc-by-sa' }, function(tracks) {
            
    var imageCon = document.getElementById("cover");

    while (imageCon.firstChild) {
      imageCon.removeChild(imageCon.firstChild);
    }

    for(track in tracks) {
      // console.log(tracks[track]);
      var track = new Track(tracks[track]["artwork_url"],tracks[track]["description"],tracks[track]["title"],tracks[track]["uri"])

      // Album cover
      var cover = document.createElement("img");

      cover.onclick = function(){

        var container = document.createElement("div");
        container.setAttribute("id","container");
        var trackWindow = document.createElement("div");
        trackWindow.setAttribute("class","trackWindow");
        var close = document.createElement("div");
        close.setAttribute("class","close");
        close.innerHTML="close";
        var paragraph = document.createElement("p");
        var header = document.createElement("h3");
        
        var title = this.getAttribute("data-title");
        var description = this.getAttribute("data-description");



        paragraph.innerHTML = description;
        header.innerHTML = title;

        // Creation of the player
        var player = document.createElement("iframe");
        player.setAttribute("id","sc-widget");
        player.setAttribute("width","100%");
        player.setAttribute("height","166");
        player.setAttribute("scrolling","no");
        player.setAttribute("frameborder","no");
        player.setAttribute("src","https://w.soundcloud.com/player/?url=" + track.soundUrl + "&&show_artwork=true");
        

        trackWindow.appendChild(close);
        trackWindow.appendChild(header);              

        trackWindow.appendChild(player);
        trackWindow.appendChild(paragraph);
        container.appendChild(trackWindow);

        close.onclick = function(){
          document.body.removeChild(container);
        }

        document.body.appendChild(container);
      }

      if (track.imgUrl!=null){
        cover.setAttribute("src",track.imgUrl);
        cover.dataset.description = track.desc;
        cover.dataset.title = track.title;
        imageCon.appendChild(cover);
      }
        // Album more info
    }
  });
};
