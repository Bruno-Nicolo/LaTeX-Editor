import { X } from "lucide-react";
import { useState, type MouseEvent } from "react";

export default function UtilityDrawer(props: { onClick: () => void }) {
  const [currentTab, setCurrentTab] = useState("Problems");

  const tabs = ["Problems", "Tables", "Equations", "Citations"];

  const updateTab = (event: MouseEvent<HTMLButtonElement>) =>
    setCurrentTab(event.currentTarget.innerHTML);

  return (
    <div className="bg-sidebar h-full px-4">
      {/* HEADER */}
      <div className="flex items-center text-primary gap-4  mb-2">
        <div className="grow flex gap-8 overflow-x-auto">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                onClick={updateTab}
                className={`${
                  currentTab == tab ? "font-bold" : "text-muted-tabs"
                } py-2 `}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <button onClick={props.onClick}>
          <X />
        </button>
      </div>

      {/* BODY */}
      <div></div>
    </div>
  );
}
