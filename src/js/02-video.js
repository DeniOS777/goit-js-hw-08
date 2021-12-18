import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

let currentTimeSaved = localStorage.getItem('videoplayer-current-time');

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', function (data) {
  let currentTime = data.seconds;
  console.log(`Текущее время видео:`, currentTime);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
});

player
  .setCurrentTime(currentTimeSaved)
  .then(function (seconds) {
    console.log(`Время остановки видео:`, seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
