import React, {useEffect, useState} from 'react';
import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation
} from "react-router-dom";

const List = () => {
  const [pages, setPages] = useState((new URLSearchParams(window.location.search)).get("page") || 1)
  const [data, setData] = useState({})
  let history = useHistory();
  console.log('data: ', data);

  useEffect(() => {
    axios.post('http://nyx.vima.ekt.gr:3000/api/books', {page: pages})
    .then(res => {
      // history.push(`/?page=${pages}`);
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

  console.log('history: ', history);
  let items = [];
  const totalPagess = Math.ceil(data.count / 20)
  console.log('totalPagess: ', totalPagess);
  for (let number = 1; number <= totalPagess; number++) {
    items.push(
      <Pagination.Item key={number} pages={number === pages}>
        {number}
      </Pagination.Item>,
    );
  }

  function handleClick(num) {
    setPages(pages + num)
    history.push(`/home?page=${pages + num}`);
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
        {pages < totalPagess - 2 && after}
        {pages !== totalPagess && <Pagination.Next onClick={() => setPages(pages + 1)}/>}
        {pages !== totalPagess && <Pagination.Last onClick={() => setPages(totalPagess)}/>}
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