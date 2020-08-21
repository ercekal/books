import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Search = ({setKeywords, onSubmit, keywords}) => {
  return (
    <Form inline>
      <Form.Control
        className="mb-2 mr-sm-2"
        id="inlineFormInputName2"
        placeholder="Enter keywords"
        onChange={e => setKeywords(e.target.value)}
        value={keywords}
        />
      <Button type="submit" className="mb-2" onClick={onSubmit}>
        Search
      </Button>
    </Form>
  );
};

export default Search;