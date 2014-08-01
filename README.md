# [Mobile Angular Ui](http://mobileangularui.com) Boilerplate generator

Scaffold a Mobile Angular Ui (Angular + Bootstrap) project in 1 minute

## Features

- Ready to go (install and start to develop)
- Target both [Phonegap](http://phonegap.com/)/[Cordova](http://cordova.apache.org/) and Web Apps
- Based on [Gulp](http://gulpjs.com/)
- Use less to code and customize style
- Compile and compress assets (even images)
- Use [mobilizer](https://github.com/mcasmir/mobilizer) to strip responsive media-queries and :hover from mobile stylesheets (useful to include 3rd party css)
- Use [ngAnnotate](https://github.com/olov/ng-annotate) to preserve angular dependency injection on minification
- Automatically order js sources according to ng Modules dependencies
- Precompile angular templates
- Web server with livereload to test in browser
- Embed weinre to easily debug Phonegap Apps
- Easily customizable

## Install

```bash
npm install -g yo gulp generator-mobileangularui
```

If you plan to use this with [Phonegap](http://phonegap.com/)/[Cordova](http://cordova.apache.org/) you may want to install them too:

```bash
sudo npm install -g cordova
```

```bash
sudo npm install -g phonegap
```

## Usage

### 1. Create the project directory

For phonegap/cordova:

```bash
phonegap create my_app
```

or

```bash
cordova create my_app
```

For a web app:

```bash
mkdir my_app
```

### 2. Run the generator

```bash
cd my_app
yo mobileangularui
```

Be patient.. this may take a few minutes.

### 3. Build

```bash
gulp build
```

### 4. Run your app

For phonegap/cordova:

```bash
phonegap run TARGET
```

or

```bash
cordova platform add TARGET
cordova run TARGET
```

Start a development web server, start Weinre, and watch for changes:

``` bash
gulp
```

If you use weinre, weinre target script is automatically injected in your sources.

Open your web app at `localhost:8000`.
Debug a phonegap app remotely at `localhost:8001`.

## License

MIT