const data = require('../../fixtures/orphanages.json');

export default {
  generator: function () {
    const randomOrphanage = Math.floor(Math.random() * data.orphanages.length);

    const orphanage = data.orphanages[randomOrphanage];

    return {
      name: orphanage.name,
      description: orphanage.description,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      location: {
        latitude: orphanage.location.latitude,
        longitude: orphanage.location.longitude,
      },
      images: orphanage.images,
    };
  },
};
