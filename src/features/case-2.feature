Feature: Sign up

  Scenario: Sign up 1
    Given User is in home page
    And User is not authenticated
    When User presses 'Sign up' button
    And User fills 'Name' field with 'Tester 2'
    And User fills 'Username' field with 'tester'
    And User fills 'Password' field with 'dd'
    And User fills 'Repeat Password' field with 'dd'
    And User presses 'Sign up' button below the form
    Then 'Signed in as Tester 2' is shown in the page
    And 'Sign out' button is available

  Scenario Outline: Sign up 2
    Given User is in home page
    And User is not authenticated
    When User presses 'Sign up' button
    And User fills 'Name' field with '<name>'
    And User fills 'Username' field with '<username>'
    And User fills 'Password' field with '<password>'
    And User fills 'Repeat Password' field with '<repeat_password>'
    And User presses 'Sign up' button below the form
    Then 'Signed in as <name>' is shown in the page
    And 'Sign out' button is available
    Examples:
      | name     | username | password | repeat_password |
      | Tester 2 | tester   | dd       | dd              |
      | Visitor  | visitor  | dt       | dt              |

  Scenario: Sign up with data table
    Given User is in home page
    And User is not authenticated
    When User presses 'Sign up' button
    And User fills the fields
      | Name     | Username | Password | Repeat Password |
      | Tester 2 | tester   | dd       | dd              |
    And User presses 'Sign up' button below the form
    Then 'Signed in as Tester 2' is shown in the page
    And 'Sign out' button is available

  Scenario Outline: Sign up with data table and examples
    Given User is in home page
    And User is not authenticated
    When User presses 'Sign up' button
    And User fills the fields
      | Name   | Username   | Password   | Repeat Password   |
      | <name> | <username> | <password> | <repeat_password> |
    And User presses 'Sign up' button below the form
    Then 'Signed in as <name>' is shown in the page
    And 'Sign out' button is available
    Examples:
      | name     | username | password | repeat_password |
      | Tester 2 | tester   | dd       | dd              |
      | Visitor  | visitor  | dt       | dt              |

  Scenario Outline: Failed Sign up
    Given User is in home page
    And User is not authenticated
    When User presses 'Sign up' button
    And User fills the fields
      | Name   | Username   | Password   | Repeat Password   |
      | <name> | <username> | <password> | <repeat_password> |
    And User presses 'Sign up' button below the form
    Then Error message is shown '<error>'
    Examples:
      | name     | username | password | repeat_password | error                                     |
      | Tester 2 | cucumber | dd       | dd              | Username cucumber already in use          |
      | Visitor  | visitor  | dd       | dt              | Password and repeat password do not match |

  # aggiunta durante la lezione
  Scenario: Sign in during lesson
    Given the user is not signed in
    When the user signes up with name 'x', username 'y' and password 'z'
    Then the user is signed up and signed it
