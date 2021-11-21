Feature: Sign in

  Scenario: Succeeded Sign in 1
    Given User is in home page
    And User is not authenticated
    When User presses 'Sign in' button
    And User fills username field with 'cucumber'
    And User fills password field with 'demo'
    And User presses 'Confirm' button
    Then "Signed in as Tester" is shown in the page
    And 'Sign out' button is available

  Scenario: Succeeded Sign in 2
    Given User is in home page
    When User signs in with username 'cucumber' and password 'demo'
    Then User is signed in

  Scenario: Succeeded Sign in 3
    Given User is in home page
    When User signs in with Tester username and password
    Then User is signed in

  Scenario Outline: Failed Sign in
    Given User is in home page
    When User signs in with username '<username>' and password '<password>'
    Then Error message is shown 'Wrong username and/or password'
    Examples:
      | username | password |
      | cucu     | demo     |
      | cucumber | dede     |
      | cucu     | dede     |
