export enum AppState {
  INITIAL = 'INITIAL',
  DARKNESS = 'DARKNESS',
  CANDLE = 'CANDLE',
  CANDLE_BLOWN = 'CANDLE_BLOWN',
  CAKE_ENTRANCE = 'CAKE_ENTRANCE',
  CAKE_INTERACTION = 'CAKE_INTERACTION',
  EATING = 'EATING',
  FUNNY_MSG = 'FUNNY_MSG',
  LETTER = 'LETTER',
  FINAL = 'FINAL'
}

export interface AudioControl {
  playTrack1: () => void;
  playTrack2: () => void;
  fadeTransition: () => void;
}
