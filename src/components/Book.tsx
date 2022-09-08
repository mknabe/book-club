import {Card} from 'antd';
import IBook from "../types/IBook";
import FavoriteIcon from './FavoriteIcon';
import DislikeIcon from './DislikeIcon';

interface IProps {
  book: IBook
}

const Book = ({book}: IProps) => {
  if (!book) return null;
  return (
      <div className="Book">
          <a href={book.goodreads_link} target="_blank">
            <Card
                size="small"
                hoverable
                cover={
                  <img src={book.image} alt="Book cover"/>
                }
            >
              <Card.Meta
                  title={
                      <div>
                          <span className="Book-icon">
                              {book.best_of && <FavoriteIcon />}
                              {book.worst_of && <DislikeIcon />}
                          </span>
                          {book.title}
                      </div>
                  }
                  description={
                    <>
                      {/*<div>{book.series}</div>*/}
                      <div className="Book-author">{book.author}</div>
                      <div className="Book-year">{book.year_published}</div>
                    </>
                  }
              />
            </Card>
          </a>
      </div>
  );
};

export default Book;