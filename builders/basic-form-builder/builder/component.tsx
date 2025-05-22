"use client";

import { useState } from "react";
import {
  BuilderEntities,
  BuilderEntityAttributes,
  useBuilderStore,
} from "@coltorapps/builder-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LabelAttribute } from "../attributes/label/component";
import { basicFormBuilder } from "./definition";
import { TextFieldEntity } from "../entities/textfield/component";
import { saveFormSchema } from "@/actions/actions";

function TextFieldAttributes() {
  return <LabelAttribute />;
}

export function BasicFormBuilder() {
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  const builderStore = useBuilderStore(basicFormBuilder, {
    events: {
      onEntityAttributeUpdated(payload) {
        void builderStore.validateEntityAttribute(
          payload.entity.id,
          payload.attributeName
        );
      },
      onEntityDeleted(payload) {
        if (payload.entity.id === activeEntryId) {
          setActiveEntryId(null);
        }
      },
    },
  });

  async function submitFormSchema() {
    const validationResult = await builderStore.validateSchema();

    if (validationResult.success) {
      await saveFormSchema(validationResult.data);
    }
  }

  return (
    <div>
      <div className="flex gap-x-10">
        <div className="flex-1 space-y-2">
          <BuilderEntities
            builderStore={builderStore}
            components={{ textField: TextFieldEntity }}
          >
            {(props) => (
              <div
                className={cn(
                  "p-2 border-2 border-transparent hover:border-blue-500 rounded-md",
                  {
                    "border-blue-500 ": props.entity.id === activeEntryId,
                  }
                )}
              >
                {props.children}
                <div className="space-x-2 mt-2">
                  <Button onClick={() => setActiveEntryId(props.entity.id)}>
                    Select
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      builderStore.deleteEntity(props.entity.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </BuilderEntities>
        </div>
        <div className="flex-1">
          {activeEntryId ? (
            <BuilderEntityAttributes
              builderStore={builderStore}
              components={{ textField: TextFieldAttributes }}
              entityId={activeEntryId}
            />
          ) : null}
        </div>
      </div>
      <div className="space-x-2 mt-4 p-2">
        <Button
          type="button"
          onClick={() => {
            builderStore.addEntity({
              type: "textField",
              attributes: { label: "Text Field" },
            });
          }}
        >
          Add Text Field
        </Button>
        <Button type="button" onClick={() => void submitFormSchema()}>
          Save Form
        </Button>
      </div>
    </div>
  );
}
