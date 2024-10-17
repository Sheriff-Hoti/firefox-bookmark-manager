import { For } from "solid-js";
import { BookmarkTreeNode } from "../typed-bookmark-api";
import { FaSolidFolder, FaRegularFile } from "solid-icons/fa";
// import { Alert } from "./ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import EditBookmarkDialog from "./edit-bookmark-dialog";
import { extractExpiryDate } from "@/libs/utils";
import { cn } from "@/libs/cn";

export type ItemMode = "edit" | "open" | "default";

export function BookmarkItem({ node }: { node: BookmarkTreeNode }) {
  const compare = () => {
    const input = extractExpiryDate(node.title ?? "").match;

    console.log("input", input);

    if (!input) return "";

    try {
      const current = new Date();
      const expDateFormat = new Date(input.substring(5));
      if (current > expDateFormat) {
        console.log("sus1", expDateFormat.getTime() - current.getTime());
        return "border-red-400 border-2 rounded-md";
      }
      if (expDateFormat.getTime() - current.getTime() < 259200) {
        console.log("sus", expDateFormat.getTime() - current.getTime());
        return "border-yellow-400 border-2 rounded-md";
      }
      return "";
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return (
    // <Alert class="border-none w-full">
    <AccordionItem value={node.id} class={cn("w-full", compare())}>
      {node.id !== "root________" && (
        <div class="flex gap-2">
          <div class="flex gap-1 justify-center items-center">
            <EditBookmarkDialog node={node} />
            {node.type === "folder" ? (
              <FaSolidFolder
                class={`size-6 text-sky-500 ${
                  node.children?.length === 0 ? "" : ""
                }`}
              />
            ) : (
              <FaRegularFile class="size-6 text-gray-900" />
            )}
          </div>

          <AccordionTrigger class="gap-4">
            <div class="">{extractExpiryDate(node.title ?? "").before}</div>
          </AccordionTrigger>
        </div>
      )}

      <AccordionContent class="ml-[22px]">
        <Accordion collapsible class="w-full">
          <For each={node.children ?? []}>
            {(node) => <BookmarkItem node={node} />}
          </For>
        </Accordion>
      </AccordionContent>
    </AccordionItem>
    // </Alert>
  );
}
