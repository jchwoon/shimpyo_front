import { Link } from 'react-router-dom';

interface LogoProps {
  path: string;
}

export default function Logo({ path }: LogoProps) {
  return (
    <Link to={path}>
      <img width={90} height={40} alt="logo" src="/images/logo.png" />
    </Link>
  );
}
