import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import Spinner from "react-bootstrap/Spinner"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Pagination from "./Pagination"
import Search from "./Search"

const API_URL = "http://nyx.vima.ekt.gr:3000/api/books"

const List = () => {
  const searchTerms = new URLSearchParams(window.location.search).get("search")
  const [pages, setPages] = useState(
    parseInt(new URLSearchParams(window.location.search).get("page"), 10) || 1
  )
  const [data, setData] = useState(null)
  const [keywords, setKeywords] = useState(searchTerms || '')

  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      const searchObj = {
        page: pages,
      }
      if (keywords.length > 0) {
        searchObj.filters = [{ type: "all", values: [keywords] }]
      }
      try {
        const response = await axios
        .post(API_URL, searchObj)
        history.push(`/?page=${pages}&search=${keywords}`)
        setData(response.data)
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
    // eslint-disable-next-line
}, []);

  let totalPages = !!data && Math.ceil(data.count / 20)

  const onSubmit = (e) => {
    e.preventDefault()
    if (keywords.length > 0) {
      axios
        .post(API_URL, {
          filters: [{ type: "all", values: [keywords] }],
        })
        .then((res) => {
          history.push(`/?page=${1}&search=${keywords}`)
          setPages(1)
          totalPages = Math.ceil(res.data.count / 20)
          setData(res.data)
        })
        .catch((err) => console.log(err))
    } else {
      axios
      .post(API_URL)
      .then((res) => {
        setPages(1)
        history.push(`/?page=${1}`)
        setData(res.data)
      })
      .catch((err) => console.log(err))
    }
  }

  const handleClick = (num) => {
    setPages(num)
    history.push(
      `?page=${num}${keywords.length > 0 ? `&search=${keywords}` : ""}`
    )
    const searchObj = {
      page: num,
    }
    if (keywords.length > 0) {
      searchObj.filters = [{ type: "all", values: [keywords] }]
    }

    axios
      .post(API_URL, searchObj)
      .then((res) => {
        totalPages = Math.ceil(res.data.count / 20)
        setData(res.data)
      })
      .catch((e) => console.log(e))
  }

  const renderTable = () => {
    if (data.books.length === 0)
      return "There is no suitable result. Please change the keywords"
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
        <tbody>
          {data.books.map((book, i) => {
            const num = pages === 1 ? 0 : (pages - 1) * 20
            return (
              <tr key={book.id}>
                <td>{num + i + 1}</td>
                <td>{book.id}</td>
                <td>{book.book_title}</td>
                <td>{book.book_author}</td>
                <td>
                  {book.book_publication_city} - {book.book_publication_country}{" "}
                  - {book.book_publication_year}
                </td>
                <td>{book.book_pages}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  if (!data)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  return (
    <div>
      <Search
        onSubmit={onSubmit}
        keywords={keywords}
        setKeywords={setKeywords}
      />
      {renderTable()}
      <Pagination
        pages={pages}
        setPages={setPages}
        handleClick={handleClick}
        totalPages={totalPages}
      />
    </div>
  )
}

export default List
