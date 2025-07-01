import { X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { PublicationSearch } from "./publication-search";

export default function UtilityDrawer(props: { onClick: () => void }) {
  const tabs = [
    {
      name: "Problems",
      component: <div></div>,
    },
    {
      name: "Tables",
      component: <div></div>,
    },
    {
      name: "Equations",
      component: <div></div>,
    },
    {
      name: "Citations",
      component: <PublicationSearch />,
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const updateTab = (event: MouseEvent<HTMLButtonElement>) => {
    const updatedTab = tabs.find(
      (item) => item.name == event.currentTarget.innerHTML
    );
    setCurrentTab(updatedTab!);
  };

  // CMD/CTRL + "." -> Toggle Drawer
  useEffect(() => {
    const toggleDrawer = (event: KeyboardEvent) => {
      if (event.key === "." && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        props.onClick();
      }
    };
    window.addEventListener("keydown", toggleDrawer);
    return () => window.removeEventListener("keydown", toggleDrawer);
  });

  return (
    <div className="bg-sidebar h-full px-4 pb-[3rem]">
      {/* HEADER */}
      <div className="flex items-center text-primary gap-4 mb-2">
        <div className="grow flex gap-8 overflow-x-auto">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                onClick={updateTab}
                className={`${
                  currentTab.name == tab.name ? "font-bold" : "text-muted-tabs"
                } py-2`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
        <button onClick={props.onClick}>
          <X size={20} />
        </button>
      </div>

      {/* BODY */}
      <div className="h-full overflow-y-auto">{currentTab.component}</div>
    </div>
  );
}
