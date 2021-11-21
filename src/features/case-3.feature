Feature: Results

  Scenario: Results for Tester
    Given Tester is authenticated
    And Tester is in Results Page
    Then The results are shown
      | Description    | Value | Status        | Verified |
      | Course Testing | 12.34 | Unqualified | Yes      |
      | Course Java    | 12.34 | Unqualified | Yes      |
      | Customers SBB  | 24.65 | Qualified   | Yes      |
      | Customer Sky   | 33.3  | Proposal    | No       |
      | Travel 1       | 44.5  | New         | No       |
      | Travel 2       | 56.3  | Negotiation | No       |
      | Travel 3       | 52.34 | Renewal     | No       |
      | Travel 4       | 13.33 | Proposal    | No       |

  Scenario: No Results for unauthenticated user
    Given User is not authenticated
    And User is in Results Page
    Then No results are shown

  Scenario: Filtered Results for Description
    Given Tester is authenticated
    And Tester is in Results Page
    When Tester filters the result by Description 'Travel'
    Then The results are shown
      | Description | Value | Status        | Verified |
      | Travel 1    | 44.5  | New         | No       |
      | Travel 2    | 56.3  | Negotiation | No       |
      | Travel 3    | 52.34 | Renewal     | No       |
      | Travel 4    | 13.33 | Proposal    | No       |

  Scenario: Filtered Results for Value
    Given Tester is authenticated
    And Tester is in Results Page
    When Tester filters the result by Value '2.3'
    Then The results are shown
      | Description    | Value | Status        | Verified |
      | Course Testing | 12.34 | Unqualified | Yes      |
      | Course Java    | 12.34 | Unqualified | Yes      |
      | Travel 3       | 52.34 | Renewal     | No       |

  Scenario: Filtered Results for Status
    Given Tester is authenticated
    And Tester is in Results Page
    When Tester filters the result by Status 'Proposal'
    Then The results are shown
      | Description    | Value | Status        | Verified |
      | Customer Sky   | 33.3  | Proposal    | No       |
      | Travel 4       | 13.33 | Proposal    | No       |

  Scenario: Filtered Results for Description and Value
    Given Tester is authenticated
    And Tester is in Results Page
    When Tester fills the filter with Description as 'Travel'
    And Tester fills the filter with Value as '2.3'
    Then The results are shown
      | Description    | Value | Status        | Verified |
      | Travel 3       | 52.34 | Renewal     | No       |

#  Scenario Outline: Filtered Results
#    Given User is authenticated
#    And User is in Results Page
#    When User fills the filter for <field> as '<field_value>'
#    Then The results are shown
#      | Description | Value | Status       | Verified |
#      | Test 1      | 1.1   | Approved   | Yes      |
#      | Test 2      | 2.2   | Unapproved | false    |
#    Examples:
#      | field       | field_value |
#      | Description | xx          |
#      | Value       | yy          |
