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
