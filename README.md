# demo-extension
Chrome extension that is capable of working with API. Parcel + Preact.

## How to build
Install project dependencies
```
npm install
```

Create a production build
```
npm run build
```

> Important! If you are using Windows, run `npm run build:windows` instead

## How to add an extension to the Google Chrome
1. Go to Extensions manager (chrome://extensions/)
2. Enable developer mode
3. Click `Load unpacked`
4. Navigate select `dist` folder, that will be created after a successfull build

## How to use
1. Go to https://jsonplaceholder.typicode.com/ to prevent possible CORS issues
2. Click the extension button
3. Enter desired post ID and click 'Go'

Post should load, otherwise it will display an error
