import { Item } from './../@types/type.d';

export function getPbImageURL<K extends keyof Item>(item: Item, fileName: K = 'photo' as K) {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName]}`;
}