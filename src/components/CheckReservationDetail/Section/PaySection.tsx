import { useEffect, useState } from 'react';
import Section from '../ReUse/Section';
import SectionListBox from '../ReUse/SectionListBox';
import { formatCurrency } from '../../../utils/changeFormat';

interface PaySectionProps {
  price: string;
}

export default function PaySection({ price }: PaySectionProps) {
  const [formattedPrice, setFormattedPrice] = useState<string>();

  useEffect(() => {
    if (price) {
      setFormattedPrice(formatCurrency(price));
    }
  }, [price]);
  return (
    <Section title="결제 정보">
      <SectionListBox title="총 비용" content={`${formattedPrice}원`} />
    </Section>
  );
}
