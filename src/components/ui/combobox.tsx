"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ElementType, useState } from "react";

type ComboboxOption = {
  label: string;
  value: string;
};

type ComboboxProps = {
  options: ComboboxOption[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  search?: string | undefined;
  onSearchChange?: (value: string | undefined) => void;
  emptyMessage?: string;
  icon?: ElementType;
  isLoading?: boolean;
};

export function Combobox({
  options = [],
  value,
  onChange,
  placeholder = "Selecionar...",
  searchPlaceholder = "Pesquisar...",
  search,
  onSearchChange,
  emptyMessage = "Nenhum resultado encontrado.",
  icon: Icon,
  isLoading = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const label = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {Icon && <Icon className="mr-2 h-4 w-4 shrink-0" />}

          <span className="flex-1 block w-full text-left">
            {value ? label : placeholder}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 popover-content-width-full">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={onSearchChange}
          />

          <CommandList>
            {isLoading && <CommandLoading>Carregando...</CommandLoading>}
            {!isLoading && <CommandEmpty>{emptyMessage}</CommandEmpty>}

            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={(currentValue) => {
                  const currentValueId = options.find(
                    (option) => option.label === currentValue
                  )?.value;
                  onChange(currentValue === value ? undefined : currentValueId);
                  onSearchChange && onSearchChange("");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
