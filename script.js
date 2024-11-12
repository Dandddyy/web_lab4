import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    scenarios: {
        constant_load: {
            executor: 'constant-vus',
            vus: 10,
            duration: '1m',
            exec: 'constantLoad',
            gracefulStop: '30s',
        },
        constant_rate: {
            executor: 'constant-arrival-rate',
            rate: 5,
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 10,
            maxVUs: 20,
            exec: 'constantRate',
            gracefulStop: '30s',
        },
        ramping_load: {
            executor: 'ramping-vus',
            stages: [
                { duration: '1m', target: 10 },
                { duration: '1m', target: 20 },
                { duration: '1m', target: 0 },
            ],
            exec: 'rampingLoad',
            gracefulRampDown: '30s',
            gracefulStop: '30s',
        },
    },
};

export function constantLoad() {
    const res = http.get('http://localhost:7070/products/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(Math.random() * 2 + 1);
}

export function constantRate() {
    const res = http.get('http://localhost:7070/products/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(Math.random() * 2 + 1);
}

export function rampingLoad() {
    const res = http.get('http://localhost:7070/products/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(Math.random() * 2 + 1);
}
