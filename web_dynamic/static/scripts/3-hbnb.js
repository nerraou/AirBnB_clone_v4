$(document).ready(() => {
  let amentities = [];

  $('[data-id] input').change((e) => {
    const self = $(e.target);
    const parent = self.parent();

    const dataId = parent.data('id');
    const dataName = parent.data('name');

    if (self.is(':checked')) {
      amentities.push({ id: dataId, name: dataName });
    } else {
      amentities = amentities.filter((amentiy) => {
        return amentiy.id !== dataId;
      });
    }

    const amentitiesString = amentities
      .map((amentiy) => {
        return amentiy.name;
      })
      .join(', ');

    $('#amenities_list').text(amentitiesString);
  });

  $.get('http://0.0.0.0:5001/api/v1/status', (data, statusText) => {
    if (statusText === 'success' && data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  function getPlural (count) {
    if (count > 1) {
      return 's';
    }
    return '';
  }

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    headers: {
      'content-type': 'application/json'
    },
    dataType: 'json',
    success: function (data) {
      $.each(data, (_i, place) => {
        const htmlPlace = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$ ${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest${getPlural(place.max_guest)}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom${getPlural(place.number_rooms)}
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom${getPlural(
          place.number_bathrooms
        )}
            </div>
          </div>
          <div class="description">${place.description}</div>
      </article>`;

        $('section.places').append(htmlPlace.trim());
      });
    }
  });
});
