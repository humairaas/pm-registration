<h2>MITS2.0 VUe Naming Convention</h2>

Please follow these naming conventions when developing MITS2.0 front-end. <br>
Any changes made should be discussed and updated here.

<table>
  <tr>
    <th><b>What</b></th>
    <th><b>Case</b></th>
    <th><b>Example</b></th>
  </tr>
  <tr>
    <td>Folder name</td>
    <td>kebab-case </td>
    <td>admin-management</td>
  </tr>
  <tr>
    <td>Vue file name</td>
    <td>kebab-case + camelCase</td>
    <td>pm-registration<br>pm-attendanceRecord<br>im-SEConsentForm <td>
  </tr>
  <tr>
    <td>JS file name</td>
    <td>camelCase</td>
    <td>index.js<br>formValidation.js<td>
  </tr>
  <tr>
    <td>CSS file name</td>
    <td>kebab-case</td>
    <td>vue-form-generator.css<td>
  </tr>
  <tr>
    <td>Image file name</td>
    <td>PascalCase</td>
    <td>MentariLogo.png<br>KKMLogo.png<td>
  </tr>
  <tr>
    <td>CSS class</td>
    <td>kebab-case</td>
    <td>box<br>btn-group<br>first-heading<td>
  </tr>
  <tr>
    <td>CSS id</td>
    <td>kebab-case</td>
    <td>board<br>score-board<td>
  </tr>
  <tr>
    <td>Component</td>
    <td>lower kebab-case</td>
    <td>dass-result<br>vue-form-generator<td>
  </tr>
  <tr>
    <td>Function name</td>
    <td>camelCase</td>
    <td>showModal()<br>toggleCardVisibility()<td>
  </tr>
  <tr>
    <td>Schema name</td>
    <td>camelCase</td>
    <td>schema<br>firstTabSchema<td>
  </tr>
  <tr>
    <td>Model name</td>
    <td>camelCase</td>
    <td>model<br>firstTabModel<td>
  </tr>
  <tr>
    <td>FormOptions name</td>
    <td>camelCase</td>
    <td>formOptions<br>firstTabFormOptions<td>
  </tr>
   <tr>
    <td>Model variables</td>
    <td>UPPER SNAKE_CASE</td>
    <td>PATIENT_NAME<td>
  </tr>
  <tr>
    <td>Ref name</td>
    <td>camelCase</td>
    <td>demographic<br>sosioDemographic <td>
  </tr>
  <tr>
    <td>Props name</td>
    <td>kebab-case (for both declaration and usage)</td>
    <td>status<br>max-value<td>
  </tr>
  <tr>
    <td>JS variables</td>
    <td>camelCase (Use plural for array)</td>
    <td>score<br>scores (array)<br>totalScore<br>totalScores (for array)<td>
  </tr>
  <tr>
    <td>Query name</td>
    <td>shortened lowercase (max 1 word)</td>
    <td>id<br>ang (shortened for language)<td>
  </tr>
  <tr>
    <td>Route path</td>
    <td>kebab-case</td>
    <td>https://mits2.moh.gov.my /patient-management/patient-registration<td>
  </tr>
  <tr>
    <td>Directives</td>
    <td>Use shorthand if available</td>
    <td><ul>
          <li>: for v-bind</li>
          <li>@ for v-on</li>
          <li># for v-slot</li>
      </ul>
    <td>
  </tr>
  <tr>
    <td>v-if/v-else/v-if-else key name</td>
    <td>kebab-case</td>
    <td>password<br>username-input<br>email-input<td>
  </tr>
  <tr>
    <td>Comments</td>
    <td>Use // for each row </td>
    <td>// validationErrorClass: "has-error"<br>// validationSuccessClass: "has-`success`"<td>
  </tr>
</table>

References:
<ol>
  <li><b>kebab-case</b></li>
      <ul>
        <li><span class='red'>*</span>All lower-case letters except for acronyms like DASS</li>
        <li>Hyphen between words</li>
      </ul>
  <li><b>camelCase</b></li>
      <ul>
        <li>First letter of first word is lower-case</li>
        <li>First letter of following words is upper-case</li>
      </ul>
  <li><b>PascalCase</b></li>
      <ul>
        <li>First letter of all words is upper-case</li>
      </ul>
  <li><b>UPPER SNAKE_CASE</b></li>
      <ul>
        <li>All letters are upper-case</li>
        <li>Underscore between words</li>
      </ul>
</ol>

<span class='red'>*All acronyms are in UPPERCASE except for component name.</span>

<style>
  .red {
    color: red
  }
</style>