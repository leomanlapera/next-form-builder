import { ZodError } from "zod";
import { createEntityComponent } from "@coltorapps/builder-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { textFieldEntity } from "./definition";

export const TextFieldEntity = createEntityComponent(
  textFieldEntity,
  (props) => {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={props.entity.id}>{props.entity.attributes.label}</Label>
        <Input
          id={props.entity.id}
          name={props.entity.id}
          value={props.entity.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
        />
        {props.entity.error instanceof ZodError ? (
          <span className="text-destructive text-sm">
            {props.entity.error.format()._errors[0]}
          </span>
        ) : null}
      </div>
    );
  }
);
