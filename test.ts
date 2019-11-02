import * as https from 'https';
import {Socket} from 'net';
import test from 'ava';
import pEvent from 'p-event';
import deferToConnect from './source';

import sinon = require('sinon');

test('calls the callback if already connected', async t => {
	const spy = sinon.spy();
	const request = https.get('https://httpbin.org/anything');

	const socket: Socket = await pEvent(request, 'socket');
	await pEvent(socket, 'connect');
	deferToConnect(socket, spy);

	t.true(spy.calledOnce);
});

test('waiting till the connect event to call the callback', async t => {
	const spy = sinon.spy();
	const request = https.get('https://httpbin.org/anything');

	const socket: Socket = await pEvent(request, 'socket');

	deferToConnect(socket, spy);
	t.true(spy.notCalled);

	const promise = new Promise(resolve => {
		socket.once('connect', () => {
			t.true(spy.calledOnce);

			resolve();
		});
	});

	await promise;
});
