# Space Proxy Client Javascript 🧑‍🚀 👾

```javascript
import {New} from '@sheepsbr/spaceproxyjs';

const spaceProxy = await New({
    host: <host:string>,
    port: <port:number>,
    insecure: <insecure:boolean>,
});

// Get Head file
const head = await spaceProxy.head({ key: "/uploaded/file.pdf" });
console.log(head);

// Download and convert audio
const stream = spaceProxy.fetchAndConvert({key: "uploaded/0001.mp3", format: "ogg"});
// stream.getStream() get stream Readable
// stream.getSyncBuffer() get buffer
await stream.syncWrite(fs.createWriteStream("/tmp/myfile.ogg")) // write direct Writable

// Download larger file
const stream = spaceProxy.fetch({key: "uploaded/file.pdf"});
// stream.getStream()
// stream.getSyncBuffer()
await stream.syncWrite(fs.createWriteStream("/tmp/myfile.pdf"))

// Upload
const chunkSize = 1024 * 1024 * 5; // 5MB
const input = {
  key: "/popcorn/hello.tar.gz",
  contentType: "application/gzip",
};
const upload = await spaceProxy.push(input, fs.createReadStream("/tmp/file.tar.gz", { highWaterMark: chunkSize }));

// Drop
const drop = await spaceProxy.drop({key: "/upload/file.tar.gz" });
console.log(drop);

// Disconnect
spaceProxy.disconnect();
```