import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  // AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { BookmarkTreeNode, remove } from "@/typed-bookmark-api";
import { FaRegularTrashCan } from "solid-icons/fa";

const DeleteBookmarkDialog = ({
  node,
}: {
  node: Omit<BookmarkTreeNode, "children">;
}) => {
  console.log(node);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FaRegularTrashCan class="size-6" />
      </AlertDialogTrigger>
      <AlertDialogContent class="max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete bookmark?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            bookmark.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>Cancel</AlertDialogClose>
          <AlertDialogAction
            class="bg-red-500"
            onClick={async () => await remove(node.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBookmarkDialog;
