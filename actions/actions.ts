"use server";

import { basicFormBuilder } from "@/builders/basic-form-builder/builder/definition";
import { validateSchema } from "@coltorapps/builder";

export async function saveFormSchema(formSchema: unknown) {
  const validationResult = await validateSchema(formSchema, basicFormBuilder);

  if (validationResult.success) {
  } else {
  }
}
