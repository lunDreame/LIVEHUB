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

  { name: "MBC", slug: s("MBC"), category: "terrestrial" },

  { name: "SBS", slug: s("SBS"), category: "terrestrial" },
  { name: "SBS 뉴스", slug: s("SBS 뉴스"), category: "terrestrial" },
  { name: "SBS Sports", slug: s("SBS Sports"), category: "terrestrial" },
  { name: "SBS GOLF", slug: s("SBS GOLF"), category: "terrestrial" },

  { name: "JTBC 뉴스룸", slug: s("JTBC 뉴스룸"), category: "terrestrial" },
  { name: "JTBC GOLF", slug: s("JTBC GOLF"), category: "terrestrial" },

  { name: "채널A", slug: s("채널A"), category: "terrestrial" },
  { name: "TV조선", slug: s("TV조선"), category: "terrestrial" },
  { name: "MBN", slug: s("MBN"), category: "terrestrial" },

  // 종합편성채널
  { name: "tvN", slug: s("tvN"), category: "terrestrial" },
  { name: "ENA", slug: s("ENA"), category: "terrestrial" },
  { name: "YTN", slug: s("YTN"), category: "terrestrial" },
  { name: "TV Chosun", slug: s("TV Chosun"), category: "terrestrial" },
  { name: "Channel A", slug: s("Channel A"), category: "terrestrial" },

  // 스포츠 채널
  { name: "SPOTV", slug: s("SPOTV"), category: "sports" },
  { name: "SPOTV2", slug: s("SPOTV2"), category: "sports" },
  { name: "KBS N Sports", slug: s("KBS N Sports"), category: "sports" },
  { name: "MBC Sports+", slug: s("MBC Sports+"), category: "sports" },
  { name: "SBS Sports", slug: s("SBS Sports"), category: "sports" },
  { name: "tvN Sports", slug: s("tvN Sports"), category: "sports" },
  { name: "JTBC Golf", slug: s("JTBC Golf"), category: "sports" },
  { name: "SBS Golf", slug: s("SBS Golf"), category: "sports" },

  // 홈쇼핑
  { name: "GS샵", slug: s("GS샵"), category: "homeShopping" },
  { name: "GS마이샵", slug: s("GS마이샵"), category: "homeShopping" },
  { name: "현대홈쇼핑", slug: s("현대홈쇼핑"), category: "homeShopping" },
  { name: "현대홈쇼핑+샵", slug: s("현대홈쇼핑+샵"), category: "homeShopping" },
  { name: "NS홈쇼핑", slug: s("NS홈쇼핑"), category: "homeShopping" },
  { name: "CJ온스타일", slug: s("CJ온스타일"), category: "homeShopping" },
  { name: "CJ온스타일+", slug: s("CJ온스타일+"), category: "homeShopping" },
  { name: "롯데홈쇼핑", slug: s("롯데홈쇼핑"), category: "homeShopping" },

  // 교육 / 어린이 (EBS 등)
  { name: "EBS1", slug: s("EBS1"), category: "education" },
  { name: "EBS2", slug: s("EBS2"), category: "education" },
  { name: "EBS KIDS", slug: s("EBS KIDS"), category: "education" },
  { name: "EBS 플러스1", slug: s("EBS 플러스1"), category: "education" },
  { name: "EBS 플러스2", slug: s("EBS 플러스2"), category: "education" },
  { name: "EBS English", slug: s("EBS English"), category: "education" },
  { name: "YTN 사이언스", slug: s("YTN 사이언스"), category: "education" },
  { name: "KOCW", slug: s("KOCW"), category: "education" },
  { name: "EBS MATH", slug: s("EBS MATH"), category: "education" },

  // 음악 / 엔터테인먼트
  { name: "OCN", slug: s("OCN"), category: "entertainment" },
  { name: "OCN Movies", slug: s("OCN Movies"), category: "entertainment" },
  { name: "MBC ON", slug: s("MBC ON"), category: "entertainment" },
  { name: "tvN Drama", slug: s("tvN Drama"), category: "entertainment" },
  { name: "tvN Show", slug: s("tvN Show"), category: "entertainment" },
  { name: "Mnet", slug: s("Mnet"), category: "entertainment" },
  { name: "SBS Plus", slug: s("SBS Plus"), category: "entertainment" },

  // 국내 경제/뉴스 전문
  { name: "한국경제TV", slug: s("한국경제TV"), category: "economy" },
  { name: "이데일리TV", slug: s("이데일리TV"), category: "economy" },
  { name: "매일경제TV", slug: s("매일경제TV"), category: "economy" },
  { name: "머니투데이방송", slug: s("머니투데이방송"), category: "economy" },

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
