import { Button, Modal, ModalHeader } from 'react-bootstrap';

const SearchHelp = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <ModalHeader closeButton>
      <Modal.Title>Search Help</Modal.Title>
    </ModalHeader>
    <Modal.Body>
      <ul>
        <li>
          Anywhere where a variable $X is shown, the variable is not case sensitive and you can include substrings.
          <ul>
            <li>For Example: type=l</li>
            <li>This would filter the list to all flying, electric, and normal types since those types include l</li>
          </ul>
        </li>
        <li>To search a name or ID simply enter the name or id</li>
        <li>
          To search an ability input <b>ability=$ABILITY</b>
        </li>
        <li>
          To search a type input <b>type=$TYPE</b>
        </li>
        <li>
          To search a stat input <b>stat=$STATTITLE $OPERATION $STATNUM</b>
          <ul>
            <li>For Example: stat= speed &lt;= 100</li>
            <li>This would filter the list to all pokemon with a speed stat of 100 or less</li>
            <li>Valid operations include =, &lt;, &lt;=, &gt;, &gt;=</li>
          </ul>
        </li>
      </ul>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SearchHelp;
