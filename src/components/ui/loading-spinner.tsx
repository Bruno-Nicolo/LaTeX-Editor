import { SyncLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex mt-12 justify-center">
      <SyncLoader color="var(--accent-foreground)" size={"0.75em"} />
    </div>
  );
}
