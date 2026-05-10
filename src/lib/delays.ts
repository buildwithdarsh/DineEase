function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function pageLoadDelay(): Promise<void> {
  return delay(randomBetween(800, 1200));
}

export function actionDelay(): Promise<void> {
  return delay(randomBetween(400, 700));
}

export function lazyLoadDelay(): Promise<void> {
  return delay(randomBetween(300, 500));
}

export function slowLoadDelay(): Promise<void> {
  return delay(randomBetween(1800, 2500));
}
