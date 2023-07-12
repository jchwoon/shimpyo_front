import { Link } from 'react-router-dom';

interface LogoProps {
  path: string;
  width: string;
  height: string;
}

export default function Logo({ path, width, height }: LogoProps) {
  return (
    <Link to={path}>
      <img width={width} height={height} alt="logo" src="/images/logo.png" />
    </Link>
  );
}
