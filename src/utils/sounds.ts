const sounds = {
  add: new Audio('/sounds/add.mp3'),
  complete: new Audio('/sounds/complete.mp3'),
  delete: new Audio('/sounds/delete.mp3'),
  // add: new Audio('/src/assets/sounds/test.wav'),
  // complete: new Audio('/src/assets/sounds/test.wav'),
  // delete: new Audio('/src/assets/sounds/test.wav'),
  // test: new Audio('/src/assets/sounds/test.wav')
};

export function playSound(soundName: keyof typeof sounds, volume: number = 0.5) {
  const sound = sounds[soundName];
  if (sound) {
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(error => {
      console.log('Error playing sound:', error);
    });
  }
}