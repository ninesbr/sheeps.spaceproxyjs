# Space Proxy Client Javascript 🧑‍🚀 👾

```javascript
import {New} from '@sheepsbr/spaceproxyjs';

const spaceProxy = await New({
    host: "<host:strig>",
    port: <port:number>,
    insecure: <insecure:boolean>,
});

const info = await spaceProxy.getDetails({
    key: "/tmp/space.jpg"
});
console.log(info);

spaceProxy.disconnect();

```