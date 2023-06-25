import { Link } from 'react-router-dom';

interface LogoProps {
  path: string;
  width: string;
  heihgt: string;
}

export default function Logo({ path, width, heihgt }: LogoProps) {
  return (
    <Link to={path}>
      <img width={width} height={heihgt} alt="logo" src="/images/logo.png" />
    </Link>
  );
}
