// Main Tabs component - now imports server component
import TabsServer from "./TabsServer";

interface TabItem {
  /** Unique id for the tab. Will also be used for the corresponding pane element id */
  id: string;
  /** Title shown inside the tab link */
  title: React.ReactNode;
  /** Content rendered inside the tab pane */
  content: React.ReactNode;
}

interface TabsProps {
  /** Array of tab definitions */
  tabs: TabItem[];
  /** Id of the tab shown on initial render. Defaults to the first tab */
  defaultActiveId?: string;
  /** Optional CSS class for the nav element */
  navClassName?: string;
  /** Optional CSS class for the tab-content container */
  paneClassName?: string;
}

export default function Tabs(props: TabsProps) {
  return <TabsServer {...props} />;
}
