// Main Section5 component - now imports server component
import Section5Server from "./Section5Server";

interface Section5Props {
  display: string;
}

export default function Section5({ display }: Section5Props) {
  return <Section5Server display={display} />;
}
