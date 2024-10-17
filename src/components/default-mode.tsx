import {
  For,
  Suspense,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
} from "solid-js";
import {
  addOnChangeListener,
  getTree,
  removeOnChangeListener,
} from "../typed-bookmark-api";
import { BookmarkItem } from "./bookmark-item";
import { Accordion } from "./ui/accordion";

export function DefaultMode() {
  const [bookmarks, { refetch }] = createResource(async () => getTree());

  const [value, setValue] = createSignal(["root________"]);

  createEffect(() => {
    addOnChangeListener(refetch);
    onCleanup(() => removeOnChangeListener(refetch));
  });

  return (
    <Suspense fallback={<div>fetching bookmarks</div>}>
      <Accordion
        collapsible
        class="min-w-[700px] min-h-[700px]"
        value={value()}
        onChange={setValue}
      >
        <For each={bookmarks() ?? []}>
          {(node) => <BookmarkItem node={node} />}
        </For>
      </Accordion>
    </Suspense>
  );
}
