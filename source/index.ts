import {Socket} from 'net';

export default (socket: Socket, callback: () => unknown): void => {
	if (socket.writable && !socket.connecting) {
		callback();
	} else {
		socket.once('connect', callback);
	}
};
