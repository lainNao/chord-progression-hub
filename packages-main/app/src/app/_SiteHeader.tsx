import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function SiteHeader(): JSX.Element {
  return (
    <header>
      {/* title chord-progression-hub */}
      <div>CPH</div>

      <h1>SiteHeader</h1>

      <div>
        <Button variant="outline" size="icon">
          <GearIcon />
        </Button>
      </div>
    </header>
  );
}
