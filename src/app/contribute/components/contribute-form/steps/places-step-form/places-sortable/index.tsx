import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { cn } from "@/lib/utils";
import { SelectPlacesSchema } from "@/lib/zod/schemas/places";
import { Grip, Plus, Trash, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function PlacesSortable() {
  const form = useFormContext<SelectPlacesSchema>();

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "places",
  });

  function onAddPlaceField() {
    append({ place: "", time: "" });
  }

  return (
    <Sortable
      value={fields}
      onMove={({ activeIndex, overIndex }) => move(activeIndex, overIndex)}
    >
      <div className="flex w-full flex-col gap-6 mb-4">
        {fields.map((field, index) => (
          <SortableItem key={field.id} value={field.id} asChild>
            <div className="mr-4 relative">
              <div
                className={cn(
                  "flex items-center gap-2 bg-muted border pr-8 pl-4 py-4 rounded-2xl"
                )}
              >
                <div className="space-y-2 flex-1">
                  <FormField
                    control={form.control}
                    name={`places.${index}.place`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {index === 0
                            ? `Partida`
                            : index === fields.length - 1
                            ? "Chegada"
                            : `${index}ª Parada`}
                        </FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`places.${index}.time`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Hora de chegada</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
                  <SortableDragHandle
                    variant="outline"
                    size="icon"
                    className="shrink-0 rounded-full"
                    type="button"
                  >
                    <Grip className="w-4 h-4" aria-hidden="true" />
                  </SortableDragHandle>

                  {fields.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 rounded-full text-destructive hover:text-destructive"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Trash className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </SortableItem>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="text-primary border-2 border-primary border-opacity-10 border-dashed hover:text-primary px-8"
          onClick={onAddPlaceField}
          type="button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar parada
        </Button>
      </div>
    </Sortable>
  );
}
