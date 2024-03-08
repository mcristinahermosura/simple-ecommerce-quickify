import { useEffect, useState } from "react";

export default function useFilterArray(initialArray) {
  const [array, setArray] = useState(initialArray);
  const [reverse, setReverse] = useState(false);

  const reverseFilter = (filter = "") => {
    if (!filter) {
      setArray([...array].reverse());
      return;
    }
    setReverse(!reverse);
    sortArray(filter, !reverse);
  };

  const filterArray = (filter) => {
    setReverse(!reverse);
    sortArray(filter, !reverse);
  };

  const sortArray = (filterType, reverse) => {
    let sortedArray = [];
    switch (filterType) {
      case "stock":
        sortedArray = [...array].sort((a, b) =>
          reverse ? b.stock - a.stock : a.stock - b.stock
        );
        break;
      case "price":
        sortedArray = [...array].sort((a, b) =>
          reverse ? b.price - a.price : a.price - b.price
        );
        break;
      case "latest":
        sortedArray = [...array].sort((a, b) =>
          reverse
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      default:
        sortedArray = array;
        break;
    }

    setArray(sortedArray);
  };

  useEffect(() => {
    setArray(initialArray);
  }, [initialArray]);

  return { array, reverseFilter, filterArray };
}
