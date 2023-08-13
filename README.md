# node-fire-storage

To connect firebase storage and will make insert file or folder ,delete file ,download file with url expiration(ie signed url with expiration token ) 


## Installation 

```npm install node-fire-storage```


## Require the package 

``` let admin = require('node-fire-storage')     ```


**NOTE: sending params need to connect firestorage mention below.**
```
 const bucket  = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-firebase-storage-bucket-url', // Replace with your Firebase Storage bucket URL
});
```

```var store = bucket.storage().bucket();```


## Operations

   ### `1` Insert File  to Firebase storage
   ### `2` Getting downloadUrl from Firebase storage
   ### `3` Delete File from  Firebase storage


**NOTE : Make sure you will send file along with file type Example : filename.png/jpeg/csv/xlxs etc**


```Example: my_image_001.png ```



## `1` Insert File  to Firebase storage

    To insert file to storage want to send below params 

```
let params = {
     bucketRef: '', //  firebase storage connection variable like above one `EX`store
     filePath: '', // the file that locate in our system `EX` C:\Users\MyName\Desktop\image\my_image_001.png 
     filename: '',// the name we want to save in storage `EX` my_image_001.png **Any name**
     destinationPath: ''//   mention file path `EX` Image --> this is create folder in storage, if you give Image/tourimage --> this will create folder inside folder
 }
 ```

### Function name 

`uploadToStorage(params)`

### Example
``` 
store.uploadToStorage(params).then((res)=>{
    console.log(res)
})

```

## `2` Getting downloadUrl from firebase storage

    To get downloadUrl url either signed or unsigned (expiry or unexpiry url)

**if you want unsigned url send params as below one**

```
let params = {
    bucketRef: '', // firebase storage connection variable like above one `EX`store
    filePath: '',  // filepath in storage bucket `EX` Image/my_image_001.png
    unit: '',
    value: ''
} 
```


**if you want signed url send params as below one** 

### Unit 
```
`y` - `years`
`M` - `Months`
`w` - `weeks`
`d` - `days`
`h` - `hours`
`m` - `minutes`
`s` - `seconds`
```


```
let params = {
    bucketRef: '', // firebase storage connection variable like above one `EX`store
    filePath: '',  // filepath in storage bucket `EX` Image/my_image_001.png
    unit: '',// above mention units give here // `EX` 's' in strings 
    value: '' // `ex` 60 in numbers 
} 
```


### Function name 

`getDownloadUrl(params)`

### Example
``` 
store.getDownloadUrl(params).then((res)=>{
    console.log(res)
})

```

## `3` Delete file from firebase storage

To delete file from the firebase storage 


let delparams = {
    bucketRef: '',//  firebase storage connection variable like above one `EX`store
    filePath: '', // filepath in storage bucket `EX` Image/my_image_001.png
}

### Function name 

`deleteFileFromStorage(params)`

### Example
``` 
store.deleteFileFromStorage(params).then((res)=>{
    console.log(res)
})

```


