//@ts-ignore
const bookmarks = browser.bookmarks;

// type ResultState = "success"|"error";

// type SuccessType<Success> = {
//   state: "success";
//   data: Success;
// };

// type ErrorType<Error> = {
//   state: "error";
//   error: Error;
// };

// type Result<Success, Error> = SuccessType<Success> | ErrorType<Error>;

//testing purposes it gets the job done
// const smth:Result<string, string> = {
//     state:'success',
//     data:"test"
// }

type BookmarkTreeNodeType = "bookmark" | "folder" | "separator";

type BookmarkTreeNodeUnmodifiable = "managed";

export type BookmarkTreeNode = {
  children?: BookmarkTreeNode[];
  dateAdded?: number;
  dateGroupModified?: number;
  id: string;
  index?: number;
  parentId?: string;
  title?: string;
  type?: BookmarkTreeNodeType;
  unmodifiable?: BookmarkTreeNodeUnmodifiable;
  url?: string;
};

// type CreateDetails = {
//   index?: number;
//   parentId?: string;
//   title?: string;
//   type?: BookmarkTreeNodeType;
//   url?: string;
// };

export type Query =
  | string
  | {
      query?: string;
      url?: string;
      title?: string;
    };

//test with result type
// export async function createBookmark(
//   createDetails: CreateDetails
// ): Promise<Result<BookmarkTreeNode[], string>> {
//   try {
//     const data = (await bookmarks.create(createDetails)) as BookmarkTreeNode[];
//     return {
//       state: "success",
//       data,
//     };
//   } catch (error) {
//     return {
//       state: "error",
//       error: "Error creating the bookmark",
//     };
//   }
// }

// export async function create(
//   createDetails: CreateDetails
// ): Promise<BookmarkTreeNode[]> {
//   return bookmarks.create(createDetails) as Promise<BookmarkTreeNode[]>;
// }

// export async function search(query: Query): Promise<BookmarkTreeNode[]> {
//   return bookmarks.search(query) as Promise<BookmarkTreeNode[]>;
// }

export const remove = async (id: string): Promise<void> => {
  return await bookmarks.remove(id);
};

export const search = async ({}): Promise<
  Omit<BookmarkTreeNode, "children">[]
> => {
  return await bookmarks.search({});
};

export const getRecent = async (
  itemNums: number
): Promise<BookmarkTreeNode[]> => {
  // return await [bookmarkTreeNode1, bookmarkTreeNode2, bookmarkTreeNode3];
  return await bookmarks.getRecent(itemNums);
};

export const getTree = async (): Promise<BookmarkTreeNode[]> => {
  // return await [bookmarkTreeNode1, bookmarkTreeNode2, bookmarkTreeNode3];
  return await bookmarks.getTree();
};

export const update = async (
  id: string,
  changes: { title?: string; url?: string }
): Promise<BookmarkTreeNode> => {
  return await bookmarks.update(id, changes);
};

export const addOnChangeListener = (listener: any): void => {
  bookmarks.onChanged.addListener(listener);
};

export const removeOnChangeListener = (listener: any): void => {
  bookmarks.onChanged.removeListener(listener);
};

export const hasOnChangeListener = (listener: any): boolean => {
  return bookmarks.onChanged.hasListener(listener);
};

export const addOnRemoveListener = (listener: any): void => {
  bookmarks.onRemoved.addListener(listener);
};

export const removeOnRemoveListener = (listener: any): void => {
  bookmarks.onRemoved.removeListener(listener);
};

export const hasOnRemoveListener = (listener: any): boolean => {
  return bookmarks.onRemoved.hasListener(listener);
};

export const bookmarkTreeNode1: BookmarkTreeNode = {
  id: "1",
  title: "bookmarkTreeNode1",
  url: "https://www.google.com",
  type: "bookmark",
  dateAdded: 1693568800000, // Date.now() for example
};

export const bookmarkTreeNode2: BookmarkTreeNode = {
  id: "2",
  title: "bookmarkTreeNode2",
  type: "folder",
  dateAdded: 1693568900000,
  children: [
    bookmarkTreeNode1,
    {
      id: "3",
      title: "YouTube",
      url: "https://www.youtube.com",
      type: "bookmark",
      dateAdded: 1693569000000,
    },
  ],
};

export const bookmarkTreeNode3: BookmarkTreeNode = {
  id: "4",
  title: "bookmarkTreeNode3",
  type: "bookmark",
  dateAdded: 1693569100000,
  children: [
    {
      id: "5",
      title: "Facebook",
      url: "https://www.facebook.com",
      type: "bookmark",
      dateAdded: 1693569200000,
    },
    {
      id: "6",
      title: "Twitter",
      url: "https://www.twitter.com",
      type: "bookmark",
      dateAdded: 1693569300000,
    },
  ],
};
