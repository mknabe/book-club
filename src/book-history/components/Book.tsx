import { Card } from "antd";
import IBook from "types/IBook";
import FavoriteIcon from "./FavoriteIcon";
import DislikeIcon from "./DislikeIcon";
import LibbyIcon from "./LibbyIcon";

interface IProps {
  book: IBook;
}

const Book = ({ book }: IProps) => {
  if (!book) return null;
  return (
    <div className="Book">
      <a href={book.goodreads_link} target="_blank">
        <Card
          size="small"
          hoverable
          cover={<img src={book.image} alt="Book cover" />}
        >
          <Card.Meta
            title={
              <div>
                <span className="Book-icon">
                  {book.best_of && <FavoriteIcon />}
                  {book.worst_of && <DislikeIcon />}
                  <a
                    href={`/book-club/#/search/${book.title}/${book.author
                      .split(" ")
                      .slice(-1)}`}
                    target="_blank"
                  >
                    <LibbyIcon />
                  </a>
                </span>
                {book.title}
              </div>
            }
            description={
              <>
                {/*<div>{book.series}</div>*/}
                <div>{book.author}</div>
                {!!book.picked_by && <div>Picked by {book.picked_by}</div>}
              </>
            }
          />
        </Card>
      </a>
    </div>
  );
};

export default Book;
