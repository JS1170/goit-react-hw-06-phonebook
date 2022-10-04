import PropTypes from 'prop-types';
import scss from './contactItem.module.scss';

export function ContactItem({ id, name, number, deleteBtn }) {
  return (
    <li className={scss.item}>
      {name}: {number}
      <button
        className={scss.btnItem}
        type="button"
        onClick={() => {
          deleteBtn(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteBtn: PropTypes.func.isRequired,
};
