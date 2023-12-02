#

以下イメージ

```js
const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json'));
const packageLockJson = JSON.parse(fs.readFileSync('package-lock.json'));

if (packageJson.version !== packageLockJson.version) {
  console.error('バージョンが一致していません！');
  process.exit(1);
} else {
  console.log('バージョンが一致しています。');
}
```
