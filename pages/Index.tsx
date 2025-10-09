import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { categories, channels } from "@/lib/data/channels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChannelCard from "@/components/ChannelCard";
import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const initial = (searchParams.get("cat") as any) || categories[0].id;

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

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-fuchsia-500/10 to-emerald-400/10" />
        <div className="container flex flex-col items-center gap-6 py-14 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
            지금 시청 가능한 실시간 채널 모음
          </span>
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
