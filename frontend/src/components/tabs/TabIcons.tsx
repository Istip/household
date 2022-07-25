import { Badge, Box, Tab } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { useNotes } from '../../context/NotesContext';

const TabIcons: React.FC<{ setTabIndex: (index: number) => void }> = ({
  setTabIndex,
}) => {
  interface tabItem {
    index: number;
    icon: JSX.Element;
    badge?: any;
  }

  const { notes } = useNotes();
  const { items } = useItems();

  const selected = {
    color: 'white',
    bg: 'blue.300',
  };

  const tabContent: tabItem[] = [
    {
      index: 0,
      icon: <i className="fa-solid fa-lg fa-cart-shopping"></i>,
      badge: items.length,
    },
    {
      index: 1,
      icon: <i className="fa-solid fa-lg fa-comment"></i>,
      badge: notes.length,
    },
    {
      index: 2,
      icon: <i className="fa-solid fa-lg fa-money-bill-wave"></i>,
    },
  ];

  return (
    <>
      {tabContent.map((tab) => (
        <Tab
          key={tab.index}
          _selected={selected}
          onClick={() => setTabIndex(tab.index)}
        >
          <Box fontSize="sm" fontWeight="bold" position="relative">
            {tab.icon}
            {tab.badge && (
              <Badge
                position="absolute"
                right="calc(50% - 16px)"
                top="-6px"
                fontSize="8px"
                borderRadius="full"
                colorScheme="red"
                variant="solid"
                ml={2}
              >
                {tab.badge}
              </Badge>
            )}
          </Box>
        </Tab>
      ))}
    </>
  );
};

export default TabIcons;
