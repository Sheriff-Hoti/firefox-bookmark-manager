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
} from "@/components/ui/alert-dialog";
import { BookmarkTreeNode, update } from "@/typed-bookmark-api";
import { FaSolidPencil } from "solid-icons/fa";
import { TextField, TextFieldLabel, TextFieldRoot } from "./ui/textfield";
import { TextArea } from "./ui/textarea";
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerInput,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "@/components/ui/date-picker";
import {
  Index,
  // Portal
} from "solid-js/web";
import { createEffect, createSignal } from "solid-js";
import { extractExpiryDate } from "@/libs/utils";

const EditBookmarkDialog = ({
  node,
}: {
  node: Omit<BookmarkTreeNode, "children">;
}) => {
  const [composedTitle, setComposedTitle] = createSignal(
    extractExpiryDate(node.title ?? "")
  );

  // const constructedTitle =

  const dateAdded = node.dateAdded ? new Date(node.dateAdded) : undefined;
  // const [expiryDate, setExpiryDate] = createSignal();

  const expiryDate = () => {
    const maybedate = composedTitle().match?.substring(5);
    const maybedatedate = maybedate ? new Date(maybedate) : undefined;
    const result = maybedatedate
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(maybedatedate)
      : undefined;

    return result;
  };

  createEffect(() => {
    // console.log("expiry date", expiryDate());
    // console.log(composedTitle());
    // const str = "Hello from time:21.02.2024 and time:15.03.2025 with more text";
    // const str1 = "Hello from time:21.02.2024 and time:15.03.202";
    // const result = extractExpiryDate(str);
    // console.log("result", result);
    // console.log("result1", extractExpiryDate(str1));
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FaSolidPencil
          class="border rounded-md size-7 px-1 hover:cursor-pointer"
          onClick={() => console.log("hello")}
        />
      </AlertDialogTrigger>
      <AlertDialogContent class="overflow-y">
        <AlertDialogHeader>
          <AlertDialogTitle>Update a bookmark.</AlertDialogTitle>
          {/* <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        {node.title && (
          <TextFieldRoot class="w-full">
            <TextFieldLabel>Title</TextFieldLabel>
            <TextArea
              placeholder="Title"
              value={composedTitle().before}
              onInput={(e) => {
                setComposedTitle({
                  ...composedTitle(),
                  before: e.currentTarget.value,
                });
              }}
            />
          </TextFieldRoot>
        )}

        {node.url && (
          <TextFieldRoot class="w-full">
            <TextFieldLabel>Url</TextFieldLabel>
            <TextField name="url" placeholder={node.url} readonly />
          </TextFieldRoot>
        )}

        <div class="flex gap-2">
          <TextFieldRoot class="w-1/2">
            <TextFieldLabel>Date Added</TextFieldLabel>
            <TextField value={dateAdded?.toDateString()} readonly />
          </TextFieldRoot>
          <TextFieldRoot class="w-1/2">
            <TextFieldLabel>Date Expired</TextFieldLabel>
            <DatePicker
              // defaultValue={}
              onValueChange={(data) => {
                const maybedate = data.value.at(0);
                maybedate &&
                  setComposedTitle({
                    ...composedTitle(),
                    match: `time:${maybedate.toString()}`,
                  });
                console.log("maybedate", maybedate?.toString());
              }}
            >
              <DatePickerInput placeholder="Pick a date" value={expiryDate()} />
              {/* <Portal> */}
              <DatePickerContent>
                <DatePickerView view="day">
                  <DatePickerContext>
                    {(api) => (
                      <>
                        <DatePickerViewControl>
                          <DatePickerViewTrigger>
                            <DatePickerRangeText />
                          </DatePickerViewTrigger>
                        </DatePickerViewControl>
                        <DatePickerTable>
                          <DatePickerTableHead>
                            <DatePickerTableRow>
                              <Index each={api().weekDays}>
                                {(weekDay) => (
                                  <DatePickerTableHeader>
                                    {weekDay().short}
                                  </DatePickerTableHeader>
                                )}
                              </Index>
                            </DatePickerTableRow>
                          </DatePickerTableHead>
                          <DatePickerTableBody>
                            <Index each={api().weeks}>
                              {(week) => (
                                <DatePickerTableRow>
                                  <Index each={week()}>
                                    {(day) => (
                                      <DatePickerTableCell value={day()}>
                                        <DatePickerTableCellTrigger>
                                          {day().day}
                                        </DatePickerTableCellTrigger>
                                      </DatePickerTableCell>
                                    )}
                                  </Index>
                                </DatePickerTableRow>
                              )}
                            </Index>
                          </DatePickerTableBody>
                        </DatePickerTable>
                      </>
                    )}
                  </DatePickerContext>
                </DatePickerView>
                <DatePickerView
                  view="month"
                  class="w-[calc(var(--reference-width)-(0.75rem*2))]"
                >
                  <DatePickerContext>
                    {(api) => (
                      <>
                        <DatePickerViewControl>
                          <DatePickerViewTrigger>
                            <DatePickerRangeText />
                          </DatePickerViewTrigger>
                        </DatePickerViewControl>
                        <DatePickerTable>
                          <DatePickerTableBody>
                            <Index
                              each={api().getMonthsGrid({
                                columns: 4,
                                format: "short",
                              })}
                            >
                              {(months) => (
                                <DatePickerTableRow>
                                  <Index each={months()}>
                                    {(month) => (
                                      <DatePickerTableCell
                                        value={month().value}
                                      >
                                        <DatePickerTableCellTrigger>
                                          {month().label}
                                        </DatePickerTableCellTrigger>
                                      </DatePickerTableCell>
                                    )}
                                  </Index>
                                </DatePickerTableRow>
                              )}
                            </Index>
                          </DatePickerTableBody>
                        </DatePickerTable>
                      </>
                    )}
                  </DatePickerContext>
                </DatePickerView>
                <DatePickerView
                  view="year"
                  class="w-[calc(var(--reference-width)-(0.75rem*2))]"
                >
                  <DatePickerContext>
                    {(api) => (
                      <>
                        <DatePickerViewControl>
                          <DatePickerViewTrigger>
                            <DatePickerRangeText />
                          </DatePickerViewTrigger>
                        </DatePickerViewControl>
                        <DatePickerTable>
                          <DatePickerTableBody>
                            <Index
                              each={api().getYearsGrid({
                                columns: 4,
                              })}
                            >
                              {(years) => (
                                <DatePickerTableRow>
                                  <Index each={years()}>
                                    {(year) => (
                                      <DatePickerTableCell value={year().value}>
                                        <DatePickerTableCellTrigger>
                                          {year().label}
                                        </DatePickerTableCellTrigger>
                                      </DatePickerTableCell>
                                    )}
                                  </Index>
                                </DatePickerTableRow>
                              )}
                            </Index>
                          </DatePickerTableBody>
                        </DatePickerTable>
                      </>
                    )}
                  </DatePickerContext>
                </DatePickerView>
              </DatePickerContent>
              {/* </Portal> */}
            </DatePicker>
          </TextFieldRoot>
        </div>

        <AlertDialogFooter>
          <AlertDialogClose>Cancel</AlertDialogClose>
          <AlertDialogAction
            onClick={async () => {
              const res = await update(node.id, {
                title:
                  composedTitle().before +
                  (composedTitle().match ? ` ${composedTitle().match}` : "") +
                  composedTitle().after,
              });

              console.log(res);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditBookmarkDialog;
