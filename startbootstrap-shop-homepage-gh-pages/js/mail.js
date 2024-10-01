 document.addEventListener("DOMContentLoaded", function () 
{
    fetch('JSON/foremalJSON.json')
    .then(response => response.json()) //hämtar från json
    .then(data => 
//-----------------------------------------------------------------------------------------------------------------------------
    {
      function generateEmailMessage()
        {
            let emailMessage = "\n"

            for (let i in tillLagd) 
            {
                emailMessage += `- ${data.foremalData[tillLagd[i]].namn}: ${data.foremalData[tillLagd[i]].pris}kr\n`;
            }
            return emailMessage;
        }

        // Generate email message content and make it available globally
        const emailContent = generateEmailMessage();
//-----------------------------------------------------------------------------------------------------------------------------
        // Initialize EmailJS
        (function()
        {
          emailjs.init("HVRudUxt4ungddIWI");  
        })();
  //-----------------------------------------------------------------------------------------------------------------------------

        function sendMail(event) 
        {
            event.preventDefault();  // Prevent form submission
              
            let params = 
            {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: emailContent,  // Use emailContent here instead of undefined emailMessage
                land: document.getElementById("country").value,
            };

            emailjs.send("service_som5gei", "template_076hiu8", params)
            .then(function(response) 
            {
                alert("EMAIL SENT!");
            }, function(error) 
            {
                alert("FAILED TO SEND EMAIL", error);
            });
        }

        // Attach sendMail function to a button or form submit
        document.getElementById("sendMail").addEventListener("click", sendMail);

//-----------------------------------------------------------------------------------------------------------------------------

    })
    .catch(error => console.error("Error fetching JSON data:", error));
});