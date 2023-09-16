import ButtonEl from './Button.styled';

function Button({ onPageUpdate }) {
  return (
    <div>
      <ButtonEl onClick={onPageUpdate}>Load more</ButtonEl>
    </div>
  );
}

export default Button;
