import { useState } from "react";
import {
  Badge,
  Container,
  SimpleGrid,
  Input,
  Indicator,
  Button,
  Group,
  Drawer,
} from "@mantine/core";
import { List, ThemeIcon } from "@mantine/core";

import {
  IconBasket,
  IconCircleCheck,
  IconBasketFilled,
  IconCircleDashed,
  IconShoppingCart,
} from "@tabler/icons-react";
import Card from "./components/Card/Card";
import "./App.css";

const storeItems = [
  {
    id: 100,
    name: "Kamera",
    src: "camera",
    price: 10,
  },
  {
    id: 102,
    name: "Araba",
    src: "car",
    price: 20,
  },
  {
    id: 103,
    name: "Gunes Gozlugu",
    src: "glasses",
    price: 30,
  },
  {
    id: 104,
    name: "Kulaklik",
    src: "headphone",
    price: 10,
  },
  {
    id: 105,
    name: "Ayakkabi",
    src: "shoe",
    price: 20,
  },
  {
    id: 106,
    name: "Akilli Saat",
    src: "watch",
    price: 30,
  },
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  let addToBasket = ({ id, name }) => {
    let basketIndex = basketItems.findIndex((item) => item.id === id);
    if (basketIndex >= 0) {
      let _baasketItems = [...basketItems];
      _baasketItems[basketIndex].count += 1;
    } else {
      setBasketItems([...basketItems, { id, name, count: 1 }]);
    }
  };
  return (
    <Container>
      <Group align="end" position="center">
        <Input.Wrapper label="Arama">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Input.Wrapper>
        <Button onClick={() => setSearchValue("")}>Temizle</Button>
        <Indicator color="red" size={22} label={basketItems.length}>
          <Button
            leftIcon={<IconBasket size={25} />}
            onClick={() => setOpened(true)}
          >
            Sepet
          </Button>
        </Indicator>
      </Group>

      <SimpleGrid cols={3} className="Store">
        {filteredItems.map(({ id, name, src, price }) => {
          return (
            <Card
              key={name}
              name={name}
              src={src}
              price={price}
              onAdd={() => addToBasket({ name, id })}
            />
          );
        })}{" "}
      </SimpleGrid>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Sepet">
        <List
          className="List"
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
        >
          {basketItems.map(({ name, count }, index) => (
            <List.Item key={index}>
              <Group>
                {" "}
                {name}
                <Badge>{count}</Badge>
              </Group>
            </List.Item>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
