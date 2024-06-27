// const favs = $(".fav_map_id").data();

// console.log("Favs", favs);

$(() => {
  $.ajax({
    method: 'GET',
    url: `/profiles/favs`
  })
  .done((response) => {
    console.log("Response", response);

    for(const fav of response.favorites) {
      console.log("Map ID", fav.map_id);
      console.log("Title", fav.map_title);

      const $a = $("<a>").attr('href', `http://localhost:8080/maps/${fav.map_id}`);

      const $section = $("<section class='fav-map'>");
      const $img = $("<img>").attr('src', fav.map_thumbnail_url);
      const $imgDiv = $("<div class='img-container'>").append($img);
      const $aside = $("<aside class='fav_map_id'>").data("fav-mapId", fav.map_id);
      const $li = $("<li>").text(fav.map_title);
      $section.append($li, $aside, $imgDiv);
      $li.wrap($a);
      $img.wrap($a);
      $(".my-favs").append($section);
    }
  });

  $.ajax({
    method: 'GET',
    url: `/profiles/contributions`
  })
  .done((results) => {
    console.log("Results", results);

    for(const contribution of results.contributions) {
      console.log("Map ID", contribution.map_id);
      console.log("Title", contribution.map_title);

      const $a = $("<a>").attr('href', `http://localhost:8080/maps/${contribution.map_id}`);

      const $section = $("<section class='contri-map'>");
      const $img = $("<img>").attr('src', contribution.map_thumbnail_url);
      const $imgDiv = $("<div class='img-container'>").append($img);
      const $aside = $("<aside class='contribution_map_id'>").data("contribution-mapId", contribution.map_id);
      const $li = $("<li>").text(contribution.map_title);
      $section.append($li, $aside, $imgDiv);
      $li.wrap($a);
      $img.wrap($a);
      $(".my-contributions").append($section);
    }
  });
});
