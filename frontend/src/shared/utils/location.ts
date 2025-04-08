const locationLinkMap: Record<string, string> = {
  국립중앙박물관: "https://www.museum.go.kr",
  MOMA: "https://www.moma.org",
  "The Metropolitan Museum of Art": "https://engage.metmuseum.org/",
  "Harvard Art Museum": "https://harvardartmuseums.org",
};

export function getLocationLink(location: string): string {
  return (
    locationLinkMap[location] ??
    `https://search.naver.com/search.naver?query=${encodeURIComponent(
      location
    )}`
  );
}
