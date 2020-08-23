import React from "react"
import PropTypes from "prop-types"
import Pagination from "react-bootstrap/Pagination"
import "./Pagination.scss"

const PaginationComponent = ({ pages, totalPages, handleClick }) => {
  const before = (
    <>
      <Pagination.Item onClick={() => handleClick(pages - 2)}>
        {pages - 2}
      </Pagination.Item>
      <Pagination.Item onClick={() => handleClick(pages - 1)}>
        {pages - 1}
      </Pagination.Item>
    </>
  )

  const after = (
    <>
      <Pagination.Item onClick={() => handleClick(pages + 1)}>
        {pages + 1}
      </Pagination.Item>
      <Pagination.Item onClick={() => handleClick(pages + 2)}>
        {pages + 2}
      </Pagination.Item>
    </>
  )
  if (totalPages === 0) return null

  return (
    <Pagination className="pagination">
      {pages !== 1 && <Pagination.First onClick={() => handleClick(1)} />}
      {pages !== 1 && (
        <Pagination.Prev onClick={() => handleClick(pages - 1)} />
      )}
      {pages > 2 && before}
      <Pagination.Item active>{pages}</Pagination.Item>
      {pages < totalPages - 2 && after}
      {pages !== totalPages && (
        <Pagination.Next onClick={() => handleClick(pages + 1)} />
      )}
      {pages !== totalPages && (
        <Pagination.Last onClick={() => handleClick(totalPages)} />
      )}
    </Pagination>
  )
}

export default PaginationComponent

PaginationComponent.propTypes = {
  pages: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}
