// Main OdometerCounter component - now imports server component
import OdometerCounterServer from "./OdometerCounterServer";

interface OdometerCounterProps {
  count: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  children?: React.ReactNode;
}

export default function OdometerCounter(props: OdometerCounterProps) {
  return <OdometerCounterServer {...props} />;
} 