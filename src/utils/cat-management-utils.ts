export interface CatApiData {
  id: number,
  name: string,
  shortInfo: string,
  more: string,
}

export interface CatApiMoreInfo {
  id: number,
  bio: string,
  pic: string,
}

interface CatApiList {
  basePath: string,
  data: CatApiData[],
}

const NO_CORS_API_PREFIX = 'https://cors-anywhere.herokuapp.com/';
const CAT_LIST_ENDPOINT = 'mrsoft.by/tz20/list.json';
const CAT_MORE_INFO_ENDPOINT = 'mrsoft.by/tz20';

export function getCatList(): Promise<CatApiData[]> {
  return fetch(NO_CORS_API_PREFIX + CAT_LIST_ENDPOINT)
    .then<CatApiList>(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(json => json.data);
}

export function getMoreCatInfo(catMoreInfoUrl: string): Promise<CatApiMoreInfo> {
  const url = NO_CORS_API_PREFIX + CAT_MORE_INFO_ENDPOINT + catMoreInfoUrl;
  return fetch(url)
    .then<CatApiMoreInfo>(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
}
