export interface RetornoMusicApi {
  externalId: string,
  previewUrl: any,
  name: string,
  artistNames: string[],
  albumName: string,
  imageUrl: string,
  isrc: string,
  duration: number,
  url: string
}

export interface RetornoMusicApiSearch {
  source: string,
  status: string,
  data: {
    externalId: string,
    previewUrl: null,
    name: string,
    artistNames: string[],
    albumName: string,
    imageUrl:string,
    isrc: string,
    duration: number,
    url: string,
  },
  type: string,
}
