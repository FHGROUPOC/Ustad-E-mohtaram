"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";

interface TabItem {
  /** Unique id for the tab. Will also be used for the corresponding pane element id */
  id: string;
  /** Title shown inside the tab link */
  title: React.ReactNode;
  /** Content rendered inside the tab pane */
  content: React.ReactNode;
}

interface TabsInteractiveProps {
  /** Array of tab definitions */
  tabs: TabItem[];
  /** Id of the tab shown on initial render. Defaults to the first tab */
  defaultActiveId?: string;
  /** Optional CSS class for the nav element */
  navClassName?: string;
  /** Optional CSS class for the tab-content container */
  paneClassName?: string;
}

/**
 * Reusable, accessible tab component that mimics the behaviour of Bootstrap's JS without requiring jQuery.
 *
 * Features:
 *  – Click to activate tabs
 *  – Keyboard navigation with ArrowLeft / ArrowRight to cycle, Enter / Space to activate
 *  – ARIA roles & attributes for screen-reader support
 *  – Emits a custom `shown.bs.tab` event on the activated <a> element (for compatibility with other scripts)
 */
const TabsInteractive: React.FC<TabsInteractiveProps> = ({ tabs, defaultActiveId, navClassName = "nav nav-tabs d-flex flex-row flex-wrap ps-0 mt-0 mb-4", paneClassName = "tab-content" }) => {
  const [activeId, setActiveId] = useState<string>(defaultActiveId ?? tabs[0]?.id ?? "");

  // Keep refs to all tab <a> elements for keyboard navigation
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const showTab = useCallback(
    (id: string) => {
      if (id === activeId) return;
      setActiveId(id);
    },
    [activeId]
  );

  // Dispatch custom event whenever active tab changes
  useEffect(() => {
    const idx = tabs.findIndex((t) => t.id === activeId);
    const link = tabRefs.current[idx];
    if (link) {
      const ev = new Event("shown.bs.tab");
      link.dispatchEvent(ev);
    }
  }, [activeId, tabs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    switch (e.key) {
      case "Enter":
      case " ": {
        e.preventDefault();
        showTab(tabs[index].id);
        break;
      }
      case "ArrowRight":
      case "ArrowLeft": {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + dir + tabs.length) % tabs.length;
        tabRefs.current[nextIndex]?.focus();
        break;
      }
    }
  };

  return (
    <>
      {/* Tab navigation */}
      <ul className={navClassName} role="tablist">
        {tabs.map((tab, idx) => (
          <li key={tab.id} className="nav-item">
            <a
              href={`#${tab.id}`}
              className={`nav-link${activeId === tab.id ? " active" : ""}`}
              role="tab"
              aria-selected={activeId === tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                showTab(tab.id);
              }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Tab panes */}
      <div className={paneClassName}>
        {tabs.map((tab) => (
          <div key={tab.id} id={tab.id} className={`tab-pane fade${" " + (activeId === tab.id ? "show active" : "")}`.trim()} role="tabpanel">
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default TabsInteractive;
