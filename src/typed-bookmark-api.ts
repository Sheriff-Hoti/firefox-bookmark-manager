//@ts-ignore
const bookmarks = browser.bookmarks

type ResultState = "success"|"error";

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
const smth:Result<string, string> = {
    state:'success',
    data:"test"
}