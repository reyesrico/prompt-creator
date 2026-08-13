import type { Theme } from './components/AppHeader'

export function getThemeForHour(hour: number): Theme {
  return hour >= 7 && hour < 19 ? 'light' : 'dark'
}