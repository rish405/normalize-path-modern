# normalize-path-modern

Modern, tiny path normalizer that converts Windows and POSIX paths to a consistent forward-slash format. Handles duplicate slashes, `.`/`..` resolution, and preserves absolute vs relative semantics, including Windows drive letters and UNC paths.

## Install

```
npm i normalize-path-modern
```

## Usage

```ts
import normalize from 'normalize-path-modern'

normalize('a//b/./c/..') // 'a/b'
normalize('/a//b/../')   // '/a/'
normalize('C\\foo\\bar') // 'C:/foo/bar'
normalize('\\\\srv\\share\\a\\..') // '//srv/share/'
```

## API

- `normalize(input: string): string`

Returns a normalized path using forward slashes. Absolute paths stay absolute, relative paths stay relative. Trailing slashes are preserved when present.

## Notes

- No runtime dependencies
- ESM and CJS builds
- TypeScript types included
- Works in Node and browsers

