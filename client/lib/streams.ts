const s = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9\uAC00-\uD7A3]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const streamMap: Record<string, string> = {
  // 지상파 / 종편
  [s("SBS")]: "udp://@239.192.67.98:49220",
  [s("KBS2")]: "udp://@239.192.67.99:49220",
  [s("KBS1")]: "udp://@239.192.67.100:49220",
  [s("MBC")]: "udp://@239.192.67.101:49220",
  [s("EBS2")]: "udp://@239.192.42.2:49220",
  [s("YTN")]: "udp://@239.192.47.7:49220",
  [s("JTBC4")]: "udp://@239.192.62.64:49220",
  [s("LIFE2")]: "udp://@239.192.62.80:49220",
  [s("LIFE")]: "udp://@239.192.62.81:49220",
  [s("OBS")]: "udp://@239.192.62.82:49220",

  // 영화 채널
  [s("SCREEN")]: "udp://@239.192.62.51:49220",
  [s("CINE f")]: "udp://@239.192.62.52:49220",
  [s("시네마천국")]: "udp://@239.192.62.58:49220",
  [s("OCN")]: "udp://@239.192.67.226:49220",
  [s("OCN무비")]: "udp://@239.192.67.227:49220",
  [s("OCN무비2")]: "udp://@239.192.67.228:49220",

  // UHD 4K
  [s("UMAX 4K")]: "udp://@239.192.81.34:49220",
  [s("UHD드림 4k")]: "udp://@239.192.81.37:49220",
  [s("UXN 4k")]: "udp://@239.192.81.38:49220",
  [s("ASIA 4k")]: "udp://@239.192.81.36:49220",
  [s("INULTRA 4k")]: "udp://@239.192.81.39:49220",
  [s("SBS FIL 4k")]: "udp://@239.192.81.65:49220",

  // 스포츠
  [s("SBS스포츠")]: "udp://@239.192.67.130:49220",
  [s("MBC스포츠+")]: "udp://@239.192.67.131:49220",
  [s("KBS N스포츠")]: "udp://@239.192.67.132:49220",
  [s("SPOTV")]: "udp://@239.192.67.133:49220",
  [s("SPOTV골프헬스")]: "udp://@239.192.67.163:49220",
  [s("SPOTV2")]: "udp://@239.192.67.162:49220",
  [s("SBS골프")]: "udp://@239.192.67.164:49220",
  [s("JTBC골프")]: "udp://@239.192.67.165:49220",
  [s("SPOTV프라임")]: "udp://@239.192.62.84:49220",
  [s("SPOTIME")]: "udp://@239.192.62.85:49220",
  [s("SPOTV프라임+")]: "udp://@239.192.62.83:49220",

  // 홈쇼핑
  [s("W쇼핑")]: "udp://@239.192.81.101:49220",
  [s("롯데홈쇼핑")]: "udp://@239.192.81.103:49220",
  [s("KT알파쇼핑")]: "udp://@239.192.81.106:49220",
  [s("현대홈쇼핑")]: "udp://@239.192.81.102:49220",
  [s("쇼핑엔티")]: "udp://@239.192.81.105:49220",
  [s("SK스토아")]: "udp://@239.192.81.104:49220",
  [s("CJ온스타일")]: "udp://@239.192.81.135:49220",
  [s("NS홈쇼핑")]: "udp://@239.192.81.136:49220",
  [s("홈앤쇼핑")]: "udp://@239.192.81.137:49220",
  [s("롯데원TV")]: "udp://@239.192.81.138:49220",
  [s("GSMYSHOP")]: "udp://@239.192.81.142:49220",
  [s("NS홈쇼핑+")]: "udp://@239.192.81.143:49220",
  [s("GS SHOP")]: "udp://@239.192.81.168:49220",
  [s("신세계쇼핑")]: "udp://@239.192.81.170:49220",
  [s("공영쇼핑")]: "udp://@239.192.81.169:49220",
  [s("CJ온스타일+")]: "udp://@239.192.81.172:49220",
  [s("현대홈쇼핑+")]: "udp://@239.192.81.171:49220",

  // Copyright from BSofDeath
  // https://radio.bsod.kr/

  // 라디오 - KBS 1라디오
  [s("KBS 1라디오 (수도권)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio",
  [s("KBS 1라디오 (부산)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=busan",
  [s("KBS 1라디오 (창원)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=changwon",
  [s("KBS 1라디오 (진주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=jinju",
  [s("KBS 1라디오 (대구)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=daegu",
  [s("KBS 1라디오 (안동)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=andong",
  [s("KBS 1라디오 (포항)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=pohang",
  [s("KBS 1라디오 (광주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=gwangju",
  [s("KBS 1라디오 (목포)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=mokpo",
  [s("KBS 1라디오 (순천)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=suncheon",
  [s("KBS 1라디오 (전주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=jeonju",
  [s("KBS 1라디오 (대전)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=daejeon",
  [s("KBS 1라디오 (청주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=cheongju",
  [s("KBS 1라디오 (춘천)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=chuncheon",
  [s("KBS 1라디오 (강릉)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=gangneung",
  [s("KBS 1라디오 (원주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=wonju",
  [s("KBS 1라디오 (제주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1radio&city=jeju",

  // 라디오 - KBS 2라디오
  [s("KBS 2라디오 (수도권)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio",
  [s("KBS 2라디오 (부산)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=busan",
  [s("KBS 2라디오 (창원)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=changwon",
  [s("KBS 2라디오 (대구)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=daegu",
  [s("KBS 2라디오 (광주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=gwangju",
  [s("KBS 2라디오 (전주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=jeonju",
  [s("KBS 2라디오 (대전)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=daejeon",
  [s("KBS 2라디오 (청주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=cheongju",
  [s("KBS 2라디오 (춘천)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=chuncheon",
  [s("KBS 2라디오 (제주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2radio&city=jeju",

  // 라디오 - KBS 3라디오
  [s("KBS 3라디오 (수도권)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=3radio",

  // 라디오 - KBS 1FM
  [s("KBS 1FM (수도권)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm",
  [s("KBS 1FM (부산)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=busan",
  [s("KBS 1FM (창원)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=changwon",
  [s("KBS 1FM (대구)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=daegu",
  [s("KBS 1FM (광주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=gwangju",
  [s("KBS 1FM (목포)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=mokpo",
  [s("KBS 1FM (전주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=jeonju",
  [s("KBS 1FM (대전)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=daejeon",
  [s("KBS 1FM (청주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=cheongju",
  [s("KBS 1FM (춘천)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=chuncheon",
  [s("KBS 1FM (강릉)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=gangneung",
  [s("KBS 1FM (원주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=wonju",
  [s("KBS 1FM (제주)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=1fm&city=jeju",

  // 라디오 - KBS 2FM, 한민족방송
  [s("KBS 2FM (수도권)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=2fm",
  [s("KBS 한민족방송 (수도권)")]: "https://radio.bsod.kr/stream/?stn=kbs&ch=hanminjok",

  // 라디오 - SBS 파워FM
  [s("SBS 파워FM (수도권)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm",
  [s("SBS 파워FM (부산경남)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=busan",
  [s("SBS 파워FM (울산)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=ulsan",
  [s("SBS 파워FM (대구경북)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=daegu",
  [s("SBS 파워FM (광주전남)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=gwangju",
  [s("SBS 파워FM (전북)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=jeonju",
  [s("SBS 파워FM (대전세종충남)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=daejeon",
  [s("SBS 파워FM (충북)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=cheongju",
  [s("SBS 파워FM (강원)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=chuncheon",
  [s("SBS 파워FM (제주)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=powerfm&city=jeju",

  // 라디오 - SBS 러브FM
  [s("SBS 러브FM (수도권)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=lovefm",
  [s("SBS 러브FM (부산경남)")]: "https://radio.bsod.kr/stream/?stn=sbs&ch=lovefm&city=busan",

  // 라디오 - MBC 표준FM
  [s("MBC 표준FM (수도권)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm",
  [s("MBC 표준FM (부산)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=busan",
  [s("MBC 표준FM (울산)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=ulsan",
  [s("MBC 표준FM (경남)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=changwon",
  [s("MBC 표준FM (대구)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=daegu",
  [s("MBC 표준FM (안동)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=andong",
  [s("MBC 표준FM (포항)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=pohang",
  [s("MBC 표준FM (광주)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=gwangju",
  [s("MBC 표준FM (목포)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=mokpo",
  [s("MBC 표준FM (여수)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=yeosu",
  [s("MBC 표준FM (전주)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=jeonju",
  [s("MBC 표준FM (대전)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=daejeon",
  [s("MBC 표준FM (충북)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=cheongju",
  [s("MBC 표준FM (춘천)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=chuncheon",
  [s("MBC 표준FM (강원영동)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=gangneung",
  [s("MBC 표준FM (제주)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=sfm&city=jeju",

  // 라디오 - MBC FM4U
  [s("MBC FM4U (수도권)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u",
  [s("MBC FM4U (부산)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=busan",
  [s("MBC FM4U (울산)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=ulsan",
  [s("MBC FM4U (경남)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=changwon",
  [s("MBC FM4U (대구)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=daegu",
  [s("MBC FM4U (안동)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=andong",
  [s("MBC FM4U (포항)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=pohang",
  [s("MBC FM4U (광주)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=gwangju",
  [s("MBC FM4U (목포)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=mokpo",
  [s("MBC FM4U (여수)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=yeosu",
  [s("MBC FM4U (전주)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=jeonju",
  [s("MBC FM4U (대전)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=daejeon",
  [s("MBC FM4U (충북)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=cheongju",
  [s("MBC FM4U (춘천)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=chuncheon",
  [s("MBC FM4U (강원영동)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=gangneung",
  [s("MBC FM4U (제주)")]: "https://radio.bsod.kr/stream/?stn=mbc&ch=fm4u&city=jeju",

  // 라디오 - TBN 교통방송
  [s("TBN 교통방송 (수도권)")]: "https://radio.bsod.kr/stream/?stn=tbn",
  [s("TBN 교통방송 (부산)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=busan",
  [s("TBN 교통방송 (울산)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=ulsan",
  [s("TBN 교통방송 (경남)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=gyeongnam",
  [s("TBN 교통방송 (대구)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=daegu",
  [s("TBN 교통방송 (경북)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=gyeongbuk",
  [s("TBN 교통방송 (광주)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=gwangju",
  [s("TBN 교통방송 (전북)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=jeonbuk",
  [s("TBN 교통방송 (대전)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=daejeon",
  [s("TBN 교통방송 (충북)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=chungbuk",
  [s("TBN 교통방송 (강원)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=gangwon",
  [s("TBN 교통방송 (제주)")]: "https://radio.bsod.kr/stream/?stn=tbn&city=jeju",

  // 라디오 - CBS 표준FM
  [s("CBS 표준FM (수도권)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm",
  [s("CBS 표준FM (부산)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=busan",
  [s("CBS 표준FM (울산)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=ulsan",
  [s("CBS 표준FM (경남)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=gyeongnam",
  [s("CBS 표준FM (대구)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=daegu",
  [s("CBS 표준FM (포항)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=pohang",
  [s("CBS 표준FM (광주)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=gwangju",
  [s("CBS 표준FM (전남)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=jeonnam",
  [s("CBS 표준FM (전북)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=jeonbuk",
  [s("CBS 표준FM (대전)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=daejeon",
  [s("CBS 표준FM (충북)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=cheongju",
  [s("CBS 표준FM (춘천)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=chuncheon",
  [s("CBS 표준FM (제주)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=sfm&city=jeju",

  // 라디오 - CBS 음악FM
  [s("CBS 음악FM (수도권)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=mfm",
  [s("CBS 음악FM (부산)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=mfm&city=busan",
  [s("CBS 음악FM (대구)")]: "https://radio.bsod.kr/stream/?stn=cbs&ch=mfm&city=daegu",

  // 라디오 - FEBC 극동방송
  [s("FEBC 극동방송 (수도권)")]: "https://radio.bsod.kr/stream/?stn=febc",
  [s("FEBC 극동방송 (부산)")]: "https://radio.bsod.kr/stream/?stn=febc&city=busan",
  [s("FEBC 극동방송 (울산)")]: "https://radio.bsod.kr/stream/?stn=febc&city=ulsan",
  [s("FEBC 극동방송 (창원)")]: "https://radio.bsod.kr/stream/?stn=febc&city=changwon",
  [s("FEBC 극동방송 (대구)")]: "https://radio.bsod.kr/stream/?stn=febc&city=daegu",
  [s("FEBC 극동방송 (포항)")]: "https://radio.bsod.kr/stream/?stn=febc&city=pohang",
  [s("FEBC 극동방송 (광주)")]: "https://radio.bsod.kr/stream/?stn=febc&city=gwangju",
  [s("FEBC 극동방송 (목포)")]: "https://radio.bsod.kr/stream/?stn=febc&city=mokpo",
  [s("FEBC 극동방송 (전남동부)")]: "https://radio.bsod.kr/stream/?stn=febc&city=jeonnam",
  [s("FEBC 극동방송 (전북)")]: "https://radio.bsod.kr/stream/?stn=febc&city=jeonbuk",
  [s("FEBC 극동방송 (대전)")]: "https://radio.bsod.kr/stream/?stn=febc&city=daejeon",
  [s("FEBC 극동방송 (영동)")]: "https://radio.bsod.kr/stream/?stn=febc&city=gangwon",
  [s("FEBC 극동방송 (제주)")]: "https://radio.bsod.kr/stream/?stn=febc&city=jeju",

  // 라디오 - BBS 불교방송
  [s("BBS 불교방송 (수도권)")]: "https://radio.bsod.kr/stream/?stn=bbs",
  [s("BBS 불교방송 (광주)")]: "https://radio.bsod.kr/stream/?stn=bbs&city=gwangju",
  [s("BBS 불교방송 (대구)")]: "https://radio.bsod.kr/stream/?stn=bbs&city=daegu",

  // 라디오 - CPBC 가톨릭평화방송
  [s("CPBC 가톨릭평화방송 (수도권)")]: "https://radio.bsod.kr/stream/?stn=cpbc",
  [s("CPBC 가톨릭평화방송 (부산)")]: "https://radio.bsod.kr/stream/?stn=cpbc&city=busan",
  [s("CPBC 가톨릭평화방송 (대구)")]: "https://radio.bsod.kr/stream/?stn=cpbc&city=daegu",
  [s("CPBC 가톨릭평화방송 (광주)")]: "https://radio.bsod.kr/stream/?stn=cpbc&city=gwangju",

  // 라디오 - WBS 원음방송
  [s("WBS 원음방송 (수도권)")]: "https://radio.bsod.kr/stream/?stn=wbs",
  [s("WBS 원음방송 (부산)")]: "https://radio.bsod.kr/stream/?stn=wbs&city=busan",
  [s("WBS 원음방송 (대구)")]: "https://radio.bsod.kr/stream/?stn=wbs&city=daegu",
  [s("WBS 원음방송 (광주)")]: "https://radio.bsod.kr/stream/?stn=wbs&city=gwangju",
  [s("WBS 원음방송 (전북)")]: "https://radio.bsod.kr/stream/?stn=wbs&city=jeonbuk",

  // 라디오 - 기타 방송
  [s("EBS FM")]: "https://radio.bsod.kr/stream/?stn=ebs",
  [s("YTN 라디오")]: "https://radio.bsod.kr/stream/?stn=ytn",
  [s("iFM 경인방송")]: "https://radio.bsod.kr/stream/?stn=ifm",
  [s("OBS 라디오")]: "https://radio.bsod.kr/stream/?stn=obs",
  [s("TBS FM")]: "https://radio.bsod.kr/stream/?stn=tbs&ch=fm",
  [s("TBS eFM")]: "https://radio.bsod.kr/stream/?stn=tbs&ch=efm",
  [s("국방FM")]: "https://radio.bsod.kr/stream/?stn=kookbang",
  [s("국악방송")]: "https://radio.bsod.kr/stream/?stn=kugak",
};

export function resolveStreamFor(slug: string) {
  return streamMap[slug] ?? null;
}
