import {Socket} from 'net';

export default (socket: Socket, callback: () => void): void => {
	if (socket.writable && !socket.connecting) {
		callback();
	} else {
		socket.once('connect', callback);
	}
};
