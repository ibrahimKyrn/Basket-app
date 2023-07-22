import { useState } from "react";
import {
  ActionIcon,
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
    name: "Kamera",
    src: "camera",
    price: 10,
  },
  {
    name: "Araba",
    src: "car",
    price: 20,
  },
  {
    name: "Gunes Gozlugu",
    src: "glasses",
    price: 30,
  },
  {
    name: "Kulaklik",
    src: "headphone",
    price: 10,
  },
  {
    name: "Ayakkabi",
    src: "shoe",
    price: 20,
  },
  {
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
        {filteredItems.map(({ name, src, price }) => {
          return (
            <Card
              key={name}
              name={name}
              src={src}
              price={price}
              onAdd={() => setBasketItems([...basketItems, { name }])}
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
          {basketItems.map(({ name }, index) => (
            <List.Item key={index}>{name}</List.Item>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
