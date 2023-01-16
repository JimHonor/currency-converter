import {
  Box,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  Select,
  Button,
  Circle,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getConvertRate, getCurrencies } from "../api/request";

interface CurrencyState {
  abbr: string;
  name: string;
}

export default function CurrencyConverter() {
  const [isResultShow, setIsResultShow] = useState(false);

  const [currencies, setCurrencies] = useState<CurrencyState[]>([]);

  useEffect(() => {
    getCurrencies().then((value) => setCurrencies(value));
  }, []);

  const [amount, setAmount] = useState("1");

  const [rate, setRate] = useState(0.924876);

  const result = parseFloat(amount) * rate;

  const [exchange, setExchange] = useState({
    from: "USD",
    to: "CNY",
  });

  const onConvertBtnClick = () => {
    getConvertRate({ ...exchange }).then((value) => {
      setRate(value as number);
      setIsResultShow(true);
    });
  };

  const onFromSelect = (value: string) => {
    const newExchange = { ...exchange, from: value };
    setExchange(newExchange);
    if (isResultShow) {
      getConvertRate({ ...newExchange }).then((value) => {
        setRate(value as number);
      });
    }
  };

  const onToSelect = (value: string) => {
    const newExchange = { ...exchange, to: value };
    setExchange({ ...newExchange });
    if (isResultShow) {
      getConvertRate({ ...newExchange }).then((value) => {
        setRate(value as number);
      });
    }
  };

  const onToggleCurrency = () => {
    const newExchange = { from: exchange.to, to: exchange.from };
    setExchange(newExchange);
    getConvertRate({ ...newExchange }).then((value) =>
      setRate(value as number)
    );
  };

  return (
    <VStack
      p="2rem"
      borderRadius={"0.5rem"}
      boxShadow="rgba(35, 55, 80, 0.3) 0px 6px 12px"
      spacing={8}
    >
      <SimpleGrid spacing={4}>
        <Box>
          <Text>Amount</Text>
          <NumberInput value={amount} onChange={(value) => setAmount(value)}>
            <NumberInputField />
          </NumberInput>
        </Box>
        <Box>
          <Text>From</Text>
          <Select
            value={exchange.from}
            onChange={(e) => onFromSelect(e.target.value)}
          >
            {currencies.map((currency, index) => (
              <option key={index} value={currency.abbr}>
                {currency.abbr} - {currency.name}
              </option>
            ))}
          </Select>
        </Box>
        <Circle
          border="1px"
          borderColor={"gray.300"}
          size="40px"
          color={"blue.600"}
          cursor="pointer"
          userSelect={"none"}
          onClick={onToggleCurrency}
        >
          换
        </Circle>
        <Box>
          <Text>To</Text>
          <Select
            value={exchange.to}
            onChange={(e) => onToSelect(e.target.value)}
          >
            {currencies.map((currency, index) => (
              <option key={index} value={currency.abbr}>
                {currency.abbr} - {currency.name}
              </option>
            ))}
          </Select>
        </Box>
      </SimpleGrid>
      {isResultShow ? (
        <VStack alignItems="start" w="100%" spacing={0}>
          <Text fontSize={"20px"}>
            {amount} {exchange.from} =
          </Text>
          <Text fontSize={"30px"}>
            {result} {exchange.to}
          </Text>
        </VStack>
      ) : (
        <Button
          colorScheme={"blue"}
          w="100%"
          h="3rem"
          onClick={onConvertBtnClick}
        >
          Convert
        </Button>
      )}
    </VStack>
  );
}
