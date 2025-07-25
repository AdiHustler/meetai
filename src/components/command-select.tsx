import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "./ui/command";
import { onSet } from "better-auth/react";
import { placeholder } from "drizzle-orm";
import { Button } from "./ui/button";
interface Props{
  options: Array<{
    id: string;
    value: string;
    children: ReactNode; 
  }>;
  onSelect: (value: string)=>void;
  onSearch: (value: string)=>void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
};

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: Props) =>{
  const [open,setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const handleOpenChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  };



  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className,
        )}
      >
        <div>
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm"> 
              No options found
            </span>
          </CommandEmpty>
          {options.map((options) => (
            <CommandItem
              key={options.id}
              onSelect={() => {
                onSelect(options.value)
                setOpen(false);
              }}
            >
              {options.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}