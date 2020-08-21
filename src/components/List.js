import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const List = () => {
  const [pages, setPages] = useState(parseInt((new URLSearchParams(window.location.search)).get("page")) || 1)
  const [data, setData] = useState({})
  let history = useHistory();

  useEffect(() => {
    axios.post('http://nyx.vima.ekt.gr:3000/api/books', {page: pages})
    .then(res => {
      setData(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    axios.post('http://nyx.vima.ekt.gr:3000/api/books', {page: pages})
    .then(res => {
      history.push(`/?page=${pages}`);
      setData(res.data)
    })
    .catch(e => console.log(e))
  }, [pages])

  let items = [];
  const totalPages = Math.ceil(data.count / 20)
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} pages={number === pages}>
        {number}
      </Pagination.Item>,
    );
  }

  function handleClick(num) {
    setPages(pages + num)
    history.push(`?page=${pages + num}`);
  }

  const renderPagination = () => {
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
      <Pagination>
        {pages !== 1 && <Pagination.First onClick={() => setPages(1)}/>}
        {pages !== 1 && <Pagination.Prev onClick={() => setPages(pages - 1)}/>}
        {pages > 2 && before}
        <Pagination.Item active>{pages}</Pagination.Item>
        {pages < totalPages - 2 && after}
        {pages !== totalPages && <Pagination.Next onClick={() => setPages(pages + 1)}/>}
        {pages !== totalPages && <Pagination.Last onClick={() => setPages(totalPages)}/>}
      </Pagination>
    )
  }
  return (
    <div>
      {renderPagination()}
    </div>
  );
};

export default List;