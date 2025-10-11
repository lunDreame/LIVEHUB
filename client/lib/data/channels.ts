export type CategoryId =
  | "terrestrial"
  | "sports"
  | "movie"
  | "uhd4k"
  | "homeShopping"
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

  // 라디오 채널 (방송사별 그룹)
  // KBS 라디오
  { name: "KBS 1라디오 (수도권)", slug: s("KBS 1라디오 (수도권)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (부산)", slug: s("KBS 1라디오 (부산)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (창원)", slug: s("KBS 1라디오 (창원)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (진주)", slug: s("KBS 1라디오 (진주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (대구)", slug: s("KBS 1라디오 (대구)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (안동)", slug: s("KBS 1라디오 (안동)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (포항)", slug: s("KBS 1라디오 (포항)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (광주)", slug: s("KBS 1라디오 (광주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (목포)", slug: s("KBS 1라디오 (목포)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (순천)", slug: s("KBS 1라디오 (순천)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (전주)", slug: s("KBS 1라디오 (전주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (대전)", slug: s("KBS 1라디오 (대전)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (청주)", slug: s("KBS 1라디오 (청주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (춘천)", slug: s("KBS 1라디오 (춘천)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (강릉)", slug: s("KBS 1라디오 (강릉)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (원주)", slug: s("KBS 1라디오 (원주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1라디오 (제주)", slug: s("KBS 1라디오 (제주)"), category: "radio", group: "KBS 라디오" },

  { name: "KBS 2라디오 (수도권)", slug: s("KBS 2라디오 (수도권)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (부산)", slug: s("KBS 2라디오 (부산)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (창원)", slug: s("KBS 2라디오 (창원)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (대구)", slug: s("KBS 2라디오 (대구)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (광주)", slug: s("KBS 2라디오 (광주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (전주)", slug: s("KBS 2라디오 (전주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (대전)", slug: s("KBS 2라디오 (대전)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (청주)", slug: s("KBS 2라디오 (청주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (춘천)", slug: s("KBS 2라디오 (춘천)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 2라디오 (제주)", slug: s("KBS 2라디오 (제주)"), category: "radio", group: "KBS 라디오" },

  { name: "KBS 3라디오 (수도권)", slug: s("KBS 3라디오 (수도권)"), category: "radio", group: "KBS 라디오" },

  { name: "KBS 1FM (수도권)", slug: s("KBS 1FM (수도권)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (부산)", slug: s("KBS 1FM (부산)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (창원)", slug: s("KBS 1FM (창원)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (대구)", slug: s("KBS 1FM (대구)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (광주)", slug: s("KBS 1FM (광주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (목포)", slug: s("KBS 1FM (목포)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (전주)", slug: s("KBS 1FM (전주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (대전)", slug: s("KBS 1FM (대전)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (청주)", slug: s("KBS 1FM (청주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (춘천)", slug: s("KBS 1FM (춘천)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (강릉)", slug: s("KBS 1FM (강릉)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (원주)", slug: s("KBS 1FM (원주)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 1FM (제주)", slug: s("KBS 1FM (제주)"), category: "radio", group: "KBS 라디오" },

  { name: "KBS 2FM (수도권)", slug: s("KBS 2FM (수도권)"), category: "radio", group: "KBS 라디오" },
  { name: "KBS 한민족방송 (수도권)", slug: s("KBS 한민족방송 (수도권)"), category: "radio", group: "KBS 라디오" },

  // SBS 라디오
  { name: "SBS 파워FM (수도권)", slug: s("SBS 파워FM (수도권)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (부산경남)", slug: s("SBS 파워FM (부산경남)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (울산)", slug: s("SBS 파워FM (울산)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (대구경북)", slug: s("SBS 파워FM (대구경북)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (광주전남)", slug: s("SBS 파워FM (광주전남)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (전북)", slug: s("SBS 파워FM (전북)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (대전세종충남)", slug: s("SBS 파워FM (대전세종충남)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (충북)", slug: s("SBS 파워FM (충북)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (강원)", slug: s("SBS 파워FM (강원)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 파워FM (제주)", slug: s("SBS 파워FM (제주)"), category: "radio", group: "SBS 라디오" },

  { name: "SBS 러브FM (수도권)", slug: s("SBS 러브FM (수도권)"), category: "radio", group: "SBS 라디오" },
  { name: "SBS 러브FM (부산경남)", slug: s("SBS 러브FM (부산경남)"), category: "radio", group: "SBS 라디오" },

  // MBC 라디오
  { name: "MBC 표준FM (수도권)", slug: s("MBC 표준FM (수도권)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (부산)", slug: s("MBC 표준FM (부산)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (울산)", slug: s("MBC 표준FM (울산)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (경남)", slug: s("MBC 표준FM (경남)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (대구)", slug: s("MBC 표준FM (대구)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (안동)", slug: s("MBC 표준FM (안동)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (포항)", slug: s("MBC 표준FM (포항)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (광주)", slug: s("MBC 표준FM (광주)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (목포)", slug: s("MBC 표준FM (목포)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (여수)", slug: s("MBC 표준FM (여수)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (전주)", slug: s("MBC 표준FM (전주)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (대전)", slug: s("MBC 표준FM (대전)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (충북)", slug: s("MBC 표준FM (충북)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (춘천)", slug: s("MBC 표준FM (춘천)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (강원영동)", slug: s("MBC 표준FM (강원영동)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC 표준FM (제주)", slug: s("MBC 표준FM (제주)"), category: "radio", group: "MBC 라디오" },

  { name: "MBC FM4U (수도권)", slug: s("MBC FM4U (수도권)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (부산)", slug: s("MBC FM4U (부산)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (울산)", slug: s("MBC FM4U (울산)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (경남)", slug: s("MBC FM4U (경남)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (대구)", slug: s("MBC FM4U (대구)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (안동)", slug: s("MBC FM4U (안동)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (포항)", slug: s("MBC FM4U (포항)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (광주)", slug: s("MBC FM4U (광주)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (목포)", slug: s("MBC FM4U (목포)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (여수)", slug: s("MBC FM4U (여수)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (전주)", slug: s("MBC FM4U (전주)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (대전)", slug: s("MBC FM4U (대전)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (충북)", slug: s("MBC FM4U (충북)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (춘천)", slug: s("MBC FM4U (춘천)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (강원영동)", slug: s("MBC FM4U (강원영동)"), category: "radio", group: "MBC 라디오" },
  { name: "MBC FM4U (제주)", slug: s("MBC FM4U (제주)"), category: "radio", group: "MBC 라디오" },

  // TBN 교통방송
  { name: "TBN 교통방송 (수도권)", slug: s("TBN 교통방송 (수도권)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (부산)", slug: s("TBN 교통방송 (부산)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (울산)", slug: s("TBN 교통방송 (울산)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (경남)", slug: s("TBN 교통방송 (경남)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (대구)", slug: s("TBN 교통방송 (대구)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (경북)", slug: s("TBN 교통방송 (경북)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (광주)", slug: s("TBN 교통방송 (광주)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (전북)", slug: s("TBN 교통방송 (전북)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (대전)", slug: s("TBN 교통방송 (대전)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (충북)", slug: s("TBN 교통방송 (충북)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (강원)", slug: s("TBN 교통방송 (강원)"), category: "radio", group: "TBN 교통방송" },
  { name: "TBN 교통방송 (제주)", slug: s("TBN 교통방송 (제주)"), category: "radio", group: "TBN 교통방송" },

  // CBS 기독교방송
  { name: "CBS 표준FM (수도권)", slug: s("CBS 표준FM (수도권)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (부산)", slug: s("CBS 표준FM (부산)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (울산)", slug: s("CBS 표준FM (울산)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (경남)", slug: s("CBS 표준FM (경남)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (대구)", slug: s("CBS 표준FM (대구)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (포항)", slug: s("CBS 표준FM (포항)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (광주)", slug: s("CBS 표준FM (광주)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (전남)", slug: s("CBS 표준FM (전남)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (전북)", slug: s("CBS 표준FM (전북)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (대전)", slug: s("CBS 표준FM (대전)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (충북)", slug: s("CBS 표준FM (충북)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (춘천)", slug: s("CBS 표준FM (춘천)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 표준FM (제주)", slug: s("CBS 표준FM (제주)"), category: "radio", group: "CBS 기독교방송" },

  { name: "CBS 음악FM (수도권)", slug: s("CBS 음악FM (수도권)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 음악FM (부산)", slug: s("CBS 음악FM (부산)"), category: "radio", group: "CBS 기독교방송" },
  { name: "CBS 음악FM (대구)", slug: s("CBS 음악FM (대구)"), category: "radio", group: "CBS 기독교방송" },

  // FEBC 극동방송
  { name: "FEBC 극동방송 (수도권)", slug: s("FEBC 극동방송 (수도권)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (부산)", slug: s("FEBC 극동방송 (부산)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (울산)", slug: s("FEBC 극동방송 (울산)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (창원)", slug: s("FEBC 극동방송 (창원)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (대구)", slug: s("FEBC 극동방송 (대구)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (포항)", slug: s("FEBC 극동방송 (포항)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (광주)", slug: s("FEBC 극동방송 (광주)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (목포)", slug: s("FEBC 극동방송 (목포)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (전남동부)", slug: s("FEBC 극동방송 (전남동부)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (전북)", slug: s("FEBC 극동방송 (전북)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (대전)", slug: s("FEBC 극동방송 (대전)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (영동)", slug: s("FEBC 극동방송 (영동)"), category: "radio", group: "FEBC 극동방송" },
  { name: "FEBC 극동방송 (제주)", slug: s("FEBC 극동방송 (제주)"), category: "radio", group: "FEBC 극동방송" },

  // BBS 불교방송
  { name: "BBS 불교방송 (수도권)", slug: s("BBS 불교방송 (수도권)"), category: "radio", group: "BBS 불교방송" },
  { name: "BBS 불교방송 (광주)", slug: s("BBS 불교방송 (광주)"), category: "radio", group: "BBS 불교방송" },
  { name: "BBS 불교방송 (대구)", slug: s("BBS 불교방송 (대구)"), category: "radio", group: "BBS 불교방송" },

  // CPBC 가톨릭평화방송
  { name: "CPBC 가톨릭평화방송 (수도권)", slug: s("CPBC 가톨릭평화방송 (수도권)"), category: "radio", group: "CPBC 가톨릭평화방송" },
  { name: "CPBC 가톨릭평화방송 (부산)", slug: s("CPBC 가톨릭평화방송 (부산)"), category: "radio", group: "CPBC 가톨릭평화방송" },
  { name: "CPBC 가톨릭평화방송 (대구)", slug: s("CPBC 가톨릭평화방송 (대구)"), category: "radio", group: "CPBC 가톨릭평화방송" },
  { name: "CPBC 가톨릭평화방송 (광주)", slug: s("CPBC 가톨릭평화방송 (광주)"), category: "radio", group: "CPBC 가톨릭평화방송" },

  // WBS 원음방송
  { name: "WBS 원음방송 (수도권)", slug: s("WBS 원음방송 (수도권)"), category: "radio", group: "WBS 원음방송" },
  { name: "WBS 원음방송 (부산)", slug: s("WBS 원음방송 (부산)"), category: "radio", group: "WBS 원음방송" },
  { name: "WBS 원음방송 (대구)", slug: s("WBS 원음방송 (대구)"), category: "radio", group: "WBS 원음방송" },
  { name: "WBS 원음방송 (광주)", slug: s("WBS 원음방송 (광주)"), category: "radio", group: "WBS 원음방송" },
  { name: "WBS 원음방송 (전북)", slug: s("WBS 원음방송 (전북)"), category: "radio", group: "WBS 원음방송" },

  // 기타 방송
  { name: "EBS FM", slug: s("EBS FM"), category: "radio", group: "기타 방송" },
  { name: "YTN 라디오", slug: s("YTN 라디오"), category: "radio", group: "기타 방송" },
  { name: "iFM 경인방송", slug: s("iFM 경인방송"), category: "radio", group: "기타 방송" },
  { name: "OBS 라디오", slug: s("OBS 라디오"), category: "radio", group: "기타 방송" },
  { name: "TBS FM", slug: s("TBS FM"), category: "radio", group: "기타 방송" },
  { name: "TBS eFM", slug: s("TBS eFM"), category: "radio", group: "기타 방송" },
  { name: "국방FM", slug: s("국방FM"), category: "radio", group: "기타 방송" },
  { name: "국악방송", slug: s("국악방송"), category: "radio", group: "기타 방송" },
];
