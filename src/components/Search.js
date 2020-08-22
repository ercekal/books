import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Search.scss';

const Search = ({ onSubmit }) => {
  const [keywords, setKeywords] = useState([])

  return (
    <Form inline>
      <Form.Control
        className="mb-2 mr-sm-2 "
        id="inlineFormInputName2"
        placeholder="Enter keywords"
        onChange={e => setKeywords(e.target.value)}
        value={keywords}
        />
      <Button type="submit" className="mb-2 btn-primary" onClick={(e) => onSubmit(e, keywords)}>
        Search
      </Button>
    </Form>
  );
};

export default Search;