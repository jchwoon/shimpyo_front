import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <NotFoundContainer>
      <div>
        <Link to="/">
          <Image src={'/images/logo.png'} alt="404" />
        </Link>
      </div>
      <NotFoundTitle>404 - Page Not Found</NotFoundTitle>
      <p>The page you are looking for does not exist.</p>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Image = styled.img`
  max-width: 100%;
  height: 100px;
  margin: 2rem 0;
`;
