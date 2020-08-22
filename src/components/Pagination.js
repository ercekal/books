import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
import './Pagination.scss';

const PaginationComponent = ({pages, setPages, handleClick, totalPages}) => {
  console.log('totalPages: ', totalPages);
  let before = (
    <>
      <Pagination.Item onClick={() => handleClick(- 2)}>{pages - 2}</Pagination.Item>
      <Pagination.Item onClick={() => handleClick(- 1)}>{pages - 1}</Pagination.Item>
    </>
  )

  let after = (
    <>
      <Pagination.Item onClick={() => handleClick(1)}>{pages + 1}</Pagination.Item>
      <Pagination.Item onClick={() => handleClick(2)}>{pages + 2}</Pagination.Item>
    </>
  )

  return (
    <Pagination className='pagination'>
      {pages !== 1 && <Pagination.First onClick={() => setPages(1)}/>}
      {pages !== 1 && <Pagination.Prev onClick={() => setPages(pages - 1)}/>}
      {pages > 2 && before}
      <Pagination.Item active>{pages}</Pagination.Item>
      {pages < totalPages - 2 && after}
      {pages !== totalPages && <Pagination.Next onClick={() => setPages(pages + 1)}/>}
      {pages !== totalPages && <Pagination.Last onClick={() => setPages(totalPages)}/>}
    </Pagination>
  )
};

export default PaginationComponent;