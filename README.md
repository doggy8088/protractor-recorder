# Protractor Recorder

## How to add new formatter

Add to `panel\index.html` (replace `sample` with the formatter name):

```html
<option value="new-formatter-sample">Sample for new formatters</option>
```

Sample implementation:

```txt
panel\js\katalon\newformatters\sample.js
```

## Acknowledgments

This tool is developed based on [Katalon Recorder](https://github.com/katalon-studio/katalon-recorder). We would like to take this opportunity to express our warmest thanks to Katalon Recorder users and other open-source projects, especially:

* Selenium IDE Project - [http://www.seleniumhq.org](http://www.seleniumhq.org/).

* SideeX - https://github.com/SideeX/sideex.

* Robot Framework Formatter Project - https://github.com/ngocbv/Robot-Framework-Formatter.

* Formatter for C# with MSTest is provided by [Mark Gibson](https://forum.katalon.com/discussion/4209/export-to-c-with-webdriver-and-mstest).

* @Patrick_Groot, @Piotr, @Mark_Gibson and other active members who have provided a lot of valuable suggestions and bug reports. Please forgive us if your name is missing here.

* Plugin developers:

  * Jan Esser - PHPUnit formatter for Katalon Recorder ([Chrome](https://chrome.google.com/webstore/detail/phpunit-formatter-for-kat/gelokgfkbnkkcdbokielchgpfnphoalk?utm_source=chrome-ntp-icon))

  * Sam Kirkland - Puppeteer exporter for Katalon Recorder (https://github.com/SamKirkland/Puppeteer-exporter-for-Katalon-Recorder)

## License

Refer to NOTICE and [KATALON RECORDER CONTRIBUTION LICENSE AGREEMENT](https://www.katalon.com/license-agreement-katalon-recorder/) for Katalon Recorder.

Refer to APACHE LICENSE 2.0 for SideeX.

Please inform us if you found any unlicensed part of source code.
