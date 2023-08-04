import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

export default function Home() {
  const [products, setProduct] = useState([]);

  const abortController = new AbortController();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=5", {
        signal: AbortSignal.timeout(2000),
        params: {
          limit: 3,
        },
      })
      .then((res) => setProduct(res.data));

    () => {
      abortController.abort();  // cancel Request زمانی که کلن کامپوننت  unMount میشه
    };
  }, []);

  return (
    <ul>
      {products.length > 0 &&
        products.map((product) => <Product key={product.id} {...product} />)}
    </ul>
  );
}
