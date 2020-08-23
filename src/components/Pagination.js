import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
import './Pagination.scss';

const PaginationComponent = ({pages, setPages, totalPages, handleClick}) => {
  console.log('pages: ', pages);
  console.log('totalPages: ', totalPages);
  let before = (
    <>
      <Pagination.Item onClick={() => handleClick(pages - 2)}>{pages - 2}</Pagination.Item>
      <Pagination.Item onClick={() => handleClick(pages - 1)}>{pages - 1}</Pagination.Item>
    </>
  )

  let after = (
    <>
      <Pagination.Item onClick={() => handleClick(pages + 1)}>{pages + 1}</Pagination.Item>
      <Pagination.Item onClick={() => handleClick(pages + 2)}>{pages + 2}</Pagination.Item>
    </>
  )

  return (
    <Pagination className='pagination'>
      {pages !== 1 && <Pagination.First onClick={() => handleClick(1)}/>}
      {pages !== 1 && <Pagination.Prev onClick={() => handleClick(pages - 1)}/>}
      {pages > 2 && before}
      <Pagination.Item active>{pages}</Pagination.Item>
      {pages < totalPages - 2 && after}
      {pages !== totalPages && <Pagination.Next onClick={() => handleClick(pages + 1)}/>}
      {pages !== totalPages && <Pagination.Last onClick={() => handleClick(totalPages)}/>}
    </Pagination>
  )
};

export default PaginationComponent;