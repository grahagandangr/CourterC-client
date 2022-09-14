import { formatNumber } from "react-native-currency-input";

const formatRupiah = (price) => {
  return formatNumber(price, {
    separator: ",",
    prefix: "Rp ",
    precision: 2,
    delimiter: ".",
    signPosition: "beforePrefix",
  });
};

export default formatRupiah;
