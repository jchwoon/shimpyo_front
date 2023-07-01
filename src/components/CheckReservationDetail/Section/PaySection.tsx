import Section from '../ReUse/Section';
import SectionListBox from '../ReUse/SectionListBox';

interface PaySectionProps {
  price: string;
}

export default function PaySection({ price }: PaySectionProps) {
  return (
    <Section title="결제 정보">
      <SectionListBox title="총 비용" content={`${price}원`} />
    </Section>
  );
}
