# php-runner README

## Features

* Show a `Run...` codeLens before exec method
* When click `Run ...` ,new the class of the php file, and invoke exec method.

## Requirements

* `laravel thinker` install in local

## Extension Settings

This extension contributes the following settings:

* `php-runner.methodNames`: set the method which will show `Run ...` ,default `"exec"`, and you can set more than one by a array like `["exec", "run"]`
* `php-runner.beforeInvoke`: Do somethings before invoke the method. example: ```$instance->consoleOutput = new Symfony\\Component\\Console\\Output\\ConsoleOutput();```

## Known Issues

None

## Release Notes

### 0.0.1

First release.

### 0.0.2

add Setting: php-runner.beforeInvoke
