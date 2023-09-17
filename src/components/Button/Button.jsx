import ButtonEl from './Button.styled';

function Button({ onPageUpdate }) {
  return (
    <div>
      <ButtonEl type='button' onClick={onPageUpdate}>Load more</ButtonEl>
    </div>
  );
}

export default Button;
