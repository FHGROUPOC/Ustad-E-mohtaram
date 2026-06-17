import OdometerCounterInteractive from "./OdometerCounterInteractive";

interface OdometerCounterServerProps {
    count: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
    children?: React.ReactNode;
}

export default function OdometerCounterServer(props: OdometerCounterServerProps) {
    return <OdometerCounterInteractive {...props} />;
}

