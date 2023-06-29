import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useReservationCategoryToggle(category: string) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleShowButton = () => {
    setIsOpen(prev => !prev);

    if (searchParams.get(category) === 'true') {
      setSearchParams(searchParams => {
        searchParams.set(category, 'false');
        return searchParams;
      });
    } else if (searchParams.get(category) === 'false' || !searchParams.get(category)) {
      setSearchParams(searchParams => {
        searchParams.set(category, 'true');
        searchParams.set(`${category}Page`, `${searchParams.get(`${category}Page`) || '1'}`);
        return searchParams;
      });
    }
  };

  useEffect(() => {
    const isCategoryOpen = searchParams.get(category);

    if (isCategoryOpen === 'true') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [category, searchParams]);

  return { toggleShowButton, isOpen };
}
