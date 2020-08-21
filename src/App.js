import React, {useEffect, useState} from 'react';
import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import './App.scss';


function App() {
  const [page, setPage] = useState(3)
  const [data, setData] = useState({})
  console.log('data: ', data);
  useEffect(() => {
    axios.post('http://nyx.vima.ekt.gr:3000/api/books', {page: page})
    .then(res => setData(res.data))
  }, [])

  useEffect(() => {
    axios.post('http://nyx.vima.ekt.gr:3000/api/books', {page: page})
    .then(res => setData(res.data))
  }, [page])

  const setPageUp = () => {
    if(page !== totalPages) {

    }
  }

  let items = [];
  const totalPages = Math.ceil(data.count / 20)
  console.log('totalPages: ', totalPages);
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} page={number === page}>
        {number}
      </Pagination.Item>,
    );
  }

  const renderPagination = () => {
    let before = (
      <>
        <Pagination.Item onClick={() => setPage(page - 2)}>{page - 2}</Pagination.Item>
        <Pagination.Item onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>
      </>
    )

    let after = (
      <>
        <Pagination.Item onClick={() => setPage(page + 1)}>{page + 1}</Pagination.Item>
        <Pagination.Item onClick={() => setPage(page + 2)}>{page + 2}</Pagination.Item>
      </>
    )
    return (
      <Pagination>
        {page !== 1 && <Pagination.First onClick={() => setPage(1)}/>}
        {page !== 1 && <Pagination.Prev onClick={() => setPage(page - 1)}/>}
        {page > 2 && before}
        <Pagination.Item active>{page}</Pagination.Item>
        {page < totalPages - 2 && after}
        {page !== totalPages && <Pagination.Next onClick={() => setPage(page + 1)}/>}
        {page !== totalPages && <Pagination.Last onClick={() => setPage(totalPages)}/>}
      </Pagination>
    )
  }

  return (
    <div className="App">
      {renderPagination()}
    </div>
  );
}

export default App;
