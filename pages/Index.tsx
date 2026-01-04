import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { categories, channels } from "@/lib/data/channels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChannelCard from "@/components/ChannelCard";
import { Search, Lock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const initial = (searchParams.get("cat") as any) || categories[0].id;

  // 핀 번호 인증 상태 확인
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem("pinAuthenticated") === "true";
    } catch {
      return false;
    }
  });

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(initial);

  // URL 쿼리 파라미터에서 열려있는 그룹 정보 가져오기
  const groupsParam = searchParams.get("groups");
  const [openGroups, setOpenGroups] = useState<string[]>(
    groupsParam ? groupsParam.split(",").filter(Boolean) : []
  );

  // URL 파라미터가 변경되면 openGroups 상태 업데이트
  useEffect(() => {
    const groupsFromUrl = searchParams.get("groups");
    if (groupsFromUrl) {
      setOpenGroups(groupsFromUrl.split(",").filter(Boolean));
    } else {
      setOpenGroups([]);
    }
  }, [searchParams]);

  useEffect(() => {
    // URL을 업데이트하되, 열려있는 그룹 정보도 포함
    const params: Record<string, string> = { cat: active };
    if (openGroups.length > 0) {
      params.groups = openGroups.join(",");
    }
    setSearchParams(params, { replace: true });
  }, [active, openGroups]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return channels.filter((c) => {
      const inCat = c.category === active;
      if (!q) return inCat;
      return inCat && c.name.toLowerCase().includes(q);
    });
  }, [query, active]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
    setPinError(false);

    // 4자리 입력 시 핀 번호 검증
    const correctPin = import.meta.env.VITE_PIN_CODE || "";
    if (value.length === 4) {
      if (value === correctPin) {
        try {
          localStorage.setItem("pinAuthenticated", "true");
          setIsAuthenticated(true);
        } catch {
          // localStorage 오류 처리
        }
      } else {
        // 잘못된 핀 번호인 경우 에러 표시 후 입력 초기화
        setPinError(true);
        setTimeout(() => {
          setPin("");
          setPinError(false);
        }, 1000);
      }
    }
  };

  // 핀 번호 입력 화면
  if (!isAuthenticated) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="container flex flex-col items-center gap-6 px-4 py-20">
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-fuchsia-500/10 to-emerald-400/10" />
            <div className="flex flex-col items-center gap-6 rounded-lg border bg-background/60 p-8 backdrop-blur sm:p-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-lg">
                <Lock className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  핀 번호를 입력하세요
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  4자리 숫자를 입력해주세요
                </p>
              </div>
              <div className="w-full max-w-xs">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pin}
                  onChange={handlePinChange}
                  placeholder="0000"
                  className={`text-center text-2xl font-mono tracking-widest ${pinError ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                  maxLength={4}
                  autoFocus
                />
                {pinError && (
                  <p className="mt-2 text-center text-sm text-red-500">
                    잘못된 핀 번호입니다
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-3 w-3 rounded-full transition-colors ${pinError
                      ? "bg-red-500"
                      : i < pin.length
                        ? "bg-primary"
                        : "bg-muted"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-fuchsia-500/10 to-emerald-400/10" />
        <div className="container flex flex-col items-center gap-6 py-14 text-center md:py-20">
          <h1 className="max-w-3xl text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            실시간 방송을 한 곳에서. 더 빠르게, 더 간편하게
          </h1>
          <p className="max-w-2xl text-pretty text-muted-foreground">
            지상파/종편부터 스포츠, 홈쇼핑, 해외 뉴스까지. 원하는 채널을 검색해 바로 시청하세요.
          </p>
          <div className="flex w-full max-w-2xl items-center gap-2">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="채널명을 검색하세요 (예: KBS, SBS, 프로야구)"
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setQuery("")}>초기화</Button>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <Tabs value={active} onValueChange={(v) => setActive(v as any)}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="w-full overflow-auto sm:w-auto">
              {categories.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="whitespace-nowrap">
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <p className="text-sm text-muted-foreground">
              총 {filtered.length.toLocaleString()}개 채널
            </p>
          </div>

          {categories.map((c) => (
            <TabsContent key={c.id} value={c.id} className="mt-6">
              {c.id === "radio" ? (
                // Accordion-based radio listing for better UX with many channels
                (() => {
                  const radios = filtered.filter((ch) => ch.category === "radio");
                  const groups: Record<string, any[]> = {};
                  for (const r of radios) {
                    const g = r.group || "기타";
                    if (!groups[g]) groups[g] = [];
                    groups[g].push(r);
                  }

                  // 지정된 순서대로 정렬
                  const groupOrder = [
                    "KBS 라디오",
                    "SBS 라디오",
                    "MBC 라디오",
                    "TBN 교통방송",
                    "CBS 기독교방송",
                    "FEBC 극동방송",
                    "BBS 불교방송",
                    "CPBC 가톨릭평화방송",
                    "WBS 원음방송",
                    "기타 방송"
                  ];

                  const groupNames = Object.keys(groups).sort((a, b) => {
                    const aIndex = groupOrder.indexOf(a);
                    const bIndex = groupOrder.indexOf(b);
                    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
                    if (aIndex === -1) return 1;
                    if (bIndex === -1) return -1;
                    return aIndex - bIndex;
                  });

                  return (
                    <Accordion
                      type="multiple"
                      className="w-full"
                      value={openGroups}
                      onValueChange={setOpenGroups}
                    >
                      {groupNames.map((g) => (
                        <AccordionItem key={g} value={g}>
                          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                            <div className="flex items-center gap-2">
                              <span>{g}</span>
                              <span className="text-sm font-normal text-muted-foreground">
                                ({groups[g].length}개)
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                              {groups[g].map((ch) => (
                                <ChannelCard
                                  key={`${ch.slug}-${encodeURIComponent(ch.name)}`}
                                  channel={ch}
                                  currentCategory={c.id}
                                />
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  );
                })()
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {filtered
                    .filter((ch) => ch.category === c.id)
                    .map((ch) => (
                      <ChannelCard key={`${ch.slug}-${encodeURIComponent(ch.name)}`} channel={ch} currentCategory={c.id} />
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
}
