import { forwardRef, useCallback, useState, ChangeEvent, FocusEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

interface InputProps {
  type: string;
  placeholder: string;
  error?: boolean;
  errorMessage?: string | ReactElement;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

interface ToggleTypeProps {
  isShowPassword: boolean;
  onClick: () => void;
}

const TogglePassword = ({ isShowPassword, onClick }: ToggleTypeProps) => {
  const Icon = isShowPassword ? AiOutlineEyeInvisible : AiOutlineEye;

  return (
    <Icon onClick={onClick} style={{ position: 'absolute', right: '10px', top: '25%', cursor: 'pointer' }} size={25} />
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, value, onChange, onBlur, errorMessage, error }, ref) => {
    const [isShowPassword, setShowPassword] = useState(false);

    const toggleShowPassword = useCallback(() => {
      setShowPassword(prev => !prev);
    }, []);
    return (
      <>
        <StyleLabel $error={error}>
          <StyleInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder=" "
            ref={ref}
            type={type === 'password' && isShowPassword ? 'text' : type}
          />
          <StylePlaceholder>{placeholder}</StylePlaceholder>
          {type === 'password' && <TogglePassword isShowPassword={isShowPassword} onClick={toggleShowPassword} />}
        </StyleLabel>
        {error && <StyleErrorMessage>{errorMessage}</StyleErrorMessage>}
      </>
    );
  },
);

const StyleLabel = styled.label<{ $error?: boolean }>`
  position: relative;
  padding: 0.75rem 0.5rem;
  border: ${props => (props.$error ? '2px solid red' : '1.5px solid rgb(200, 200, 200)')};
  border-radius: 0.5rem;
  margin-top: 0.5rem;

  :focus-within {
    border: 2px solid black;
    div {
      transform: translateY(-13px) translateX(-5px) scale(0.8);
    }
  }
`;

const StylePlaceholder = styled.div`
  color: rgb(100, 100, 100);
  position: absolute;
  top: 15px;
  transition: transform 0.2s ease-in-out;
`;

const StyleInput = styled.input`
  width: 100%;
  height: 1.5rem;
  outline: none;
  border: 0;
  font-size: 15px;

  &:not(:placeholder-shown) + div {
    transform: translateY(-13px) translateX(-8px) scale(0.8);
  }
`;

const StyleErrorMessage = styled.span`
  color: red;
  font-weight: 200;
  font-size: 12px;
`;
export default Input;
