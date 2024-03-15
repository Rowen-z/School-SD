// @author deniz 
// redirects to the edit profile page
const button = document.getElementById('editButton')
button?.addEventListener('click', redirectToEditPage)
function redirectToEditPage() {
    window.location.href = "./editaccountdetails.html"
}
// grabs a <p> element from the html page
const body = document.getElementById('profilepageBody')
// grabs the cookie and gets the value
const x = document.cookie
const splitX = x.split('=')
const value = splitX[1]
console.log(value)
// shows the row of the person that has been currently logged in
// fetch(`http://localhost:3000/profilepage/${value}`)
//     .then(res => res.json())
//     .then(data => {
//         const html = data.map((user: { display_naam: any; email: any; voornaam: any; achternaam: any; tussenvoegsels: any; woonplaats: any; straatnaam: any; huisnummer: any; postcode: any; telefoonnummer: any; geboortedatum: any; bankrekening: any; profielfoto: any; }) => {
//             if (user.tussenvoegsels === null) {
//                 user.tussenvoegsels = ''
//             }
//             if (user.email === null) {
//                 user.email = ''
//             }
//             if (user.voornaam === null) {
//                 user.voornaam = ''
//             }
//             if (user.achternaam === null) {
//                 user.achternaam = ''
//             }
//             if (user.woonplaats === null) {
//                 user.woonplaats = ''
//             }
//             if (user.straatnaam === null) {
//                 user.straatnaam = ''
//             }
//             if (user.huisnummer === null) {
//                 user.huisnummer = ''
//             }
//             if (user.postcode === null) {
//                 user.postcode = ''
//             }
//             if (user.telefoonnummer === null) {
//                 user.telefoonnummer = ''
//             }
//             if (user.geboortedatum === null) {
//                 user.geboortedatum = ''
//             }
//             if (user.bankrekening === null) {
//                 user.bankrekening = ''
//             }
//             if (user.profielfoto === null) {
//                 user.profielfoto = ''
//             }
//             return `<p>Username: ${user.display_naam}</p>
//         <p>Email: ${user.email}</p>
//         <p>First name: ${user.voornaam}</p>
//         <p>Last name: ${user.achternaam}</p>
//         <p>Preposition: ${user.tussenvoegsels}</p>
//         <p>Residence: ${user.woonplaats}</p>
//         <p>Street name: ${user.straatnaam}</p>
//         <p>House number: ${user.huisnummer}</p>
//         <p>Postal code: ${user.postcode}</p>
//         <p>Phone number: ${user.telefoonnummer}</p>
//         <p>Date of birth: ${user.geboortedatum.split('T')[0]}</p>
//         <p>Bank account: ${user.bankrekening.replace(/[0-9]/g, '*')}</p>
//         Profile picture: <img src="${user.profielfoto}">`
//         })
//         body?.insertAdjacentHTML('afterbegin', html)
//     })

// Makes a interface for use later. 
interface User {
    display_naam: string;
    email: string;
    voornaam: string;
    achternaam: string;
    tussenvoegsels: string;
    woonplaats: string;
    straatnaam: string;
    huisnummer: string;
    postcode: string;
    telefoonnummer: string;
    geboortedatum: string;
    bankrekening: string;
    profielfoto: string;
}
// Function that gets the data from the database, for the right user, and displays it.
async function fetchData(value: any) {
    try {
      const res = await fetch(`http://localhost:3000/profilepage/${value}`);
      const data = await res.json();
      const html = data.map((user: User) => {
        const userCopy = {
            display_naam: user.display_naam,
            email: user.email || "",
            voornaam: user.voornaam || "",
            achternaam: user.achternaam || "",
            tussenvoegsels: user.tussenvoegsels || "",
            woonplaats: user.woonplaats || "",
            straatnaam: user.straatnaam || "",
            huisnummer: user.huisnummer || "",
            postcode: user.postcode || "",
            telefoonnummer: user.telefoonnummer || "",
            geboortedatum: user.geboortedatum ? user.geboortedatum.split('T')[0] : "",
            bankrekening: user.bankrekening ? user.bankrekening.replace(/[0-9]/g, '*') : "",
            profielfoto: user.profielfoto || ""
        }
              return `<p>Username: ${userCopy.display_naam}</p>
          <p>Email: ${userCopy.email}</p>
          <p>First name: ${userCopy.voornaam}</p>
          <p>Last name: ${userCopy.achternaam}</p>
          <p>Preposition: ${userCopy.tussenvoegsels}</p>
          <p>Residence: ${userCopy.woonplaats}</p>
          <p>Street name: ${userCopy.straatnaam}</p>
          <p>House number: ${userCopy.huisnummer}</p>
          <p>Postal code: ${userCopy.postcode}</p>
          <p>Phone number: ${userCopy.telefoonnummer}</p>
          <p>Date of birth: ${userCopy.geboortedatum.split('T')[0]}</p>
          <p>Bank account: ${userCopy.bankrekening.replace(/[0-9]/g, '*')}</p>
          Profile picture: <img src="${userCopy.profielfoto}">`
          });
          body?.insertAdjacentHTML('afterbegin', html);
        } catch (error) {
      console.error(error);
    }
  }
  fetchData(value)
 