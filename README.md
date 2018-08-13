# defer-to-connect

> The safe way to handle the `connect` socket event

## Usage

```js
const deferToConnect = require('defer-to-connect');

deferToConnect(socket, () => {
    console.log('Connected!');
});
```

## API

### deferToConnect(socket, method, ...args)

Calls `socket[method](...args)` when connected.

### deferToConnect(socket, fn)

Calls `fn()` when connected.

## License

MIT