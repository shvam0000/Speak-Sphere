import { ButtonProps } from '@/app/utils/props/props';

const Button: React.FC<ButtonProps> = ({ type, handleClick, children }) => {
  return (
    <button
      type="submit"
      onClick={handleClick}
      className={`text-md px-4 py-2 rounded-full w-fit cursor-pointer hover:scale-110 ${
        type === 'primary'
          ? 'bg-primary-blue text-gray-100'
          : 'bg-primary-pink border-gray-300 text-white'
      }`}>
      {children}
    </button>
  );
};
export default Button;
