# Auto24Frontend

## Members

Hans Leit <br />
Robin-Kevin Koppa


## Getting started

### Installation
```
cd auto24
```
Make sure you are in the right folder.


```
npm start
```
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Docker
```
docker build -t auto24 .
```
Builds docker using DockerFile. Don't forget to add dot because with that it can find DockerFile.

```
docker run -p 2001:80 auto24
```
Runs docker.<br />
Open [http://localhost:2001](http://localhost:2001) to view it in the browser.
