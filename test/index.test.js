const test = require('node:test');
const assert = require('node:assert');
const { SQSProcessor } = require('../lib/index');

test('posts the message body to the worker', async (t) => {
    const fetch = t.mock.method(globalThis, 'fetch', async () => ({
        status: 200,
    }));

    const sqs = new SQSProcessor({
        queueUrl: 'https://sqs.us-east-1.amazonaws.com/123456/test-queue',
        region: 'us-east-1',
        webHook: 'http://localhost',
    });

    await sqs.postToWorker('test', { MessageId: 'm1' });

    assert.strictEqual(fetch.mock.calls[0].arguments[1].body, 'test');
});
