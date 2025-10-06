const s = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const streamMap: Record<string, string> = {
  // KBS
  [s("KBS1")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/11",
  [s("KBS2")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/12",
  [s("KBS NEWS 24")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/81",
  [s("KBS DRAMA")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N91",
  [s("KBS JOY")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N92",
  [s("KBS STORY")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N94",
  [s("KBS LIFE")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N93",
  [s("KBS KIDS")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/N96",
  [s("KBS WORLD TV")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/14",
  [s("KBS LIVE Dokdo")]: "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/cctv01",

  // MBC local m3u8s - 마스터 플레이리스트
  [s("대구MBC")]: "https://5ee1ec6f32118.streamlock.net/live/livetv/playlist.m3u8",
  [s("대전MBC")]: "https://ns1.tjmbc.co.kr/live/myStream.sdp/playlist.m3u8",
  [s("CJB")]: "https://tistory1.daumcdn.net/tistory/2864460/skin/images/Public_8_5706648C.m3u8",
};

export function resolveStreamFor(slug: string) {
  return streamMap[slug] ?? null;
}
