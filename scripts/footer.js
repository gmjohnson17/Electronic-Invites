/* footer.js */

/*
	Name: Footer
	Author: Graham Johnson
	Date: 8 Jul 26

	Purpose: Implement function to output footer information (HTML). This includes
	content support information, information on content owners and contributors,
	version information, license information, and disclaimers. 
*/

/** 
 * Creates the footer, which includes project information as HTML beneath the form
 * or output file
 * @param {string} footerID - the id of the location to create the footer.
 */
function createFooter(footerContainerId, imgSrc='../github_logo.png') {
	const footerContainer = document.getElementById(footerContainerId);

	footerContainer.innerHTML = '';

	htmlToInsert = `
	<div align="center">
		<a href="https://github.com/why-github" target="_blank" title="Visit Github"><img src=${imgSrc} alt="Visit the Github Home Page" width="100"></a>
	</div>
  	<p style="margin: 10px 0px 0px 0px"><font style="font-weight: bold;">ALL Support is handled through <font style="color:red; text-decoration: underline;">GitHub only</font> at: 
	<a href="https://github.com/gmjohnson17/">https://github.com/gmjohnson17/</a></font></p>
  	<p style="font-weight: bold; margin: 10px 0px 0px 0px">Content Owner</p>
  	<p style="margin: 0px 0px 10px 0px">Graham Johnson</p>
	<p style="font-weight: bold; margin: 10px 0px 0px 0px">Contributors</p>
  	<p style="margin: 0px 0px 10px 0px">Graham Johnson</p>
	<p style="margin: 10px 0px 0px 0px"><font style="font-weight: bold;">Version:</font> 1.1</p>
	<p style="margin: 0px 0px 10px 0px"><font style="font-weight: bold;">Version Date:</font> 13 July 2026</p>
	<p style="text-align: center; margin: 10px 0px; font-weight: bold;">This form is not intended for commercial use or personal gain.</p>
	<p style="margin: 10px 0px 10px 0px"><font style="font-weight: bold;">Social Media: </font>
	<a href="https://github.com/gmjohnson17/" target="_blank">GitHub</a> | 
	<a href="https://www.linkedin.com/in/graham-johnson-2125a395" target="_blank">LinkedIn</a> | </p>
	<p style="margin: 10px 0px"><font style="font-weight: bold;">External Link Disclaimer:</font> Please be advised that links to external websites provided via this form are not vetted for safety or accuracy by the form's author. Users should verify all links work as intended prior to sending invites.</a></p>
	<p style="margin: 10px 0px"><font style="font-weight: bold;">Accessibity Disclaimer:</font> This form implements WCAG 2.1 Level AA (Good) recommendations for accessibility. While not required for personal projects, the form(s) author(s) and contributor(s) are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to the Electronic Invitation Creator.</p>
	<p style="margin: 10px 0px"><font style="font-weight: bold;">Non-Endorsement Disclaimer:</font> This tool is not affiliated with, authorized, maintained, sponsored, or endorsed by the Department of Defense (War), the U.S. Government, or any of its sub-agencies.</p>
	<p style="margin: 10px 0px"><font style="font-weight: bold;">Data Privacy:</font> This application runs entirely within your local browser. No data entered into this form is transmitted to or stored on any external server or database.</p>
	<p style="margin: 10px 0px"><font style="font-weight: bold;">User Responsibility:</font> Users assume all responsibility for the information processed through this tool. Ensure all generated content complies with current Department of War Operational Security (OPSEC), legal, Public Affairs, and visual information guidelines prior to distribution.</p>
	<p style="margin: 10px 0px"><font style="font-weight: bold;">Security Disclaimer:</font> This application performs input validation and sanitization only on the client side using HTML5 form constraints and JavaScript. <font style="font-weight: bold;">As data in not transmitted, no server-side validation or sanitization is implemented.</font> As a result, data entered into this form should not be considered secure or trusted, and it may be vulnerable to manipulation or injection if used in a production environment.</p>
	<p style="margin: 10px 0px"><font style="font-weight: bold;">License: </font>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p style="margin: 10px 0px">The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p style="margin: 10px 0px">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
	<p>For more information about this eInvitation, <a href="https://github.com/gmjohnson17/" target="_blank">please click here</a>.</p>
	`;

	footerContainer.innerHTML = htmlToInsert;
}