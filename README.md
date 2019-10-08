# Address lookup and verification made easy

https://www.addy.co.nz/

Create a delightful user experience and remove friction from your online forms, save customers time and increase your conversion rates.  

Addresses are standardised at the point of capture, validated against official data sources including the New Zealand Postal Address File (PAF) and Land Information New Zealand (LINZ) database.

Avoid the unnecessary costs of failed deliveries, improve shipping efficiency and ensure parcels arrive first time.

![Addy Address Autocomplete](https://github.com/addynz/Address-Lookup/blob/master/addresslookup.png)

Addy's address lookup use intelligent fuzzy matching for searching. This means that if a typo, invalid suburb or partially correct address is entered, customers can still find the right delivery or billing address.

## Get Started

Create a free account <https://www.addy.co.nz/signup> to get an API key.

1) Include addycomplete.min.css in your page, via the usual tags:

```html
<link rel="stylesheet" href="addycomplete.min.css" />
```

2) Include addycomplete.min.js at the bottom of the page, before closing the body tag:

```html
<script src="addycomplete.min.js?key=YOUR-ADDY-KEY&callback=initAddy" async defer></script>
```
Replace YOUR-ADDY-KEY with your own Addy API Key. 

Define the fields and options that will be called by the initAddy callback function once the script has loaded.

```javascript
function initAddy() {
    var addyComplete = new AddyComplete(document.getElementById("address1"));
    addyComplete.fields = {
        address1: document.getElementById("address1"),
        address2: document.getElementById("address2"),
        suburb: document.getElementById("suburb"),
        city: document.getElementById("city"),
        postcode: document.getElementById("postcode")
    }
}
```

Live demo and documentation: <https://www.addy.co.nz/address-finder-code-example>

## Prices

Visit the pricing page for more information and to find a plan that works for your business (https://www.addy.co.nz/pricing).

## Links

Official Addy site: <https://www.addy.co.nz/>

NZ Address Finder and Postcode API Documentation: <https://www.addy.co.nz/address-finder-and-postcode-api>

All Documentation: <https://www.addy.co.nz/documentation>

Frequently Asked Questions: <https://www.addy.co.nz/frequently-asked-questions>

## License

The Address Checker code is released under the MIT License.

The reqwest library included in the bundle is released under the MIT License <https://github.com/LeaVerou/awesomplete>.

The Neat Complete library included in the bundle is released under the GNU Affero General Public License <https://github.com/AbleTech/neat-complete>.
