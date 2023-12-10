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
});
