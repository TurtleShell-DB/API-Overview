import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
  stages: [
    { duration: '1m30s', target: 4000 },
    { duration: '2m', target: 4000 },
    { duration: '1m', target: 0 },
  ],
};
export default function () {
  let resProduct = http.get('http://localhost:4568/products/5');
  let resStyle = http.get('http://localhost:4568/products/5/styles');
  let resRelated = http.get('http://localhost:4568/products/5/related');

  check(resProduct, { 'status was 200': (r) => r.status === 200 });
  check(resStyle, { 'status was 200': (r) => r.status === 200 });
  check(resRelated, { 'status was 200': (r) => r.status === 200 });

  sleep(1);
}