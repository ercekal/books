import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Pagination from './Pagination'
import Search from './Search'


const List = () => {
  const [pages, setPages] = useState(parseInt((new URLSearchParams(window.location.search)).get("page")) || 1)
  const [data, setData] = useState(null)
  const [keywords, setKeywords] = useState([])
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
      console.log('res: ', res.data);
      setData(res.data)
    })
    .catch(e => console.log(e))
  }, [pages])

  const totalPages = data && Math.ceil(data.count / 20)

  function handleClick(num) {
    setPages(pages + num)
    history.push(`?page=${pages + num}`);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('http://nyx.vima.ekt.gr:3000/api/books', {
      page: pages,
      filters:[{type: "all", values: keywords.split(' ')}]
    })
    .then(res => {
      setData(res.data)
    })
    .catch(e => console.log(e))
  }

  const renderTable = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Details</th>
            <th>Pages</th>
          </tr>
        </thead>
        {<tbody>{data.books.map((book, i) => {
          return (
            <tr key={book.id}>
              <td>{i + 1}</td>
              <td>{book.id}</td>
              <td>{book.book_title}</td>
              <td>{book.book_author}</td>
              <td>{book.book_publication_city} - {book.book_publication_country} - {book.book_publication_year}</td>
              <td>{book.book_pages}</td>
            </tr>
          )})}
        </tbody>}
      </Table>
    )
  }

  if (!data) return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )

  return (
    <div>
      <Search keywords={keywords} setKeywords={setKeywords} onSubmit={onSubmit} />
      {renderTable()}
      <Pagination pages={pages} setPages={setPages} handleClick={handleClick} totalPages={totalPages} />
    </div>
  );
};

export default List;