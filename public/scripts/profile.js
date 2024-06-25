// const favs = $(".fav_map_id").data();

// console.log("Favs", favs);

$(() => {
  $.ajax({
    method: 'GET',
    url: `/profiles/userId/favs`
  })
  .done((response) => {
    console.log("Response", response);

    for(const fav of response.favorites) {
      console.log("Map ID", fav.map_id);
      console.log("Title", fav.map_title);
      let $aside = $("<aside class='fav_map_id'>").data("fav-mapId", fav.map_id);
      let $a = $("<a>").attr('href', `http://localhost:8080/maps/${fav.map_id}`).text(fav.map_title);
      let $li = $("<li>").append($a);
      $(".my-favs").append($li, $aside);
    }
  });

  $.ajax({
    method: 'GET',
    url: `/profiles/userId/contributions`
  })
  .done((results) => {
    console.log("Results", results);

    for(const contribution of results.contributions) {
      console.log("Map ID", contribution.map_id);
      console.log("Title", contribution.map_title);
      let $aside = $("<aside class='contribution_map_id'>").data("contribution-mapId", contribution.map_id);
      let $a = $("<a>").attr('href', `http://localhost:8080/maps/${contribution.map_id}`).text(contribution.map_title);
      let $li = $("<li>").append($a);
      $(".my-contributions").append($li, $aside);
    }
  });
});
