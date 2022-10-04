import PropTypes from 'prop-types';
import scss from './filter.module.scss';

export function Filter({ onChangeFilter }) {
  return (
    <label className={scss.label}>
      <span> Find contacts by name</span>
      <input type="text" name="filter" onChange={onChangeFilter}></input>
    </label>
  );
}

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};
