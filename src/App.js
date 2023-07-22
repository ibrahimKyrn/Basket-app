import { useState } from "react";
import { Container, SimpleGrid, Input } from "@mantine/core";
import { List, ThemeIcon } from "@mantine/core";

import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
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
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  return (
    <Container>
      <Input.Wrapper label="Arama" maw={620} mx="auto">
        <Input onChange={(e) => setSearchValue(e.target.value)} />
      </Input.Wrapper>
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
        {/* {filteredItems.map(({ name }, index) => (
          <List.Item key={index}>{name}</List.Item>
        ))} */}
      </List>
    </Container>
  );
}

export default App;
