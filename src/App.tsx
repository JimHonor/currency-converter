import { Center } from "@chakra-ui/react";
import CurrencyConverter from "./components/CurrencyConverter";

export default function App() {
  return (
    <Center minH={"100vh"} px="1rem">
      <CurrencyConverter />
    </Center>
  );
}
