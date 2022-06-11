import s from './Button.module.css';

const Button = ({ nextPage }) => {
  return (
    <button className={s.Button} type="button" onClick={nextPage}>
      Load more
    </button>
  );
};

export default Button;
