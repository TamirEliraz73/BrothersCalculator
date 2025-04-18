export type Sort = {
  id: boolean | null,
  value: boolean | null,
  div: boolean | null,
  mod: boolean | null
}
export const setSort = (): Sort => {return {div: null, mod: null, value: null, id: null}}
export const setSortId = (): Sort => {return {div: null, mod: null, value: null, id: true}}
export const setSortValue = (): Sort => {return {div: null, mod: null, value: true, id: null}}
export const setSortDiv = (): Sort => {return {div: true, mod: null, value: null, id: null}}
export const setSortMod = (): Sort => {return {div: null, mod: true, value: null, id: null}}
