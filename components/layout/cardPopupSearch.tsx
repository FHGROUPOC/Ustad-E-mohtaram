// Main cardPopupSearch component - now imports server component
import CardPopupSearchServer from "./cardPopupSearchServer";

export default function PopupSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
    return <CardPopupSearchServer open={open} onClose={onClose} />;
}
