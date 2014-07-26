$(document).ready(function(){
  $.get('../config/config.yml', function(data) {
    SC.initialize({
      client_id: data
    });
  }); 


});

function popUp(){
  var info = document.getElementById("container");
  info.setAttribute("class","display")
} 


function doSearch() {
  var searchTerm = document.getElementById('search').value;

  $(".track").empty();

  // Encode spaces
  searchTerm = searchTerm.replace(" ", "+");
  // Search soundcloud for artists
  SC.get('/tracks', { q: searchTerm, license: 'cc-by-sa' }, function(tracks) {
            
    var counter=0
    for(track in tracks) {
      // console.log(tracks[track]);

      var track = new Track(tracks[track]["artwork_url"],tracks[track]["description"],tracks[track]["title"],tracks[track]["uri"])

      // Creation of a track

      var cover = document.createElement("div");
      cover.setAttribute("class","track");
      cover.setAttribute("data-title",track.title);
      cover.setAttribute("data-description",track.desc);
      cover.setAttribute("data-song",track.soundUrl);

      var x3d = document.createElement("x3d");
      x3d.setAttribute("width","100%");
      x3d.setAttribute("height","100%");

      var scene = document.createElement("scene");
   
      var viewpoint = document.createElement("viewpoint");
      viewpoint.setAttribute("position","0 0 5");

      var shape = document.createElement("shape");

      var appearance = document.createElement("appearance");

      var material = document.createElement("material");
      material.setAttribute("diffuseColor","0.603 0.894 0.909");

      var imageTexture = document.createElement("imageTexture");
      imageTexture.setAttribute("url",track.imgUrl);

      var box = document.createElement("box");
 
      box.setAttribute("size","3,3,0.05");

      cover.appendChild(x3d);
      x3d.appendChild(scene);
      scene.appendChild(viewpoint);
      scene.appendChild(shape);
      appearance.appendChild(imageTexture);
      shape.appendChild(appearance);
      shape.appendChild(box);
      appearance.appendChild(material);

      var allTracks = document.getElementById("tracks");


      // Limitation of tracks due to webgl issue
      if (track.imgUrl!=null && counter < 20){
       allTracks.appendChild(cover);
      }
      counter+=1


      // Album cover modal
      cover.ondblclick = function(){

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
        var song = this.getAttribute("data-song");



        paragraph.innerHTML = description;
        header.innerHTML = title;

        // Creation of the player
        var player = document.createElement("iframe");
        player.setAttribute("id","sc-widget");
        player.setAttribute("width","100%");
        player.setAttribute("height","166");
        player.setAttribute("scrolling","no");
        player.setAttribute("frameborder","no");
        player.setAttribute("src","https://w.soundcloud.com/player/?url=" + song + "&&show_artwork=true");
        

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

    }

       x3dom.reload();
  });
};
