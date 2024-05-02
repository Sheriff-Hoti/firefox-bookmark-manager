//@ts-ignore
const bookmarks = browser.bookmarks

// type ResultState = "success"|"error";

type SuccessType<Success> = {
    state: "success",
    data: Success
} 

type ErrorType<Error> = {
    state: "error",
    error: Error
} 

type Result<Success, Error> = SuccessType<Success> | ErrorType<Error>

//testing purposes it gets the job done
// const smth:Result<string, string> = {
//     state:'success',
//     data:"test"
// }

type BookmarkTreeNodeType = "bookmark" | "folder" | "separator"

type BookmarkTreeNodeUnmodifiable = "managed"

type BookmarkTreeNode = {
    children?: BookmarkTreeNode[],
    dateAdded?: number,
    dateGroupModified?: number,
    id: string,
    index?: number,
    parentId?: string,
    title?: string,
    type?: BookmarkTreeNodeType,
    unmodifiable?: BookmarkTreeNodeUnmodifiable,
    url?: string
}

type CreateDetails = {
    index?: number,
    parentId?: string,
    title?: string,
    type?: BookmarkTreeNodeType,
    url?: string,

}

export type Query = string | {
    query?: string,
    url?: string,
    title?: string
}

//test with result type
export async function createBookmark(createDetails: CreateDetails): Promise<Result<BookmarkTreeNode[], string>>{
    try {
        const data = await bookmarks.create(createDetails) as BookmarkTreeNode[];
        return {
            state:'success',
            data
        }
    } catch (error) {
        return {
            state:'error',
            error: "Error creating the bookmark"
        }
    }
}

export async function create(createDetails: CreateDetails): Promise<BookmarkTreeNode[]> {
    return bookmarks.create(createDetails) as Promise<BookmarkTreeNode[]>
}

export async function search(query: Query): Promise<BookmarkTreeNode[]> {
    return bookmarks.search(query) as Promise<BookmarkTreeNode[]>
}