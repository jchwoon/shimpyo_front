import { Link } from 'react-router-dom';

interface LogoProps {
  path: string;
  width: string;
  height: string;
  onClick?: () => void;
}

export default function Logo({ path, width, height, onClick }: LogoProps) {
  return (
    <Link to={path} onClick={onClick}>
      <img width={width} height={height} alt="logo" src="/images/logo.png" />
    </Link>
  );
}
