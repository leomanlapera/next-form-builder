import { ZodError } from "zod";
import { createAttributeComponent } from "@coltorapps/builder-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { labelAttribute } from "./definition";

export const LabelAttribute = createAttributeComponent(
  labelAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>Field Label</Label>
        <Input
          id={id}
          name={id}
          value={props.attribute.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
        {props.attribute.error instanceof ZodError ? (
          <span className="text-destructive text-sm">
            {props.attribute.error.format()._errors[0]}
          </span>
        ) : null}
      </div>
    );
  }
);
