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
        $('section.places').append(createPlaceHTML(place));
      });
    }
  });

  $('#search_button').on('click', () => {
    const data = {
      amenities: amentities.map((amentiy) => amentiy.id)
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      data: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (data) {
        $('section.places').html('');
        $.each(data, (_i, place) => {
          $('section.places').append(createPlaceHTML(place));
        });
      }
    });
  });

  function createPlaceHTML (place) {
    function getPlural (count) {
      if (count > 1) {
        return 's';
      }
      return '';
    }

    return `
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
          ${place.number_bathrooms} Bathroom${getPlural(place.number_bathrooms)}
        </div>
      </div>
      <div class="description">${place.description}</div>
  </article>`.trim();
  }
});
