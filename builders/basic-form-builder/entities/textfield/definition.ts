import { z } from "zod";
import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "../../attributes/label/definition";

export const textFieldEntity = createEntity({
  name: "textField",
  attributes: [labelAttribute],
  validate(value) {
    return z.string().optional().parse(value);
  },
});
