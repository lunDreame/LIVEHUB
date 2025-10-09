const s = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9\uAC00-\uD7A3]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const streamMap: Record<string, string> = {
  // TV 채널 - 지상파/종편
  [s("KBS1")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=11",
  [s("KBS2")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=12",
  [s("KBS NEWS 24")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=81",
  [s("KBS DRAMA")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=N91",
  [s("KBS JOY")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=N92",
  [s("KBS STORY")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=N94",
  [s("KBS LIFE")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=N93",
  [s("KBS KIDS")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=N96",
  [s("KBS WORLD TV")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=14",
  [s("KBS LIVE Dokdo")]: "https://onair.kbs.co.kr/index.html?sname=onair&stype=live&ch_code=cctv01",

  [s("MBC")]: "https://xzx.kr/dJE",
  [s("MBC뉴스")]: "https://www.youtube.com/embed/q9bM12ucTIY?autoplay=1",
  [s("대구MBC")]: "https://xzx.kr/dN4",
  [s("대전MBC")]: "https://xzx.kr/bNq",
  [s("CJB")]: "https://xzx.kr/d7Y",

  [s("SBS")]: "https://xzx.kr/dH2",
  [s("SBS뉴스")]: "https://www.youtube.com/embed/RevYuGM_Bx0?autoplay=1",

  [s("JTBC")]: "https://xzx.kr/d8a",
  [s("채널A")]: "https://xzx.kr/bMV",
  [s("TV조선")]: "https://xzx.kr/dwk",
  [s("MBN")]: "https://mbnlive.mbn.co.kr/MBN/mbn_live.m3u8",

  [s("YTN")]: "https://www.youtube.com/embed/FJfwehhzIhw?autoplay=1",
  [s("연합뉴스TV")]: "https://www.youtube.com/embed/6QZ_qc75ihU?autoplay=1",
  [s("TBS")]: "https://cdntv.tbs.seoul.kr/tbs/_definst_/tbs_tv_web_720.smil/playlist.m3u8",
  [s("OBS")]: "http://mytv.dothome.co.kr/ch/catv/55.php",

  // 스포츠 채널
  [s("SBS Sports")]: "http://webtv.dothome.co.kr/ch/catv/35.php",
  [s("SBS GOLF")]: "https://xzx.kr/hgg",
  [s("JTBC GOLF")]: "https://www.youtube.com/embed/y0Fa_lEljWQ?autoplay=1",
  [s("JTBC 골프&스포츠")]: "https://xzx.kr/dsK",

  // 홈쇼핑
  [s("GS샵")]: "http://gstv-gsshop.gsshop.com/gsshop_hd/_definst_/gsshop_hd.stream/playlist.m3u8",
  [s("GS마이샵")]: "http://gstv-myshop.gsshop.com/myshop_hd/_definst_/myshop_hd.stream/playlist.m3u8",
  [s("현대홈쇼핑")]: "https://livejj.hyundaihmall.com:8443/live/ngrp:hmall.stream_pc/playlist.m3u8",
  [s("현대홈쇼핑+샵")]: "https://dtvstreaming.hyundaihmall.com/newcjp3/_definst_/newcjpstream.smil/playlist.m3u8",
  [s("NS홈쇼핑")]: "https://xzx.kr/dt4",
  [s("CJ온스타일")]: "http://live-ch1.cjonstyle.net/cjmalllive/_definst_/stream2/playlist.m3u8",
  [s("CJ온스타일+")]: "http://live-ch2.cjmall.net/cjosplus/_definst_/live2/playlist.m3u8",
  [s("롯데홈쇼핑")]: "https://xzx.kr/dt5",
  [s("롯데OneTV")]: "https://xzx.kr/dt6",
  [s("NS Shop+")]: "https://xzx.kr/dt7",
  [s("W쇼핑")]: "http://liveout.catenoid.net/live-05-wshopping/wshopping_1500k/playlist.m3u8",
  [s("신세계쇼핑")]: "https://xzx.kr/dt8",
  [s("쇼핑엔티")]: "https://xzx.kr/dt9",
  [s("공영쇼핑")]: "http://etv.publichs.com/live5.stream/playlist.m3u8",
  [s("SK스토아")]: "https://xzx.kr/dtA",
  [s("KT알파쇼핑")]: "https://livetv.kshop.co.kr/klive/_definst_/smil:klive.smil/playlist.m3u8",
  [s("홈앤쇼핑")]: "https://s30.qtcdn.co.kr/media/liveM3U8/idx/484074138/enc/1790577012/playlist.m3u8",

  // 교육/어린이
  [s("EBS1")]: "https://ebsonair.ebs.co.kr/groundwavefamilypc/familypc1m/playlist.m3u8",
  [s("EBS2")]: "https://ebsonair.ebs.co.kr/ebs2familypc/familypc1m/playlist.m3u8",
  [s("EBS KIDS")]: "https://ebsonair.ebs.co.kr/ebsufamilypc/familypc1m/playlist.m3u8",
  [s("EBS 플러스1")]: "https://ebsonair.ebs.co.kr/plus1familypc/familypc1m/playlist.m3u8",
  [s("EBS 플러스2")]: "https://ebsonair.ebs.co.kr/plus2familypc/familypc1m/playlist.m3u8",
  [s("EBS English")]: "https://ebsonair.ebs.co.kr/plus3familypc/familypc1m/playlist.m3u8",
  [s("YTN 사이언스")]: "https://www.youtube.com/embed/xfFa_kcPnCY?autoplay=1",

  // 엔터테인먼트
  [s("올 더 케이팝")]: "https://www.youtube.com/embed/IggeC2cYvYU?autoplay=1",
  [s("THE K-POP")]: "https://www.youtube.com/embed/JVocS7Yftw8?autoplay=1",
  [s("THE 트롯 보라고")]: "https://www.youtube.com/embed/CMnAakQCEdM?autoplay=1",
  [s("런닝맨")]: "https://www.youtube.com/embed/lDcWeklf6DI?autoplay=1",
  [s("대탈출")]: "https://www.youtube.com/embed/yNc5W-Bjpcw?autoplay=1",
  [s("최강야구")]: "https://xzx.kr/cxF",

  // 경제/뉴스
  [s("한국경제TV")]: "https://www.youtube.com/embed/NJUjU9ALj4A?autoplay=1",
  [s("이데일리TV")]: "https://www.youtube.com/embed/5cFoz90FUMk?autoplay=1",
  [s("매일경제TV")]: "https://www.youtube.com/embed/s9xL1DpBsfQ?autoplay=1",
  [s("머니투데이방송")]: "https://www.youtube.com/embed/lb1oB2feqkQ?autoplay=1",
  [s("서울경제TV")]: "https://www.youtube.com/embed/ACLfq550lOI?autoplay=1",
  [s("연합뉴스경제TV")]: "https://www.youtube.com/embed/yhpbioCP6nA?autoplay=1",
  [s("KTV")]: "https://hlive.ktv.go.kr/live/klive_h.stream/playlist.m3u8",
  [s("국회방송")]: "https://m.webcast.go.kr/live/_definst_/smil:natv_720p.smil/playlist.m3u8",

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
