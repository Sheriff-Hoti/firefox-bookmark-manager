import Cleanup from "./components/cleanup";
import { DefaultMode } from "./components/default-mode";
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
// import { SearchMode } from "./components/search-mode";

export type Mode = "default" | "search";

function App() {
  // const [mode, setMode] = createSignal<Mode>("default");
  <Tabs defaultValue="account" class="w-400px">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
      <TabsIndicator />
    </TabsList>
  </Tabs>;
  return (
    <div class="p-4">
      <Tabs defaultValue="default" class="min-w-[700px] min-h-[700px]">
        <TabsList>
          <TabsTrigger value="default">Bookmark Tree</TabsTrigger>
          <TabsTrigger value="cleanup">Cleanup</TabsTrigger>
        </TabsList>
        <TabsContent value="default">
          <DefaultMode />
        </TabsContent>
        <TabsContent value="cleanup">
          <Cleanup />
        </TabsContent>
      </Tabs>
      {/* <SearchMode mode={mode} setMode={setMode} /> */}
    </div>
  );
}

export default App;
