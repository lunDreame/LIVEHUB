export type CategoryId =
  | "terrestrial"
  | "sports"
  | "movie"
  | "uhd4k"
  | "homeShopping"
  | "special"
  | "radio";

export interface Channel {
  name: string;
  slug: string;
  category: CategoryId;
  tags?: string[];
  streamUrl?: string; // optional embed url when available
  group?: string; // for radio subgrouping (e.g., KBS, MBC)
}

export const categories: { id: CategoryId; label: string }[] = [
  { id: "terrestrial", label: "지상파 / 종편" },
  { id: "sports", label: "스포츠 채널" },
  { id: "movie", label: "영화 채널" },
  { id: "uhd4k", label: "UHD 4K" },
  { id: "homeShopping", label: "홈쇼핑" },
  { id: "special", label: "특수 방송" },
  { id: "radio", label: "라디오" },
];

const s = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9\uAC00-\uD7A3]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const channels: Channel[] = [
  // 지상파 / 종편
  { name: "SBS", slug: s("SBS"), category: "terrestrial" },
  { name: "KBS2", slug: s("KBS2"), category: "terrestrial" },
  { name: "KBS1", slug: s("KBS1"), category: "terrestrial" },
  { name: "MBC", slug: s("MBC"), category: "terrestrial" },
  { name: "EBS2", slug: s("EBS2"), category: "terrestrial" },
  { name: "YTN", slug: s("YTN"), category: "terrestrial" },
  { name: "OBS", slug: s("OBS"), category: "terrestrial" },
  { name: "JTBC4", slug: s("JTBC4"), category: "terrestrial" },
  { name: "LIFE", slug: s("LIFE"), category: "terrestrial" },
  { name: "LIFE2", slug: s("LIFE2"), category: "terrestrial" },

  // 영화 채널
  { name: "SCREEN", slug: s("SCREEN"), category: "movie" },
  { name: "CINE f", slug: s("CINE f"), category: "movie" },
  { name: "시네마천국", slug: s("시네마천국"), category: "movie" },
  { name: "OCN", slug: s("OCN"), category: "movie" },
  { name: "OCN무비", slug: s("OCN무비"), category: "movie" },
  { name: "OCN무비2", slug: s("OCN무비2"), category: "movie" },

  // UHD 4K 채널
  { name: "UMAX 4K", slug: s("UMAX 4K"), category: "uhd4k" },
  { name: "UHD드림 4k", slug: s("UHD드림 4k"), category: "uhd4k" },
  { name: "UXN 4k", slug: s("UXN 4k"), category: "uhd4k" },
  { name: "ASIA 4k", slug: s("ASIA 4k"), category: "uhd4k" },
  { name: "INULTRA 4k", slug: s("INULTRA 4k"), category: "uhd4k" },
  { name: "SBS FIL 4k", slug: s("SBS FIL 4k"), category: "uhd4k" },

  // 스포츠 채널
  { name: "SBS스포츠", slug: s("SBS스포츠"), category: "sports" },
  { name: "MBC스포츠+", slug: s("MBC스포츠+"), category: "sports" },
  { name: "KBS N스포츠", slug: s("KBS N스포츠"), category: "sports" },
  { name: "SPOTV", slug: s("SPOTV"), category: "sports" },
  { name: "SPOTV골프헬스", slug: s("SPOTV골프헬스"), category: "sports" },
  { name: "SPOTV2", slug: s("SPOTV2"), category: "sports" },
  { name: "SBS골프", slug: s("SBS골프"), category: "sports" },
  { name: "JTBC골프", slug: s("JTBC골프"), category: "sports" },
  { name: "SPOTV프라임", slug: s("SPOTV프라임"), category: "sports" },
  { name: "SPOTIME", slug: s("SPOTIME"), category: "sports" },
  { name: "SPOTV프라임+", slug: s("SPOTV프라임+"), category: "sports" },

  // 특수 방송
  { name: "JTBC수어방송", slug: s("JTBC수어방송"), category: "special" },
  { name: "수어방송 1", slug: s("수어방송 1"), category: "special" },
  { name: "수어방송 2", slug: s("수어방송 2"), category: "special" },
  { name: "수어방송 3", slug: s("수어방송 3"), category: "special" },
  { name: "수어방송 4", slug: s("수어방송 4"), category: "special" },

  // 홈쇼핑
  { name: "W쇼핑", slug: s("W쇼핑"), category: "homeShopping" },
  { name: "롯데홈쇼핑", slug: s("롯데홈쇼핑"), category: "homeShopping" },
  { name: "KT알파쇼핑", slug: s("KT알파쇼핑"), category: "homeShopping" },
  { name: "현대홈쇼핑", slug: s("현대홈쇼핑"), category: "homeShopping" },
  { name: "쇼핑엔티", slug: s("쇼핑엔티"), category: "homeShopping" },
  { name: "SK스토아", slug: s("SK스토아"), category: "homeShopping" },
  { name: "CJ온스타일", slug: s("CJ온스타일"), category: "homeShopping" },
  { name: "NS홈쇼핑", slug: s("NS홈쇼핑"), category: "homeShopping" },
  { name: "홈앤쇼핑", slug: s("홈앤쇼핑"), category: "homeShopping" },
  { name: "롯데원TV", slug: s("롯데원TV"), category: "homeShopping" },
  { name: "GSMYSHOP", slug: s("GSMYSHOP"), category: "homeShopping" },
  { name: "NS홈쇼핑+", slug: s("NS홈쇼핑+"), category: "homeShopping" },
  { name: "GS SHOP", slug: s("GS SHOP"), category: "homeShopping" },
  { name: "신세계쇼핑", slug: s("신세계쇼핑"), category: "homeShopping" },
  { name: "공영쇼핑", slug: s("공영쇼핑"), category: "homeShopping" },
  { name: "CJ온스타일+", slug: s("CJ온스타일+"), category: "homeShopping" },
  { name: "현대홈쇼핑+", slug: s("현대홈쇼핑+"), category: "homeShopping" },

  // 라디오 채널 (그룹)
  { name: "KBS 1FM", slug: s("KBS 1FM"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2FM", slug: s("KBS 2FM"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 3라디오", slug: s("KBS 3라디오"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오", slug: s("KBS 1라디오"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오", slug: s("KBS 2라디오"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 한민족방송", slug: s("KBS 한민족방송"), category: "radio", group: "KBS 라디오" },
  { name: "KBS WORLD Radio (한국어 Ch 1)", slug: s("KBS WORLD Radio (한국어 Ch 1)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS WORLD Radio (한국어 Ch 2)", slug: s("KBS WORLD Radio (한국어 Ch 2)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS WORLD Radio (Music)", slug: s("KBS WORLD Radio (Music)"), category: "radio", group: "KBS 라디오" },

  { name: "MBC 표준FM", slug: s("MBC 표준FM"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U", slug: s("MBC FM4U"), category: "radio", group: "MBC 라디오" },

  { name: "SBS 파워FM", slug: s("SBS 파워FM"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 러브FM", slug: s("SBS 러브FM"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 라디오M", slug: s("SBS 라디오M"), category: "radio", group: "SBS 라디오" },
];
