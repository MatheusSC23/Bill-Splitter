# Bill Splitter

## Firebase config (required for native builds)

This app uses Firebase native SDKs (`@react-native-firebase/*`). For Android/iOS builds you must provide:

- `android/app/google-services.json`
- `ios/BillSplitter/GoogleService-Info.plist`

These files are **not** committed to git. To generate them:

1. Open Firebase Console → Project Settings → General.
2. Add Android app:
   - Package name: `com.galaxies.billsplitter`
   - Download `google-services.json` and place it at `android/app/google-services.json`
3. Add iOS app:
   - Bundle ID: `com.galaxies.billsplitter`
   - Download `GoogleService-Info.plist` and place it at `ios/BillSplitter/GoogleService-Info.plist`

After placing the files, re-run:

```bash
npx expo run:android
npx expo run:ios
```
