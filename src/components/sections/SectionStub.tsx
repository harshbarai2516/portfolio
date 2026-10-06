import Section from "@/components/ui/Section";

type Props = { id: string; num: string; title: string };

export default function SectionStub({ id, num, title }: Props) {
  return (
    <Section id={id} num={num} title={title}>
      <p className="text-muted">Coming in the next step.</p>
    </Section>
  );
}