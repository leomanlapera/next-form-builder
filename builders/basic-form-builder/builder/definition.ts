import { createBuilder } from "@coltorapps/builder";
import { textFieldEntity } from "../entities/textfield/definition";

export const basicFormBuilder = createBuilder({
  entities: [textFieldEntity],
});
