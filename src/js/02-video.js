import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

let currentTimeSaved = JSON.parse(localStorage.getItem('videoplayer-current-time'));

player.getVideoTitle().then(function (title) {
  console.log('Title:', title);
});

player.on(
  'timeupdate',
  throttle(function (data) {
    let currentTime = data.seconds.toFixed();
    console.log(`Текущее время видео в секундах:`, currentTime);
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000),
);

player
  .setCurrentTime(currentTimeSaved)
  .then(function (seconds) {
    console.log(`Время остановки видео на секунде:`, seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
