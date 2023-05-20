import IBook, { ISheetBestBook, ISheetBestBookStat } from "../types/IBook";

const sheetBestUrl =
  "https://sheet.best/api/sheets/aa1f111c-28d5-4803-bf7f-64a3f2295352";
const isDevEnv = process.env.NODE_ENV === "development";
const useCache = true;
const cachePrefix = isDevEnv ? "book-club/cache" : "cache";

const get = (url?: string) => {
  return fetch(`${sheetBestUrl}${url ?? ""}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

const getFromCache = (url: string) => {
  console.log("Load from cache", url);
  return fetch(`${cachePrefix}/${url}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    try {
      return response.json();
    } catch (e) {
      console.log(e);
    }
  });
};

const getBookList = (): Promise<ISheetBestBook[]> => {
  if (useCache) return getFromCache("books.json");
  return get();
};

const getBookStats = (): Promise<ISheetBestBookStat[]> => {
  if (useCache) return getFromCache("stats.json");
  return get("/tabs/Book%20Stats");
};

const getReaderStats = () => {
  if (useCache) return getFromCache("readerStats.json");
  return get("/tabs/Reader%20Stats");
};

export const getCacheConfig = () => {
  return getFromCache("/config.json");
};

export const getBooks = (): Promise<IBook[]> => {
  return Promise.all([getBookList(), getBookStats()]).then(processResults);
};

const processResults = (
  results: [ISheetBestBook[], ISheetBestBookStat[]]
): IBook[] => {
  const [books, stats] = results;

  return books
    .map(
      (book: ISheetBestBook, idx: number) =>
        ({
          ...book,
          isCurrentlyReading: book.year === "Currently Reading",
          isUpcoming: book.year === "Upcoming",
          year: Number(book.year),

          ...stats[idx],
          genres: stats[idx].genre?.split("|") ?? [],
          pages: stats[idx].pages ? Number(stats[idx].pages) : undefined,
        } as IBook)
    )
    .reverse();
};
