import { CatApiData } from '../utils/cat-management-utils';

export interface Cat {
  id: number,
  name: string,
  shortInfo: string,
  more: string,
  disabled: boolean,
}

export interface CatFullInfo {
  name: string,
  shortInfo: string,
  more: string,
  bio: string,
  image: string,
}

export function createCatFromDto(catData: CatApiData): Cat {
  return {
    id: catData.id,
    name: catData.name,
    shortInfo: catData.shortInfo,
    more: catData.more,
    disabled: false,
  }
}
