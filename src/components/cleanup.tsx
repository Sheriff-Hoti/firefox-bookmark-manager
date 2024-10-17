import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  addOnRemoveListener,
  BookmarkTreeNode,
  removeOnRemoveListener,
  search,
} from "@/typed-bookmark-api";
import { createEffect, createResource, For, onCleanup } from "solid-js";
import { Alert, AlertTitle } from "./ui/alert";
import DeleteBookmarkDialog from "./delete-bookmark-dialog";

function groupBookmarksByBaseUrl(
  bookmarks: BookmarkTreeNode[]
): Map<string, BookmarkTreeNode[]> {
  return bookmarks
    .filter((b) => b)
    .filter((b) => b.url)
    .reduce((acc: Map<string, BookmarkTreeNode[]>, b: BookmarkTreeNode) => {
      try {
        const baseUrl = new URL(b.url as string).origin;

        if (!acc.has(baseUrl)) {
          acc.set(baseUrl, []);
        }

        acc.get(baseUrl)!.push(b);
      } catch (error) {
        console.error(`Invalid URL: ${b.url}`, error);
      }

      return acc;
    }, new Map<string, BookmarkTreeNode[]>()); // Initial value is an empty Map
}

export default function Cleanup() {
  const [allUrlBookmarks, { refetch }] = createResource(async () => search({}));

  const bookmarkMap = () => groupBookmarksByBaseUrl(allUrlBookmarks() ?? []);

  createEffect(() => {
    addOnRemoveListener(refetch);
    onCleanup(() => removeOnRemoveListener(refetch));
  });
  return (
    <div class="p-4">
      {allUrlBookmarks.latest && <div>{bookmarkMap as any}</div>}
      <For each={[...bookmarkMap().entries()]}>
        {(item) => (
          <Card>
            <CardHeader>
              <CardTitle>{item[0]}</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-2">
              <For each={item[1]}>
                {(bookmark) => (
                  <Alert class="flex-row">
                    <AlertTitle class="flex justify-between">
                      {bookmark.url} <DeleteBookmarkDialog node={bookmark} />
                    </AlertTitle>
                  </Alert>
                )}
              </For>
            </CardContent>
          </Card>
        )}
      </For>
    </div>
  );
}
