export type CategoryId =
  | "terrestrial"
  | "sports"
  | "homeShopping"
  | "international"
  | "education"
  | "public"
  | "entertainment"
  | "economy";

export interface Channel {
  name: string;
  slug: string;
  category: CategoryId;
  tags?: string[];
  streamUrl?: string; // optional embed url when available
}

export const categories: { id: CategoryId; label: string }[] = [
  { id: "terrestrial", label: "지상파 / 종편" },
  { id: "sports", label: "스포츠 채널" },
  { id: "homeShopping", label: "홈쇼핑" },
  { id: "international", label: "해외 뉴스 / 교양" },
  { id: "education", label: "교육 / 어린이 (EBS)" },
  { id: "public", label: "종교 / 공공방송" },
  { id: "entertainment", label: "음악 / 엔터테인먼트" },
  { id: "economy", label: "국내 경제/뉴스 전문" },
];

const s = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const channels: Channel[] = [
  // 지상파 / 종편 (KBS)
  "KBS1",
  "KBS2",
  "KBS NEWS 24",
  "KBS DRAMA",
  "KBS JOY",
  "KBS STORY",
  "KBS LIFE",
  "KBS KIDS",
  "KBS WORLD TV",
  "KBS LIVE Dokdo",
  // MBC 계열
  "MBC",
  "대구MBC",
  "대전MBC",
  "CJB",
  // SBS 계열
  "SBS",
  "SBS 뉴스",
  "SBS Sports",
  "SBS GOLF",
  "SBS GOLF2",
  // JTBC 계열
  "JTBC",
  "JTBC 뉴스",
  "JTBC GOLF",
  "JTBC 골프&스포츠",
  // 종편
  "채널A",
  "TV조선",
  "MBN",
  // 뉴스전문
  "연합뉴스TV",
  "연합뉴스경제TV",
  "서울경제TV",
].map((name): Channel => ({ name, slug: s(name), category: "terrestrial" }))
  .concat(
    // 스포츠 채널
    [
      "프로야구 1경기",
      "프로야구 2경기",
      "프로야구 3경기",
      "프로야구 4경기",
      "프로야구 5경기",
      "네이버 농구",
      "네이버 배구",
      "네이버 골프",
      "네이버 야구",
      "네이버 축구",
      "다음 농구",
      "다음 배구",
      "다음 골프",
      "다음 야구",
      "다음 축구",
      "Billiard TV",
      "Outside TV",
      "Fun Roads TV",
      "Red Bull TV",
      "The Pet Collective",
    ].map((name): Channel => ({ name, slug: s(name), category: "sports" }))
  )
  .concat(
    // 홈쇼핑
    [
      "GS샵",
      "GS마이샵",
      "현대홈쇼핑",
      "현대홈쇼핑+샵",
      "NS홈쇼핑",
      "CJ온스타일",
      "CJ온스타일+롯데홈쇼핑",
      "롯데OneTV",
      "W쇼핑",
      "신세계쇼핑",
      "쇼핑엔티",
      "공영쇼핑",
      "SK스토아",
      "KT알파 쇼핑",
      "홈앤쇼핑",
    ].map((name): Channel => ({ name, slug: s(name), category: "homeShopping" }))
  )
  .concat(
    // 해외 뉴스 / 교양
    [
      "France 24",
      "Bloomberg",
      "CBSN",
      "NTV News 24",
      "CGN Japan",
      "Shibuya Crossing",
      "TBS NEWS DIG",
      "NHK WORLD",
      "ANN",
      "NBN",
      "HTB",
      "Shop Channel",
      "QVC",
      "Sky News",
      "Kronheit TV",
      "Classic Arts Showcase",
      "Vevo Rock",
      "Kpop TV Play",
    ].map((name): Channel => ({ name, slug: s(name), category: "international" }))
  )
  .concat(
    // 교육 / 어린이 (EBS)
    [
      "EBS1",
      "EBS2",
      "EBS KIDS",
      "EBS 플러스1",
      "EBS 플러스2",
      "EBS English",
      "YTN 사이언스",
      "KOCW",
      "EBS MATH",
    ].map((name): Channel => ({ name, slug: s(name), category: "education" }))
  )
  .concat(
    // 종교 / 공공방송
    [
      "CBS",
      "CTS기독교TV",
      "CGN",
      "C채널",
      "GOODTV",
      "가톨릭평화방송",
      "BBS불교방송",
      "BTN 불교TV",
      "원음방송",
      "OBS",
      "Btv 인천",
      "서경방송",
      "KTV",
      "국회방송",
      "KFN",
      "Arirang TV",
      "한국농업방송",
    ].map((name): Channel => ({ name, slug: s(name), category: "public" }))
  )
  .concat(
    // 음악 / 엔터테인먼트
    [
      "K-ASM",
      "TED",
      "FashionTV",
      "Wonder",
      "Cheddar",
      "CNA",
      "G.I. JOE",
      "Vevo Rock",
      "Tv Groovy",
      "9XM",
      "NBC News TV",
      "ABC News",
    ].map((name): Channel => ({ name, slug: s(name), category: "entertainment" }))
  )
  .concat(
    // 국내 경제/뉴스 전문
    [
      "한국경제TV",
      "이데일리TV",
      "매일경제TV",
      "머니투데이방송",
      "토마토TV",
    ].map((name): Channel => ({ name, slug: s(name), category: "economy" }))
  );
