import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs as TabsWrapper,
} from "@chakra-ui/react";
import { ItemsList, NotesList, ExpenseList } from "../";
import { IExpense } from "../../interfaces/Expense";
import TabIcons from "./TabIcons";

interface Props {
  tabIndex: number;
  setTabIndex: (index: number) => void;
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
}

const Tabs: React.FC<Props> = ({
  tabIndex,
  setTabIndex,
  expenses,
  setExpenses,
}) => {
  return (
    <TabsWrapper isFitted variant="unstyled" index={tabIndex}>
      <TabList
        borderTop="1px solid"
        borderColor="gray.100"
        position="fixed"
        left={0}
        right={0}
        bottom="-1px"
        zIndex={2}
        background="white"
        h="60px"
      >
        <TabIcons setTabIndex={setTabIndex} expenses={expenses} />
      </TabList>

      <TabPanels mt="72px">
        <TabPanel bg="gray.100">
          <ItemsList />
        </TabPanel>
        <TabPanel bg="gray.100" minH="calc(100vh - 111px)">
          <NotesList />
        </TabPanel>
        <TabPanel>
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </TabPanel>
      </TabPanels>
    </TabsWrapper>
  );
};

export default Tabs;
