import { SearchInput } from './search-box.styles';

const SearchBox = ({ placeholder, onChangeHandler }) => (
  <SearchInput type="search" placeholder={placeholder} onChange={onChangeHandler} />
);

export default SearchBox;
