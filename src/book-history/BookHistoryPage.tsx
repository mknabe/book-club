import { useEffect, useState, useRef } from "react";
import Book from "./components/Book";
import BookList from "./components/BookList";
import UpcomingBooks from "./components/UpcomingBooks";
import { Row, Col, Button, Tag, Spin, Collapse, Divider, Input } from "antd";
import { DoubleRightOutlined, PushpinOutlined } from "@ant-design/icons";
import FavoriteIcon from "./components/FavoriteIcon";
import DislikeIcon from "./components/DislikeIcon";
import IBook from "types/IBook";

interface IProps {
  books: IBook[];

}

interface IGenreList {
  [key: string]: number;
}

const BookHistoryPage = ({ books }: IProps) => {
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [showDisliked, setShowDisliked] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Filter books by search query
  const searchFilteredBooks = filteredBooks.filter((b) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      b.title?.toLowerCase().includes(query) ||
      b.author?.toLowerCase().includes(query)
    );
  });

  const years = [...new Set(searchFilteredBooks.map((b) => b.year))].filter(
    (y) => y && !isNaN(y)
  );
  const [activeYears, setActiveYears] = useState<string[]>(years.map(year => String(year)));
  const prevYearsRef = useRef<string[]>(years.map(year => String(year)));

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const toggleFavorites = () => {
    if (!showFavorites) {
      setFilteredBooks(books.filter((b) => b.best_of));
    } else {
      setFilteredBooks(books);
    }
    setShowFavorites(!showFavorites);
    setShowDisliked(false);
  };
  const toggleDisliked = () => {
    if (!showDisliked) {
      setFilteredBooks(books.filter((b) => b.worst_of));
    } else {
      setFilteredBooks(books);
    }
    setShowDisliked(!showDisliked);
    setShowFavorites(false);
  };
  const filterGenre = (genre: string) => {
    setFilteredBooks(books.filter((b) => b.genres.indexOf(genre) > -1));
  };

  const genres = Object.entries(
    books
      .flatMap((b) => b.genres)
      .reduce((genres: IGenreList, genre) => {
        const existing = genres[genre] ?? 0;
        return { ...genres, [genre]: existing + 1 };
      }, {})
  ).sort((a, b) => (a[1] > b[1] ? -1 : 1));

  const currentlyReading = books.find((b) => b.isCurrentlyReading);
  const upcoming = books.filter((b) => b.isUpcoming).reverse();

  useEffect(() => {
    const yearKeys = years.map(year => String(year));
    const prevYears = prevYearsRef.current;
    const addedYears = yearKeys.filter(y => !prevYears.includes(y));
    const removedYears = prevYears.filter(y => !yearKeys.includes(y));
    if (addedYears.length > 0 || removedYears.length > 0) {
      setActiveYears(prev => {
        // Remove years no longer present
        const filteredPrev = prev.filter(y => yearKeys.includes(y));
        // Add new years
        return [...filteredPrev, ...addedYears];
      });
      prevYearsRef.current = yearKeys;
    }
  }, [years]);

  return books.length ? (
    <>
      {/* Reading Now */}
      <h2
        style={{
          marginLeft: "5px",
          marginBottom: "0",
          fontSize: 21,
          lineHeight: "33px",
        }}
      >
        <PushpinOutlined style={{ marginRight: 5 }} />
        Reading Now
      </h2>
      <Row className="BookList BookList-Upcoming">
        {!!currentlyReading && (
          <BookList
            books={[currentlyReading]}
            className="BookList-item-current"
          />
        )}

        {/* Upcoming Books */}
        <Col xs={12} sm={16} md={18} lg={20}>
          <UpcomingBooks books={upcoming} />
          <Row className="upcoming-books">
            {upcoming.map((book, idx) => {
              const hideXs = idx > 0,
                hideSm = idx > 1,
                hideMd = idx > 3,
                hideLg = idx > 5;
              return (
                <Col
                  key={idx}
                  xs={22}
                  sm={10}
                  md={6}
                  lg={4}
                  className={`BookList-item BookList-item-current ${
                    hideXs ? "hideXs" : ""
                  } ${hideSm ? "hideSm" : ""} ${hideMd ? "hideMd" : ""} ${
                    hideLg ? "hideLg" : ""
                  }`}
                >
                  <div className="BookList-item-margin">
                    <Book book={book} key={idx} />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>

      {/* Filters and Search */}
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Input.Search
          placeholder="Search books by title or author"
          allowClear
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ margin: 5, maxWidth: 308 }}
        />
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 8 }}>
          <Button style={{ margin: 5 }} onClick={toggleFavorites}>
            <FavoriteIcon /> {showFavorites ? "Show All" : "Show Favorites"}
          </Button>
          <Button style={{ margin: 5 }} onClick={toggleDisliked}>
            <DislikeIcon /> {showDisliked ? "Show All" : "Show Disliked"}
          </Button>
        </div>

        {/* Genre Cloud */}
        <div className="GenreCloud" style={{ maxWidth: 390 }}>
          {genres.map((genre) => (
            <Tag onClick={() => filterGenre(genre[0])} key={genre[0]}>
              {genre[0]} ({genre[1]})
            </Tag>
          ))}
        </div>
      </div>

      {years.map((year, idx) => {
        const booksInYear = searchFilteredBooks.filter((b) => b.year === year);
        const isExpanded = activeYears.includes(String(year));
        return (
          <Collapse
            key={idx}
            activeKey={activeYears}
            onChange={(keys) => {
              setActiveYears(Array.isArray(keys) ? keys : [keys]);
            }}
            className="custom-year-collapse"
            bordered={false}
          >
            <Collapse.Panel
              header={
                <Divider orientation="left" className="year-ant-divider">
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <DoubleRightOutlined className={`year-chevron${isExpanded ? " expanded" : ""}`} />
                    <span className="year-header-year">{year}</span>
                    <span className="year-header-count">{booksInYear.length} Books</span>
                  </span>
                </Divider>
              }
              key={String(year)}
              className="custom-year-panel"
            >
              <Row className="BookList">
                <BookList books={booksInYear} />
              </Row>
            </Collapse.Panel>
          </Collapse>
        );
      })}
    </>
  ) : (
    <div style={{ textAlign: "center", margin: 15 }}>
      <Spin size="large" />
    </div>
  );
};

export default BookHistoryPage;
