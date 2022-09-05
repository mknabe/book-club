import IBook, { ISheetBestBook } from "../types/IBook";

const sheetBestUrl = "https://sheet.best/api/sheets/aa1f111c-28d5-4803-bf7f-64a3f2295352";
const useCache = process.env.NODE_ENV === 'development'

const get = (url?: string) => {
  return fetch(`${sheetBestUrl}${url ?? ''}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
};

const getFromCache = (url: string) => {
  return fetch(`book-club/cache${url}`)
    .then(response => response.json());
}

const getBookList = () => {
  if (useCache) return getFromCache('/books.json');
  return get();
};

const getBookStats = () => {
  if (useCache) return getFromCache('/stats.json');
  return get('/tabs/Book%20Stats');
};

const getReaderStats = () => {
  if (useCache) return getFromCache('/readerStats.json');
  return get('/tabs/Reader%20Stats');
};

export const getBooks = () : Promise<IBook[]> => {
  return Promise.all([
    getBookList(),
    getBookStats(),
    getReaderStats()
  ]).then(results => {
    const [books, stats, readerStats] = results;
    
    return books.map((book: ISheetBestBook, idx: number) => ({
      ...book,
      isCurrentlyReading: book.year === 'Currently Reading',
      isUpcoming: book.year === 'Upcoming',
      year: Number(book.year) || undefined,
      
      ...stats[idx],
      genres: stats[idx].genre?.split('|') ?? [],
      
      ...readerStats[idx]
    })).reverse();
  });
};
