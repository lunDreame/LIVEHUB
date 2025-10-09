export type CategoryId =
  | "terrestrial"
  | "sports"
  | "homeShopping"
  | "education"
  | "entertainment"
  | "economy"
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
  { id: "homeShopping", label: "홈쇼핑" },
  { id: "education", label: "교육 / 어린이 (EBS)" },
  { id: "entertainment", label: "음악 / 엔터테인먼트" },
  { id: "economy", label: "국내 경제/뉴스 전문" },
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
  { name: "KBS1", slug: s("KBS1"), category: "terrestrial" },
  { name: "KBS2", slug: s("KBS2"), category: "terrestrial" },
  { name: "KBS NEWS 24", slug: s("KBS NEWS 24"), category: "terrestrial" },
  { name: "KBS DRAMA", slug: s("KBS DRAMA"), category: "terrestrial" },
  { name: "KBS JOY", slug: s("KBS JOY"), category: "terrestrial" },
  { name: "KBS STORY", slug: s("KBS STORY"), category: "terrestrial" },
  { name: "KBS LIFE", slug: s("KBS LIFE"), category: "terrestrial" },
  { name: "KBS KIDS", slug: s("KBS KIDS"), category: "terrestrial" },
  { name: "KBS WORLD TV", slug: s("KBS WORLD TV"), category: "terrestrial" },
  { name: "KBS LIVE Dokdo", slug: s("KBS LIVE Dokdo"), category: "terrestrial" },

  { name: "MBC", slug: s("MBC"), category: "terrestrial" },
  { name: "MBC뉴스", slug: s("MBC뉴스"), category: "terrestrial" },
  { name: "대구MBC", slug: s("대구MBC"), category: "terrestrial" },
  { name: "대전MBC", slug: s("대전MBC"), category: "terrestrial" },
  { name: "CJB", slug: s("CJB"), category: "terrestrial" },

  { name: "SBS", slug: s("SBS"), category: "terrestrial" },
  { name: "SBS뉴스", slug: s("SBS뉴스"), category: "terrestrial" },

  { name: "JTBC", slug: s("JTBC"), category: "terrestrial" },
  { name: "채널A", slug: s("채널A"), category: "terrestrial" },
  { name: "TV조선", slug: s("TV조선"), category: "terrestrial" },
  { name: "MBN", slug: s("MBN"), category: "terrestrial" },

  { name: "YTN", slug: s("YTN"), category: "terrestrial" },
  { name: "연합뉴스TV", slug: s("연합뉴스TV"), category: "terrestrial" },
  { name: "TBS", slug: s("TBS"), category: "terrestrial" },
  { name: "OBS", slug: s("OBS"), category: "terrestrial" },

  // 스포츠 채널
  { name: "SBS Sports", slug: s("SBS Sports"), category: "sports" },
  { name: "SBS GOLF", slug: s("SBS GOLF"), category: "sports" },
  { name: "JTBC GOLF", slug: s("JTBC GOLF"), category: "sports" },
  { name: "JTBC 골프&스포츠", slug: s("JTBC 골프&스포츠"), category: "sports" },

  // 홈쇼핑
  { name: "GS샵", slug: s("GS샵"), category: "homeShopping" },
  { name: "GS마이샵", slug: s("GS마이샵"), category: "homeShopping" },
  { name: "현대홈쇼핑", slug: s("현대홈쇼핑"), category: "homeShopping" },
  { name: "현대홈쇼핑+샵", slug: s("현대홈쇼핑+샵"), category: "homeShopping" },
  { name: "NS홈쇼핑", slug: s("NS홈쇼핑"), category: "homeShopping" },
  { name: "CJ온스타일", slug: s("CJ온스타일"), category: "homeShopping" },
  { name: "CJ온스타일+", slug: s("CJ온스타일+"), category: "homeShopping" },
  { name: "롯데홈쇼핑", slug: s("롯데홈쇼핑"), category: "homeShopping" },
  { name: "롯데OneTV", slug: s("롯데OneTV"), category: "homeShopping" },
  { name: "NS Shop+", slug: s("NS Shop+"), category: "homeShopping" },
  { name: "W쇼핑", slug: s("W쇼핑"), category: "homeShopping" },
  { name: "신세계쇼핑", slug: s("신세계쇼핑"), category: "homeShopping" },
  { name: "쇼핑엔티", slug: s("쇼핑엔티"), category: "homeShopping" },
  { name: "공영쇼핑", slug: s("공영쇼핑"), category: "homeShopping" },
  { name: "SK스토아", slug: s("SK스토아"), category: "homeShopping" },
  { name: "KT알파쇼핑", slug: s("KT알파쇼핑"), category: "homeShopping" },
  { name: "홈앤쇼핑", slug: s("홈앤쇼핑"), category: "homeShopping" },

  // 교육 / 어린이 (EBS 등)
  { name: "EBS1", slug: s("EBS1"), category: "education" },
  { name: "EBS2", slug: s("EBS2"), category: "education" },
  { name: "EBS KIDS", slug: s("EBS KIDS"), category: "education" },
  { name: "EBS 플러스1", slug: s("EBS 플러스1"), category: "education" },
  { name: "EBS 플러스2", slug: s("EBS 플러스2"), category: "education" },
  { name: "EBS English", slug: s("EBS English"), category: "education" },
  { name: "YTN 사이언스", slug: s("YTN 사이언스"), category: "education" },

  // 음악 / 엔터테인먼트
  { name: "올 더 케이팝", slug: s("올 더 케이팝"), category: "entertainment" },
  { name: "THE K-POP", slug: s("THE K-POP"), category: "entertainment" },
  { name: "THE 트롯 보라고", slug: s("THE 트롯 보라고"), category: "entertainment" },
  { name: "런닝맨", slug: s("런닝맨"), category: "entertainment" },
  { name: "대탈출", slug: s("대탈출"), category: "entertainment" },
  { name: "최강야구", slug: s("최강야구"), category: "entertainment" },

  // 국내 경제/뉴스 전문
  { name: "한국경제TV", slug: s("한국경제TV"), category: "economy" },
  { name: "이데일리TV", slug: s("이데일리TV"), category: "economy" },
  { name: "매일경제TV", slug: s("매일경제TV"), category: "economy" },
  { name: "머니투데이방송", slug: s("머니투데이방송"), category: "economy" },
  { name: "서울경제TV", slug: s("서울경제TV"), category: "economy" },
  { name: "연합뉴스경제TV", slug: s("연합뉴스경제TV"), category: "economy" },
  { name: "KTV", slug: s("KTV"), category: "economy" },
  { name: "국회방송", slug: s("국회방송"), category: "economy" },

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
