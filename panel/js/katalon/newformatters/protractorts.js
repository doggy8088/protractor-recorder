

newFormatters.protractorts = function(name, commands) {
    var content = newprotractorts(name).formatter(commands);
    return {
      content: content,
      extension: 'ts',
      mimetype: 'text/javascript'
    }
  }

  const newprotractorts = function (scriptName){
    var _scriptName = scriptName  || "";
    const locatorType = {

        xpath: (target) => {
            return `by.xpath('${target.replace(/\'/g, "\"")}')`
        },
        css: (target) => {
            return `by.css('${target.replace(/\'/g, "\"")}')`
        },

        id: (target) => {
            return `by.id('${target.replace(/\'/g, "\"")}')`
        },

        link: (target) => {
            return `by.linkText('${target.replace(/\'/g, "\"")}')`
        },

        name: (target) => {
            return `by.name('${target.replace(/\'/g, "\"")}')`
        },

        tag_name: (target) => {
            return `by.tagName('${target.replace(/\'/g, "\"")}')`
        }
    }

    // https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html
    const specialKeyMap = {
        '\${KEY_LEFT}': 'Key.ARROW_LEFT',
        '\${KEY_UP}': 'Key.ARROW_UP',
        '\${KEY_RIGHT}': 'Key.RIGHT',
        '\${KEY_DOWN}': 'Key.DOWN',
        '\${KEY_PAGE_UP}': 'Key.PAGE_UP',
        '\${KEY_PAGE_DOWN}': 'Key.PAGE_DOWN',
        '\${KEY_BACKSPACE}': 'Key.BACK_SPACE',
        '\${KEY_DEL}': 'Key.DELETE',
        '\${KEY_DELETE}': 'Key.DELETE',
        '\${KEY_ENTER}': 'Key.ENTER',
        '\${KEY_TAB}': 'Key.TAB',
        '\${KEY_HOME}': 'Key.HOME'
    }

    // protracto api
    // https://www.protractortest.org/#/api
    // katalon
    // https://docs.katalon.com/katalon-recorder/docs/selenese-selenium-ide-commands-reference.html
    const seleneseCommands = {
        "open": "browser.get('_TARGET_STR_');",

        "click" : "\n" +
                  "    const elem_STEP_ = element(_BY_LOCATOR_);\n" +
                  "    browser.wait(EC.elementToBeClickable(elem_STEP_), defaultTimeout,\n" +
                  "      'Unable to find elem_STEP_ to be clickable.');\n" +
                  "    elem_STEP_.click();",

        "clickAndWait": "\n" +
                        "    const el__STEP_ = element(_BY_LOCATOR_);\n" +
                        "    browser.wait(EC.elementToBeClickable(el__STEP_), defaultTimeout,\n" +
                        "      'Unable to find elem_STEP_ to be clickable.');\n" +
                        "    el__STEP_.click();",

        "doubleClick": "browser.actions().doubleClick(element(_BY_LOCATOR_)).perform();",

        "type": "element(_BY_LOCATOR_).sendKeys('_VALUE_STR_');",

        "pause": "browser.sleep(_VALUE_);",

        "refresh": "browser.refresh();",

        "selectWindow":
            "const handles__STEP_ = browser.getAllWindowHandles();\n" +
            "    browser.switchTo().window(handles__STEP_[handles__STEP_.length - 1]);",

        "sendKeys": "element(_BY_LOCATOR_).sendKeys(_SEND_KEY_);",

        "submit": "element(_BY_LOCATOR_).submit();",

        "selectFrame":"browser.switchTo().frame(element(_BY_LOCATOR_).getWebElement());",

        "select": "element(_BY_LOCATOR_).element(by.cssContainingText('option', '_SELECT_OPTION_')).click();",

        "goBack": "browser.navigate().back();",

        "assertConfirmation": "browser.switchTo().alert().accept();",

        "verifyText" : "\n" +
                       "    const elem_STEP_ = element(_BY_LOCATOR_);\n" +
                       "    const text_STEP_ = '_VALUE_STR_';\n" +
                       "    browser.wait(EC.textToBePresentInElement(elem_STEP_, text_STEP_), defaultTimeout,\n" +
                       "      'Unable to find \\\'' + text_STEP_ + '\\\' to be present in elem_STEP_.');\n" +
                       "    expect(elem_STEP_.getText()).toContain(text_STEP_);",
        "verifyTitle" : "\n" +
                       "    const text_STEP_ = '_TARGET_STR_';\n" +
                       "    browser.wait(EC.titleContains(text_STEP_), defaultTimeout,\n" +
                       "      'Unable to find \\\'' + text_STEP_ + '\\\' in the page title.');\n" +
                       "    expect(browser.getTitle()).toContain(text_STEP_);",
        "verifyValue" : "\n" +
                       "    const elem_STEP_ = element(_BY_LOCATOR_);\n" +
                       "    const text_STEP_ = '_VALUE_STR_';\n" +
                       "    browser.wait(EC.textToBePresentInElementValue(elem_STEP_, text_STEP_), defaultTimeout,\n" +
                       "      'Unable to find \\\'' + text_STEP_ + '\\\' to be present in elem_STEP_'s value.');\n" +
                       "    expect(elem_STEP_.getAttribute('value')).toContain(text_STEP_);",

        "assertText" : "\n" +
                       "    const elem_STEP_ = element(_BY_LOCATOR_);\n" +
                       "    const text_STEP_ = '_VALUE_STR_';\n" +
                       "    browser.wait(EC.textToBePresentInElement(elem_STEP_, text_STEP_), defaultTimeout,\n" +
                       "      'Unable to find \\\'' + text_STEP_ + '\\\' to be present in elem_STEP_.');\n" +
                       "    expect(elem_STEP_.getText()).toContain(text_STEP_);",
        "assertTitle" : "\n" +
                       "    const text_STEP_ = '_TARGET_STR_';\n" +
                       "    browser.wait(EC.titleContains(text_STEP_), defaultTimeout,\n" +
                       "      'Unable to find \\\'' + text_STEP_ + '\\\' in the page title.');\n" +
                       "    expect(browser.getTitle()).toContain(text_STEP_);",
        "assertValue" : "\n" +
                       "    const elem_STEP_ = element(_BY_LOCATOR_);\n" +
                       "    const text_STEP_ = '_VALUE_STR_';\n" +
                       "    browser.wait(EC.textToBePresentInElementValue(elem_STEP_, text_STEP_), defaultTimeout,\n" +
                       "      'Unable to find \\\'' + text_STEP_ + '\\\' to be present in elem_STEP_'s value.');\n" +
                       "    expect(elem_STEP_.getAttribute('value')).toContain(text_STEP_);\n"

    }

    const header =
        "import { browser, by, element, $, $$, Key, logging, ExpectedConditions as EC } from 'protractor';\n\n" +
        "describe('_SCRIPT_NAME_', () => {\n\n" +
        "  const defaultTimeout = 5000; // ExpectedConditions's default timeout\n\n" +
        "  beforeAll(() => {\n" +
        "    // browser.waitForAngularEnabled(false);\n" +
        "    // browser.manage().window().setSize(1024, 768);\n" +
        "  });\n\n" +
        "  beforeEach(() => {\n" +
        "  });\n\n" +
        "  it('should _SCRIPT_NAME_', () => {\n"

    const footer =
        "  });\n\n" +
        "  afterEach(() => {\n" +
        "    // Assert that there are no errors emitted from the browser\n" +
        "    const logs = browser.manage().logs().get(logging.Type.BROWSER);\n" +
        "    expect(logs).not.toContain(jasmine.objectContaining({\n" +
        "      level: logging.Level.SEVERE,\n" +
        "    } as logging.Entry));\n" +
        "  });\n\n" +
        "});"

    function formatter(commands) {

        return header.replace(/_SCRIPT_NAME_/g, _scriptName) +
            commandExports(commands).content +
            footer;
    }

    function commandExports(commands) {

        let output = commands.reduce((accObj, commandObj) => {
            let {command, target, value} = commandObj
            let cmd = seleneseCommands[command]
            if (typeof (cmd) == "undefined") {
                accObj.content += `\n\n  // WARNING: unsupported command ${command}. Object= ${JSON.stringify(commandObj)}\n\n`
                return accObj
            }

            let funcStr = cmd;

            if (typeof (accObj) == "undefined") {
                accObj = {content: ""}
            }

            let targetStr = target.trim().replace(/\'/g, "\\'")
                .replace(/\"/g, '\\"')

            let valueStr = value.trim().replace(/\'/g, "\\'")
                .replace(/\"/g, '\\"')

            let selectOption = value.trim().split("=", 2)[1];

            let locatorStr = locator(target)

            funcStr = funcStr.replace(/_STEP_/g, accObj.step)
                .replace(/_TARGET_STR_/g, targetStr)
                .replace(/_BY_LOCATOR_/g, locatorStr)
                .replace(/_TARGET_/g, target)
                .replace(/_SEND_KEY_/g, specialKeyMap[value])
                .replace(/_VALUE_STR_/g, valueStr)
                .replace(/_VALUE_/g, value)
                .replace(/_SELECT_OPTION_/g, selectOption)

            accObj.step += 1
            accObj.content += `    ${funcStr}\n`

            return accObj
        }, {step: 1, content: ""})


        return output
    }

    function locator(target) {
        let locType = target.split("=", 1)

        let selectorStr = target.substr(target.indexOf("=") + 1, target.length)
        let locatorFunc = locatorType[locType]
        if (typeof (locatorFunc) == 'undefined') {
            return `by.xpath('${target.replace(/\'/g, "\"")}')`
            // return 'not defined'
        }

        return locatorFunc(selectorStr)

    }

    return {
        formatter,
        locator
    };
  }
