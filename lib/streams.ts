const s = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9\uAC00-\uD7A3]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const streamMap: Record<string, string> = {
  [s("KBS1")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/11",
  [s("KBS2")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/12",
  [s("KBS NEWS 24")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/81",
  [s("KBS DRAMA")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N91",
  [s("KBS JOY")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N92",
  [s("KBS STORY")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N94",
  [s("KBS LIFE")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N93",
  [s("KBS KIDS")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N96",
  [s("KBS WORLD TV")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/14",

  [s("MBC")]: "http://www.hwado.net/webtv/catv/503_CFEA7803.php",

  [s("SBS")]: "http://www.hwado.net/webtv/catv/502_76142D8F.php",
  [s("SBS 뉴스")]: "https://www.youtube.com/embed/RevYuGM_Bx0?autoplay=1",
  [s("SBS Sports")]: "http://webtv.dothome.co.kr/ch/catv/35.php",
  [s("SBS GOLF")]: "",

  [s("JTBC 뉴스룸")]: "https://tistory1.daumcdn.net/tistory/2864460/skin/images/CATV_51_5D021B6D.m3u8",
  [s("JTBC GOLF")]: "https://www.youtube.com/embed/y0Fa_lEljWQ?autoplay=1",

  [s("채널 A")]: "https://tistory1.daumcdn.net/tistory/2864460/skin/images/CATV_52_12C896BD.m3u8",
  [s("TV조선")]: "https://tistory1.daumcdn.net/tistory/2864460/skin/images/CATV_53_8022E63C.m3u8",
  [s("MBN")]: "https://www.mbn.co.kr/player/mbnStreamAuth_new_live.mbn?vod_url=https://hls-live.mbn.co.kr/mbn-on-air/600k/playlist.m3u8",

  [s("tvN")]: "",
  [s("ENA")]: "",
  [s("YTN")]: "https://www.youtube.com/embed/FJfwehhzIhw?autoplay=1",
  [s("TV Chosun")]: "",
  [s("Channel A")]: "",

  [s("SPOTV")]: "",
  [s("SPOTV2")]: "",
  [s("KBS N Sports")]: "",
  [s("MBC Sports+")]: "",
  [s("SBS Sports")]: "",
  [s("tvN Sports")]: "",
  [s("JTBC Golf")]: "",
  [s("SBS Golf")]: "",

};

export function resolveStreamFor(slug: string) {
  return streamMap[slug] ?? null;
}
