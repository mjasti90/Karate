Feature: Karate browser automation 
Background:
   * configure driver = { type: 'chrome', executable: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: false  } 

  Scenario: google search, land on the YouTube, and search for knoldus.
   
    Given driver 'https://google.com'
    And maximize()
    And waitFor('input[name=q]')
    And input('input[name=q]', 'Youtube')
    And click('input[name=btnK]')
    When click("h3[class='LC20lb DKV0Md']")
    Then waitForUrl('https://www.youtube.com/')
    And click('input[id=search]')
    And input('input[id=search]', 'panda')
    And click('button[id=search-icon-legacy]')

